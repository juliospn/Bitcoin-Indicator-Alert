const lastAvgPriceSpan = document.getElementById('last_avg_price');
const lastAvgPriceStorage = JSON.parse(localStorage.getItem('last-avg-price'));
if (lastAvgPriceStorage) {
  lastAvgPriceSpan.textContent = lastAvgPriceStorage.toLocaleString();
}
