# Star Dial

An interactive astronomy learning app for seasonal constellations, with a star dial, constellation atlas, 3D sky exploration, student activities, reflections, and a teacher report dashboard.

Built with HTML, CSS, JavaScript, and an inline copy of Three.js r160. No build step, package installation, backend, or API key is needed.

## Put the app on GitHub

1. Create a new public repository on GitHub (for example, `star-dial`).
2. Choose **uploading an existing file** on the empty repository page, or **Add file > Upload files** in an existing repository.
3. Upload the contents of this folder, keeping `index.html` at the repository root. Do not upload the enclosing folder or a ZIP in place of the files. Include the dotfiles (`.gitignore`, `.gitattributes`, and `.nojekyll`).
4. Commit the files to `main`.

## Publish a live app with GitHub Pages

1. In the repository, open **Settings > Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select **main** and **/ (root)**, then **Save**.
4. Wait for GitHub's Pages deployment to complete. Settings > Pages will show the live URL, normally `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

All app assets use relative paths, so repository subfolders are supported. `.nojekyll` marks this as a plain static website.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Run locally

Serve this folder with a static HTTP server. For example, with Python installed:

```sh
python -m http.server 8000
```

Open `http://localhost:8000`. Opening `index.html` directly may display the app, but service workers require HTTPS or localhost. The 3D view requires browser WebGL support.

## Offline use and updates

Visit the live site online once and allow it to finish loading. The service worker caches the app for later offline use. Browser storage must remain available. Installation as a standalone app depends on browser support.

The service worker checks the network first and uses cached files offline. When changing app files, increment `CACHE_VERSION` in `sw.js`. Each hosted app path has its own cache namespace.

## Files

- `index.html`: app interface, logic, and bundled Three.js
- `observatory.css`: visual styling
- `manifest.json`: installable web app metadata
- `sw.js`: offline caching
- `icon-192.png`, `icon-512.png`: app icons
- `THIRD_PARTY_NOTICES.md`: bundled library license

## Student data

Activity progress and reflections are stored in the current browser's local storage. They do not sync between devices. The teacher dashboard reads report files selected by the user. Clearing browser data can remove saved progress. Keep downloaded student reports outside this source folder and do not upload them to GitHub.

## Licensing

Three.js is distributed under the MIT license; see `THIRD_PARTY_NOTICES.md`. No license for the original app code or artwork has been selected in this preparation. The owner can add a `LICENSE` file if they wish to grant reuse rights.
