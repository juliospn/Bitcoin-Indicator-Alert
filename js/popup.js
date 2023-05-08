const lastAvgPriceSpan = document.getElementById('last_avg_price');
const lastAvgPriceStorage = JSON.parse(localStorage.getItem('last-avg-price'));
if (lastAvgPriceStorage) {
  lastAvgPriceSpan.textContent = lastAvgPriceStorage.toLocaleString();
}

const globalFundingRateSpan = document.getElementById('global-funding-rate');
fetch('http://localhost:3000/global-funding-rate')
  .then(response => response.text())
  .then(data => {
    const globalFundingRate = parseFloat(data.replace(/['"]+/g, ''));
    const formattedGlobalFundingRate = (globalFundingRate >= 0 ? '+' : '') + globalFundingRate.toFixed(5) + '%';
    globalFundingRateSpan.textContent = formattedGlobalFundingRate;
    const color = globalFundingRate >= 0 ? 'rgb(224, 113, 142)' : 'rgb(83, 165, 83)';
    globalFundingRateSpan.style.color = color;
  })
  .catch((err) => {
    console.error(err);
  });
