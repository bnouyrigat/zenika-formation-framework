const puppeteer = require('puppeteer');

async function generatePdfFromHtml(html, options) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfContent = await page.pdf(options);
  browser.close();
  return pdfContent.toString('base64');
}

/**
 * @param {string} url URL where the slides are served
 * @param {object} options see https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
 * @returns {Promise<string>} PDF content in base64
 */
async function generatePdfAt(url, options) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForFunction('window.Reveal.isReady()', {
    polling: 500,
    timeout: 10000,
  });
  const pdfContent = await page.pdf(options);
  browser.close();
  return pdfContent.toString('base64');
}

module.exports = { generatePdfAt, generatePdfFromHtml };
