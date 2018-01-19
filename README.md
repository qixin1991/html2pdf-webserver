# html2pdf-webserver

### Usage

API URL: `/html-to-pdf`

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

### Run
```
pm2 start ecosystem.json
```

### Chinese Note
Due to the `GFW`,`Chromium` download can't be accessed.Issue the following command:

```
PUPPETEER_DOWNLOAD_HOST=http://s3.jzez100.com/s3/linux npm i --registry=https://registry.npm.taobao.org
```