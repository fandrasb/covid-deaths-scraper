const url = require('url');
const fs = require('fs');
const axios = require('axios');
const innertext = require('innertext');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const data = new Array();
const csvData = ''; // TODO

/**
 * @param {string} textVal
 * @return {string}
 */
function getSex(textVal) {
  if (textVal === 'férfi' || textVal === 'Férfi') {
    return 'M';
  } else {
    return 'F';
  }
}

/**
 * @param {string} textVal
 * @return {Array<string>}
 */
function getUnderlying(textVal) {
  const underlyingConditions = textVal.split(',');
  return underlyingConditions.map((condition) => condition.trim());
}

/**
 * @param {Document} document
 * @return {string}
 */
function parseDataOnPage(document) {
  const table = document.getElementsByTagName('table')[0];

  // we skip the table head
  for (let i = 1; i < table.rows.length; ++i) {
    const currentDataPoint = {};
    const row = table.rows[i];

    currentDataPoint.id = innertext(row.cells[0].outerHTML);
    currentDataPoint.sex = getSex(innertext(row.cells[1].outerHTML));
    currentDataPoint.age = innertext(row.cells[2].outerHTML);
    currentDataPoint.underlying = getUnderlying(
      innertext(row.cells[3].outerHTML)
    );

    data.push(currentDataPoint);
  }
}

/**
 * @param {Document} mainDoc
 */
function getNumPages(mainDoc) {
  /**
   * @type {HTMLLIElement}
   */
  const pagerLastLi = mainDoc.getElementsByClassName('pager-last')[0];
  const lastPageAnchor = pagerLastLi.getElementsByTagName('a')[0];
  const lastPageURL = new URL(
    `https://koronavirus.gov.hu/${lastPageAnchor.href}`
  );

  return parseInt(lastPageURL.searchParams.get('page'));
}

/**
 * @param {Document} mainDoc
 */
async function runScrape(mainDoc) {
  const numPages = getNumPages(mainDoc);
  parseDataOnPage(mainDoc);
  for (let i = 1; i <= numPages; ++i) {
    const resp = await axios.get(
      `https://koronavirus.gov.hu/elhunytak?page=${i}`
    );
    const { document } = new JSDOM(resp.data).window;
    parseDataOnPage(document);
  }

  fs.writeFile('data/data.json', JSON.stringify(data), function (err) {
    if (err) return console.log(err);
    console.log('Data written to data/data.json...');
  });
}

async function main() {
  try {
    const mainPageResp = await axios.get(
      'https://koronavirus.gov.hu/elhunytak'
    );
    const { document } = new JSDOM(mainPageResp.data).window;
    runScrape(document);
  } catch (error) {
    console.log(error);
  }
}

main();
