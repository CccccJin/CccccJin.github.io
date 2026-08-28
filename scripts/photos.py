#!/usr/bin/env python3
"""
Turns the photos/ folder into the gallery. Run: npm run photos

Everything the gallery shows comes from photos/<album>/: the images
themselves and an album.json holding the place, date, camera, cover, and
one caption per photo. This script exports web-sized copies into
public/gallery/ and writes src/data/albums.json for the site to read, so
adding photos never means editing code.

Exports are made with Pillow, which drops EXIF on the way out — the
published files carry no GPS or camera serial. Photos already exported
are skipped unless the source is newer or --force is passed, so repeated
runs don't quietly recompress the same image over and over.

The originals in photos/ are gitignored and live only on this machine,
so a checkout elsewhere has the exported copies but not the sources.
Albums whose sources are missing are therefore left exactly as they were
published rather than dropped — deleting an album means deleting its
folder under public/gallery/ as well.
"""

import json
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit('Pillow is missing. Install it with:  python3 -m pip install Pillow')

ROOT = Path(__file__).resolve().parent.parent
SOURCES = ROOT / 'photos'
PUBLISHED = ROOT / 'public' / 'gallery'
DATA = ROOT / 'src' / 'data' / 'albums.json'

# Long edge in pixels: the first is opened by the lightbox, the second fills
# the grid. Grid tiles are ~215px wide, so 640 still looks sharp on a retina
# screen while staying small enough to lazy-load a whole album cheaply.
FULL_SIZE, FULL_QUALITY = 1500, 80
THUMB_SIZE, THUMB_QUALITY = 640, 76

SUFFIXES = {'.jpg', '.jpeg', '.png'}
FORCE = '--force' in sys.argv[1:]

# A photo is named "<number>-<place>": 03-Mercer Bay.jpg. One folder can hold
# several places that way, so the place is what sorts first.
NAMED = re.compile(r'^(\d+)\s*[-_.]?\s*(.*)$')


def photo_order(name):
    """Sort by the place in the filename, then by the number counting within it."""
    stem = Path(name).stem
    named = NAMED.match(stem)
    if not named:
        # No leading number to read — IMG_0156.jpg and the like just sort by name.
        return (stem.lower(), 0, stem.lower())
    number, place = named.group(1), named.group(2).strip()
    return (place.lower(), int(number), stem.lower())


def images_in(album_dir):
    """Every usable image in an album folder, in the order the gallery shows them."""
    return sorted(
        (p for p in album_dir.iterdir() if p.suffix.lower() in SUFFIXES and not p.name.startswith('.')),
        key=lambda p: photo_order(p.name),
    )


def blank_localized():
    return {'en': '', 'zh': ''}


def load_album_json(album_dir, files):
    """
    Read album.json, creating it when missing. The photo list is rewritten from
    what is on disk, in filename order, so renaming a photo reorders the album;
    captions already written are carried across by filename, and an entry whose
    file is gone drops out.
    """
    path = album_dir / 'album.json'
    album = json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}

    listed = {entry['file']: entry for entry in album.get('photos', [])}
    photos = [
        listed.get(p.name) or {'file': p.name, 'caption': blank_localized()} for p in files
    ]

    # Every field the site can use, in a fixed order, so a new album.json opens
    # with the whole form to fill in rather than half of it.
    scaffold = {
        'place': blank_localized(),
        'city': blank_localized(),
        'region': blank_localized(),
        'date': blank_localized(),
        'camera': '',
        'cover': '',
    }
    updated = {**scaffold, **album, 'photos': photos}
    if updated != album or not path.exists():
        path.write_text(json.dumps(updated, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        print(f'  wrote {path.relative_to(ROOT)}')
    return updated


def export(source, target, long_edge, quality):
    """Write a web-sized copy, and report the size the browser will see."""
    fresh = target.exists() and target.stat().st_mtime >= source.stat().st_mtime
    if fresh and not FORCE:
        with Image.open(target) as done:
            return done.size, False

    with Image.open(source) as image:
        # A photo off a phone stores its rotation as an EXIF tag rather than in
        # the pixels. Exporting strips EXIF, so bake the rotation in first or
        # the published copy comes out sideways.
        copy = ImageOps.exif_transpose(image).convert('RGB')
        copy.thumbnail((long_edge, long_edge), Image.LANCZOS)
        target.parent.mkdir(parents=True, exist_ok=True)
        copy.save(target, 'JPEG', quality=quality, optimize=True, progressive=True)
        return copy.size, True


def prune(directory, keep):
    """Drop published files whose photo is no longer in the album."""
    if not directory.exists():
        return
    for stale in directory.glob('*.jpg'):
        if stale.name not in keep:
            stale.unlink()
            print(f'  removed {stale.relative_to(ROOT)} (no longer in the album)')


def build_album(album_dir):
    files = images_in(album_dir)
    if not files:
        print(f'{album_dir.name}: no images yet, skipping')
        return None

    album = load_album_json(album_dir, files)
    by_name = {p.name: p for p in files}
    out_dir = PUBLISHED / album_dir.name
    photos, exported = [], 0

    for entry in album['photos']:
        source = by_name[entry['file']]
        name = source.stem + '.jpg'
        (size, wrote) = export(source, out_dir / name, FULL_SIZE, FULL_QUALITY)
        export(source, out_dir / 'thumbs' / name, THUMB_SIZE, THUMB_QUALITY)
        exported += 1 if wrote else 0
        photos.append(
            {
                'src': f'./gallery/{album_dir.name}/{name}',
                'thumb': f'./gallery/{album_dir.name}/thumbs/{name}',
                'width': size[0],
                'height': size[1],
                'caption': entry.get('caption') or blank_localized(),
            }
        )

    kept = {Path(p['src']).name for p in photos}
    prune(out_dir, kept)
    prune(out_dir / 'thumbs', kept)

    print(f'{album_dir.name}: {len(photos)} photos ({exported} exported, {len(photos) - exported} already current)')
    for entry in album['photos']:
        if not (entry.get('caption') or {}).get('en'):
            print(f'  note: {entry["file"]} has no caption yet')
    if not album.get('place', {}).get('en'):
        print(f'  note: {album_dir.name}/album.json still needs a place and date')

    # The gallery leads a place card with its cover; the file is named by its
    # source, so point at the exported copy the site will actually load.
    cover = album.get('cover') or ''
    if cover:
        cover = Path(cover).stem + '.jpg'
        if cover not in {Path(p['src']).name for p in photos}:
            print(f'  note: cover {album.get("cover")} is not in the album, using the first photo')
            cover = ''

    return {
        'id': album_dir.name,
        'place': album.get('place') or blank_localized(),
        'city': album.get('city') or blank_localized(),
        'region': album.get('region') or blank_localized(),
        'date': album.get('date') or blank_localized(),
        'camera': album.get('camera', ''),
        'cover': cover,
        'photos': photos,
    }


def already_published():
    """Albums from the last run, so a machine without the sources keeps them."""
    if not DATA.exists():
        return {}
    return {album['id']: album for album in json.loads(DATA.read_text(encoding='utf-8'))}


def main():
    album_dirs = []
    if SOURCES.exists():
        album_dirs = [p for p in SOURCES.iterdir() if p.is_dir() and not p.name.startswith('.')]

    built = {}
    for album_dir in sorted(album_dirs, key=lambda p: p.name.lower(), reverse=True):
        album = build_album(album_dir)
        if album:
            built[album['id']] = album

    # An album with no sources here is still published if its exported files
    # are in place; only one whose folder is gone drops out of the gallery.
    for album_id, album in already_published().items():
        if album_id in built:
            continue
        if (PUBLISHED / album_id).is_dir():
            built[album_id] = album
            print(f'{album_id}: sources not on this machine, keeping it as published')
        else:
            print(f'{album_id}: sources and public/gallery/{album_id}/ are both gone, removing it')

    if not built:
        print(f'\nNo albums. Put photos in {SOURCES.relative_to(ROOT)}/<album>/ and run this again.')

    # Newest first — name album folders like 2026-07-rangitoto to control this.
    albums = [built[key] for key in sorted(built, key=str.lower, reverse=True)]
    DATA.write_text(json.dumps(albums, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    total = sum(len(album['photos']) for album in albums)
    print(f'\nWrote {DATA.relative_to(ROOT)}: {len(albums)} album(s), {total} photos.')


if __name__ == '__main__':
    main()
