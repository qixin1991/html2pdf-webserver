# html2pdf-webserver

### Usage

API URL: `/html-to-pdf`
Default Server Port: `3001`

- `GET` method

```
/**
 * query param:
 *   - html: html http url
 *   - orientation: "vertical" || "horizontal"
 *   - page_size: "A3" || "A4". Paper format. If set, takes priority over width or height options. Defaults to 'Letter'.
 *   - width: "1920px" || "10cm"
 *   - heigth: "1080px"|| "30cm"
 */
```

- `POST` method

```
/**
 * request body:
 *   - html: html string content.
 *   - orientation: "vertical" || "horizontal"
 *   - page_size: "A3" || "A4". Paper format. If set, takes priority over width or height options. Defaults to 'Letter'.
 *   - width: "1920px" || "10cm"
 *   - heigth: "1080px"|| "30cm"
 */
```

### Dependency

Ubuntu:
```
apt install -y libxss1 libx11-xcb1 libasound2 \
 libxcomposite-dev libxcursor-dev libxdamage-dev \
 libxi-dev libxtst-dev libcups2 libxrandr2 \
 libpangocairo-1.0-0 libxi6 libxtst6 libnss3 \
 libgconf2-4 libatk1.0-0 libgtk-3-0
```

CentOS:

```
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
```

### Install & Run
```
npm install
pm2 start ecosystem.json
```
Open this URL: `http://localhost:3001/html-to-pdf?html=https://news.ycombinator.com` for test.

### Chinese Note
Due to the `GFW`,`Chromium` download can't be accessed.Issue the following command:

```
PUPPETEER_DOWNLOAD_HOST=http://s3.jzez100.com/s3/linux npm i --registry=https://registry.npm.taobao.org
```