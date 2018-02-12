const Koa = require('koa'),
    router = require('koa-router')(),
    fs = require('fs'),
    ex = require('koa-exception'),
    bodyParser = require('koa-bodyparser'),
    puppeteer = require('puppeteer');
const app = new Koa();

app.use(ex('CN'));
app.use(bodyParser({
    jsonLimit: '200mb',
    formLimit: '200mb'
}));
// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', '*');
//     ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
//     ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers");
//     if (ctx.method == 'OPTIONS') {
//       ctx.status = 204;
//       return;
//     }
//     await next();
//   });

/**
 * query param:
 *   - html: html http url
 *   - orientation: "vertical" || "horizontal"
 *   - page_size: "A3" || "A4". Paper format. If set, takes priority over width or height options. Defaults to 'Letter'.
 *   - width: "1920px" || "10cm"
 *   - heigth: "1200px"|| "30cm"
 */
router.get('/html-to-pdf', async ctx => {
    let param = ctx.query;
    if (!param.html) {
        ctx.body = {
            code: 500,
            msg: 'HTML 内容不能为空!'
        };
        return;
    }
    let landscape = param.orientation == 'vertical' ? false : true;
    let options = {
        // format: param.page_size || 'A3',
        landscape: landscape,
        printBackground: true,
        margin: {
            top: param.top || "0",
            right: param.right || "0",
            bottom: param.bottom || "0",
            left: param.left || "0"
        }
    };
    if (param.page_size) {
        options.format = param.page_size;
    } else {
        options.width = param.width;
        options.height = param.height;
    }
    let buffer = await convertHtml2Pdf(param.html, options);
    // await page.setContent
    // let buffer = await new Promise(
    //     (resolve, reject) => {
    //         pdf.create(param.html, {
    //             format: param.page_size || 'A3',
    //             orientation: 'portrait',
    //             renderDelay: param.render_delay || 'manual'
    //             // renderDelay: '100'
    //         }).toBuffer((err, buf) => {
    //             resolve(buf);
    //         });
    //     }
    // )
    ctx.set('Content-Type', 'application/pdf');
    if (!param.preview)
        ctx.set("Content-Disposition", "attachment; filename=html-pdf-" + new Date().getTime() + ".pdf");
    ctx.body = buffer;
});

/**
 * request body:
 *   - html: html string content.
 *   - orientation: "vertical" || "horizontal"
 *   - page_size: "A3" || "A4". Paper format. If set, takes priority over width or height options. Defaults to 'Letter'.
 *   - width: "1920px" || "10cm"
 *   - heigth: "1200px"|| "30cm"
 */
router.post('/html-to-pdf', async ctx => {
    let param = ctx.request.body;
    if (!param.html) {
        ctx.body = {
            code: 500,
            msg: 'HTML 内容不能为空!'
        };
        return;
    }
    let landscape = param.orientation == 'vertical' ? false : true;
    let options = {
        // format: param.page_size || 'A3',
        landscape: landscape,
        printBackground: true,
        margin: {
            top: param.top || "0",
            right: param.right || "0",
            bottom: param.bottom || "0",
            left: param.left || "0"
        }
    };
    if (param.page_size) {
        options.format = param.page_size;
    } else {
        options.width = param.width;
        options.height = param.height;
    }
    let buffer = await convertHtml2Pdf(`data:text/html,${param.html}`, options);
    ctx.set('Content-Type', 'application/pdf');
    if (!param.preview)
        ctx.set("Content-Disposition", "attachment; filename=html-pdf-" + new Date().getTime() + ".pdf");
    ctx.body = buffer;
});

/**
 * convert html to pdf.
 * @param {string} html url or string content.
 * @param {Object} options convert options.
 */
async function convertHtml2Pdf(html, options) {
    let browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    let page = await browser.newPage();
    await page.setJavaScriptEnabled(true);
    await page.emulateMedia('print');
    await page.goto(html, { waitUntil: 'networkidle0', timeout: 900000 }); // 900 seconds
    let buffer = await page.pdf(options);
    await browser.close();
    return buffer;
}

app.use(router.routes());

let port = process.env.NODE_PORT || 3000;
app.listen(port, function () {
    console.log(` ---> Server running on port: ${port}`);
});