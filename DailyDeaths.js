const url = require('url');
const fs = require('fs');
const axios = require('axios');
const innertext = require('innertext');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

/**
 * @todo this is basically nothing for now
 */
export default class DailyDeaths {
  constructor() {
    this.url = 'https://www.worldometers.info/coronavirus/country/hungary/';
  }

  /**
   * @todo get div#graph-deaths-daily
     @todo get rect elements from it
     @todo check height
   */
  async scrape() {
    const rawDailyDeathsPage = await axios.get(this.url);
    const { document } = new JSDOM(rawDailyDeathsPage.data).window;
    _pasre(document);
  }

  /**
   * @param {Document} document
   */
  _parse(document) {
    const graph = document.getElementById('graph-deaths-daily');
    const rects = graph.getElementsByTagName('rect');
    for (rect of rects) {
      console.log(rect.height);
    }
  }
}
