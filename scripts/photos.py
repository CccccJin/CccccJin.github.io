#!/usr/bin/env python3
"""
Turns the photos/ folder into the gallery. Run: npm run photos

Everything the gallery shows comes from photos/<album>/: the images
themselves and an album.json holding the place, date, camera, and one
caption per photo. This script exports web-sized copies into
public/gallery/ and writes src/data/albums.json for the site to read, so
adding photos never means editing code.

Exports are made with Pillow, which drops EXIF on the way out — the
published files carry no GPS or camera serial. Photos already exported
are skipped unless the source is newer or --force is passed, so repeated
runs don't quietly recompress the same image over and over.
"""

import json
import sys
from pathlib import Path

try:
    from PIL import Image
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


def images_in(album_dir):
    """Every usable image in an album folder, in filename order."""
    return sorted(
        (p for p in album_dir.iterdir() if p.suffix.lower() in SUFFIXES and not p.name.startswith('.')),
        key=lambda p: p.name.lower(),
    )


def blank_localized():
    return {'en': '', 'zh': ''}


def load_album_json(album_dir, files):
    """
    Read album.json, creating it when missing. Photos found on disk but not
    listed yet are appended with empty captions, and entries whose file is
    gone are dropped, so the file tracks the folder without losing captions
    that have already been written.
    """
    path = album_dir / 'album.json'
    if path.exists():
        album = json.loads(path.read_text(encoding='utf-8'))
    else:
        album = {'place': blank_localized(), 'date': blank_localized(), 'camera': ''}

    listed = {entry['file']: entry for entry in album.get('photos', [])}
    names = [p.name for p in files]
    photos = [listed[name] for name in (e['file'] for e in album.get('photos', [])) if name in names]
    photos += [{'file': name, 'caption': blank_localized()} for name in names if name not in listed]

    updated = {**album, 'photos': photos}
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
        copy = image.convert('RGB')
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

    return {
        'id': album_dir.name,
        'place': album.get('place') or blank_localized(),
        'date': album.get('date') or blank_localized(),
        'camera': album.get('camera', ''),
        'photos': photos,
    }


def main():
    if not SOURCES.exists():
        sys.exit(f'No photos folder at {SOURCES}. Create it and put an album folder inside.')

    album_dirs = sorted(
        (p for p in SOURCES.iterdir() if p.is_dir() and not p.name.startswith('.')),
        key=lambda p: p.name.lower(),
        reverse=True,  # newest album first, so name folders like 2026-07-rangitoto
    )
    if not album_dirs:
        sys.exit(f'No album folders in {SOURCES.relative_to(ROOT)}/. Make one, e.g. photos/rangitoto/.')

    albums = [album for album in (build_album(d) for d in album_dirs) if album]
    DATA.write_text(json.dumps(albums, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    total = sum(len(album['photos']) for album in albums)
    print(f'\nWrote {DATA.relative_to(ROOT)}: {len(albums)} album(s), {total} photos.')


if __name__ == '__main__':
    main()
