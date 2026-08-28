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
  west-coast/                  ← 一个相册里有好几个地点就写成「数字-地点」
    01-Mercer Bay.jpg          ← 先按地点名排，再按数字排
    02-Mercer Bay.jpg
    01-Omanawanui.jpg
  rangitoto/                   ← 相册排第几，看 album.json 里的 order
    01-ferry.jpg
```

- 相册里的顺序**完全由文件名决定**：`01-Mercer Bay.jpg` 这样命名的话，先按横杠后面的
  地点名排序，同一个地点再按前面的数字排。没有数字开头的（比如 `IMG_0156.jpg`）就按
  文件名排。改顺序 = 改文件名。
- 支持 `.jpg` / `.jpeg` / `.png`。HEIC 和 CR2 不支持，先用「预览」或 Lightroom 导出成 JPEG。
- **原图多大都行**（几十 MB 也没问题），脚本会缩小。原图只留在这台电脑上，不会进 git、
  也不会上传到 GitHub —— 见下面「原图不会上云」。
- 相册之间的顺序在 `album.json` 里的 `order` 决定：**数字小的排前面**，1 就是永远置顶。
  没填 `order` 的相册排在填了的后面，按文件夹名倒序（新的在上面）。

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
  "city": { "en": "Muriwai", "zh": "Muriwai" },
  "region": { "en": "Auckland", "zh": "奥克兰" },
  "date": { "en": "October 2025", "zh": "2025 年 10 月" },
  "camera": "Canon EOS 800D",
  "cover": "04-black-sand-from-ridge.jpg",
  "order": 3,
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

- `place` / `city` / `region` / `date` / `caption` 都要中英文各写一份 —— 中文那份网站切到
  中文时才会显示。中文说明是**单独写的**，不用照着英文翻译。
- `city` 是「地点」视图里那张卡片上的大字，`region` 是它下面的小字。留空的话会自动拿
  `place` 逗号前后两半来顶上，所以只填 `place` 也能用，只是不一定断得好看。
- `cover` 是「地点」卡片用哪张照片当封面，填文件名就行。留空就用相册第一张。
- `order` 是这个相册在 Gallery 里排第几，从 1 开始。想插一个相册到中间，把后面那些的
  `order` 往后挪一位就行。
- `caption` 同时是图片的 `alt` 文字，读屏软件会读它，所以写一句人话就好。一个相册里有
  好几个地点的话，把地点名写进 `caption` 最省事 —— 灯箱里就会显示这张是哪儿拍的。
- 说明可以整个相册都留空 —— 想做一个只有照片、不配文字的相册（比如 `ponyu`）就这么办，
  灯箱里只显示张数和相册名，脚本提示的 `has no caption yet` 忽略即可。
- 改完再跑一次 `npm run photos`。

## 常见操作 / Common changes

| 想做什么 | 怎么做 |
| --- | --- |
| 加照片 | 丢进相册文件夹 → `npm run photos` → 在 `album.json` 里填说明 |
| 换地点卡片的封面 | 在 `album.json` 里把 `cover` 改成想用的文件名 |
| 删照片 | 从相册文件夹里删掉 → `npm run photos`（已发布的副本会一起清掉） |
| 改顺序 | 改文件名 —— 先按「数字-地点」里的地点排，再按数字排（`album.json` 里的顺序每次跑脚本都会照文件名重排） |
| 改相册之间的顺序 | 改各个 `album.json` 里的 `order` |
| 加新相册 | 新建一个 `photos/<名字>/` 文件夹，重复上面三步，再填一个 `order` |
| 删整个相册 | 删掉 `photos/<名字>/` 和 `public/gallery/<名字>/`，再跑一次脚本 |
| 重新导出全部 | `npm run photos -- --force`（改了脚本里的尺寸/质量时用） |

跑完 `npm run photos` 之后，本地看一眼再发布：

```sh
npm run dev          # 本地预览
git add -A && git commit -m "Add the Rangitoto photos" && git push
```

推到 main 就会自动部署，一分钟左右上线。

## 原图不会上云 / Originals stay on this machine

`.gitignore` 里忽略了 `photos/` 下所有的图片文件，所以：

| 文件 | 进 git / 上 GitHub 吗 | 大小 |
| --- | --- | --- |
| `photos/<相册>/*.jpg`（你的原图） | **不会**，只在这台电脑上 | 想多大都行 |
| `photos/<相册>/album.json`（说明文字） | 会 —— 几 KB，留着才不会丢 | 很小 |
| `public/gallery/<相册>/*.jpg`（导出的网页版） | **会**，网站就是靠它显示 | 每张约 130–260KB |
| `public/gallery/<相册>/thumbs/*.jpg` | 会 | 每张约 25–50KB |

也就是说：你丢一张 15MB 的原图进来，GitHub 上只会存那张缩到 1500px、约 200KB 的版本，
15MB 的原图始终只在你自己电脑里。**原图请自己另外备份**（外置硬盘、Lightroom 目录等），
git 不再是它的备份。

因为原图只在本地，在别的电脑上（或者刚 clone 下来时）跑 `npm run photos`，脚本**不会**
把找不到源文件的相册删掉，只会保持原样：

```
muriwai: sources not on this machine, keeping it as published
```

真要删掉一个相册，得把 `photos/<相册>/` 和 `public/gallery/<相册>/` 都删掉再跑脚本。

## 说明 / Notes

- 这个文件夹存的是**源文件**；`public/gallery/` 里是脚本生成的网页版本，别手动改，
  跑一次脚本就会被覆盖。
- `src/data/albums.json` 也是生成的，同理别手动改。它里面也存了一份说明文字，
  所以万一 `album.json` 丢了还能从这里找回来。
- 同一个 `city` 的多个相册，在「地点」视图里会合成一张卡片，年份显示成区间；卡片封面取
  最新那个相册的 `cover`。
- 照片的排版、灯箱、样式在 `src/components/Gallery.tsx` 和 `src/styles.css` 里，
  只有想改**外观**的时候才需要动它们。
