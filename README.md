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
apt install libxss1
apt install libasound2
```

### Run
```
pm2 start ecosystem.json
```