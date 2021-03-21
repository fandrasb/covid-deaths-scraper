const fs = require('fs');

let fileToAnalyze = './data/data.json';

function avgAges() {
  if (fileToAnalyze === '') {
    console.log('Please set the fileToAnalyze variable to a valid path');
  }

  fs.readFile(fileToAnalyze, 'utf8', function (err, jsonData) {
    if (err) {
      return console.log(err);
    }

    /**
     * @type {Array<Objectt>}
     */
    const dataArray = JSON.parse(jsonData);

    let firstSumAge = 0;
    let lastSumAge = 0;
    dataArray.forEach((dataPoint, index) => {
      if (index < 1000) {
        firstSumAge += parseInt(dataPoint.age);
      }

      if (index > dataArray.length - 1000) {
        lastSumAge += parseInt(dataPoint.age);
      }
    });

    console.log(`Első ezer átlaga: ${firstSumAge / 1000}`);
    console.log(`Utolsó ezer átlaga: ${lastSumAge / 1000}`);
  });
}

function countAgeInterval(low, high) {
  if (fileToAnalyze === '') {
    console.log('Please set the fileToAnalyze variable to a valid path');
  }

  fs.readFile(fileToAnalyze, 'utf8', function (err, jsonData) {
    if (err) {
      return console.log(err);
    }

    /**
     * @type {Array<Objectt>}
     */
    const dataArray = JSON.parse(jsonData);

    let count = 0;
    dataArray.forEach((dataPoint) => {
      if (dataPoint.age >= low && dataPoint.age <= high) {
        ++count;
      }
    });

    console.log(`${low} és ${high} között elhunytak: ${count}`);
  });
}

avgAges();
countAgeInterval(0, 20);
countAgeInterval(21, 30);
countAgeInterval(31, 40);
countAgeInterval(41, 50);
countAgeInterval(51, 60);
countAgeInterval(61, 70);
countAgeInterval(71, 80);
countAgeInterval(81, 90);
countAgeInterval(91, 200);
countAgeInterval(150, 200);
