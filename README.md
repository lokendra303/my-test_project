# A birthday surprise for Arjun

A single-page birthday website. It runs as plain HTML, CSS, and JavaScript. No login, no server, and no database. Anyone with the link can open it.

Music starts only after the opening button is pressed, then it loops. A small player in the corner can pause or mute it without restarting the song.

## Add your own photos

1. Put image files in `assets/images/`. JPG, PNG, and WEBP all work.
2. Open `script.js` and add a line inside `CONFIG.gallery.photos`:

```js
{ src: "assets/images/photo11.jpg", caption: "Your caption here." },
```

3. Leave `caption` as `""` if you do not want words under that photo.

The hero picture is `CONFIG.heroImage`. Right now that is `assets/images/main.jpg`, made from your `main` photo.

You can list as many photos as you like. The gallery is a masonry layout and opens full screen, with next and previous buttons, arrow keys, and swipe.

These files are already filled in from the photos that were in the project folder:

| Site file | Original file |
| --- | --- |
| `assets/images/main.jpg` | `main.jfif` |
| `assets/images/photo2.jpg` | `shared image (5).jfif` |
| `assets/images/photo3.jpg` | `shared image (14).jfif` |
| `assets/images/photo4.jpg` | `shared image (8).jfif` |
| `assets/images/photo5.jpg` | `shared image (12).jfif` |
| `assets/images/photo6.jpg` | `shared image (9).jfif` |
| `assets/images/photo7.jpg` | `shared image (10).jfif` |
| `assets/images/photo8.jpg` | `shared image (13).jfif` |
| `assets/images/photo9.jpg` | `shared image (11).jfif` |
| `assets/images/photo10.jpg` | `shared image (7).jfif` |

The captions describe what is visible in each photograph. Change them to whatever you want Arjun to read. They are not a diary of events.

## Add your music

The player uses `assets/music/birthday-song.mp3`.

To use a different song, either replace that file and keep the same name, or change `CONFIG.music` in `script.js` to your new filename. Keep the file inside `assets/music/`.

If the file is missing, the rest of the site still opens and the player asks you to add the song.

## Edit the words

Everything Arjun reads lives in the `CONFIG` object at the top of `script.js`:

- `welcome` — the first screen and the opening button
- `celebration` — the birthday heading, message, and wish button
- `gallery` — heading, intro, photo paths, and captions
- `timeline.memories` — each memory can have a `date`, `title`, `image`, and `caption`
- `letter.text` — the birthday letter. Put a blank line between paragraphs.
- `finale` — the closing message, button, and the small photo collage

Leave a memory `date` as `""` when you do not want a date shown. When you do, write it however you like, for example `"14 March 2025"`.

Colors are the variables at the top of `style.css` if you want to shift the palette.

## Preview on your computer

From this folder:

```powershell
python -m http.server 5500
```

Open `http://localhost:5500`.

Use a local server or GitHub Pages rather than double-clicking `index.html`. Browsers often block music on a `file://` page.

## Put it on GitHub Pages

The site root is this folder. `index.html` has to sit at the root of the repository, with `assets` beside it.

1. Create a new **public** GitHub repository.
2. Upload the contents of `birthday-surprise` (`index.html`, `style.css`, `script.js`, `README.md`, `.nojekyll`, and the `assets` folder). Do not upload the parent folder that still holds the original `.jfif` files, or the site will not be at the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then save.
6. Wait a minute. The link will look like `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`.
7. Open the link, press the surprise button, and confirm the music plays. Then send that link to Arjun.

Paths such as `assets/images/main.jpg` are relative, so they work on a project site (`username.github.io/repo/`) and on a user site.

The page includes `noindex` so search engines are asked not to list it. Remove the robots tag in `index.html` if you want it to be searchable.

Anyone with the link can open the page. There is no password.
