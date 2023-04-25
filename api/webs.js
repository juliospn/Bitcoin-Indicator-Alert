const puppeteer = require('puppeteer');

async function getBitcoinFundingRate() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://cryptoquant.com/markets/funding-rates/btc-funding-rates-all-exchanges');
  
  // espera o elemento carregar
  await page.waitForSelector('.tabular-data__value');

  // obtém o valor do funding rate global do Bitcoin
  const fundingRate = await page.evaluate(() => {
    const element = document.querySelector('.tabular-data__value');
    return element.innerText.trim();
  });

  await browser.close();
  return fundingRate;
}

// chama a função para obter o funding rate
getBitcoinFundingRate().then(fundingRate => console.log(`Funding rate global do Bitcoin: ${fundingRate}`));