# 照片放这里 / Put your photos here

网站 Gallery 里显示的照片，全部来自这个文件夹。加照片不需要改任何代码。

Everything the Gallery shows comes from this folder. Adding photos needs no code changes.

## 三步 / Three steps

**1. 建一个相册文件夹，把照片放进去 / Make an album folder and drop the photos in**

```
photos/
  muriwai/                     ← 相册文件夹名 = 网址里的名字，用小写英文
    01-road-west.jpg           ← 文件名开头加数字，决定显示顺序
    02-sheltered-water.jpg
  2026-07-rangitoto/           ← 想控制相册顺序就用日期开头（新的排前面）
    01-ferry.jpg
```

- 支持 `.jpg` / `.jpeg` / `.png`。HEIC 和 CR2 不支持，先用「预览」或 Lightroom 导出成 JPEG。
- 原图多大都行，脚本会自动缩小。但导出时最好控制在 5MB 以内 —— git 会永久保存每一个版本。
- 相册文件夹按名字**倒序**排列（新的在上面），所以想排序就用 `2026-07-...` 这种命名。

**2. 跑一下脚本 / Run the script**

```sh
npm run photos
```

它会做三件事：把照片导出成网页尺寸（大图 1500px、缩略图 640px）放进 `public/gallery/`；
顺手删掉 EXIF，所以发布出去的照片**不含 GPS 位置和相机序列号**；再生成
`src/data/albums.json` 给网站读取。

第一次跑的时候，它会在相册文件夹里自动建一个 `album.json`，里面已经列好了所有照片。

**3. 填上文字说明 / Fill in the captions**

打开 `photos/<相册名>/album.json`：

```json
{
  "place": { "en": "Muriwai, Auckland", "zh": "奥克兰 Muriwai" },
  "date": { "en": "October 2025", "zh": "2025 年 10 月" },
  "camera": "Canon EOS 800D",
  "photos": [
    {
      "file": "01-road-west.jpg",
      "caption": {
        "en": "The road out west, through the windscreen",
        "zh": "往西开的路上,透过挡风玻璃"
      }
    }
  ]
}
```

- `place` / `date` / `caption` 都要中英文各写一份 —— 中文那份网站切到中文时才会显示。
  中文说明是**单独写的**，不用照着英文翻译。
- `caption` 同时是图片的 `alt` 文字，读屏软件会读它，所以写一句人话就好。
- 改完再跑一次 `npm run photos`。

## 常见操作 / Common changes

| 想做什么 | 怎么做 |
| --- | --- |
| 加照片 | 丢进相册文件夹 → `npm run photos` → 在 `album.json` 里填说明 |
| 删照片 | 从相册文件夹里删掉 → `npm run photos`（已发布的副本会一起清掉） |
| 改顺序 | 改文件名前面的数字，或直接调整 `album.json` 里 `photos` 数组的顺序 |
| 加新相册 | 新建一个 `photos/<名字>/` 文件夹，重复上面三步 |
| 删整个相册 | 删掉 `photos/<名字>/` 和 `public/gallery/<名字>/`，再跑一次脚本 |
| 重新导出全部 | `npm run photos -- --force`（改了脚本里的尺寸/质量时用） |

跑完 `npm run photos` 之后，本地看一眼再发布：

```sh
npm run dev          # 本地预览
git add -A && git commit -m "Add the Rangitoto photos" && git push
```

推到 main 就会自动部署，一分钟左右上线。

## 说明 / Notes

- 这个文件夹存的是**源文件**；`public/gallery/` 里是脚本生成的网页版本，别手动改，
  跑一次脚本就会被覆盖。
- `src/data/albums.json` 也是生成的，同理别手动改。
- 照片的排版、灯箱、样式在 `src/components/Gallery.tsx` 和 `src/styles.css` 里，
  只有想改**外观**的时候才需要动它们。
