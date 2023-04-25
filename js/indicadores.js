const wst = new WebSocket('wss://fstream.binance.com/ws/btcusdt@markPrice@1s');
const fundingRateDisplay = document.getElementById('funding-rate');

wst.onmessage = function (event) {
  const parsedData = JSON.parse(event.data);
  const markPrice = parsedData.p;
  const fundingRate = parsedData.r;

  // Exibir o preço na interface da extensão
  document.getElementById('price').textContent = '$ ' + parseFloat(markPrice).toFixed(2);

  // Exibir o funding rate na interface da extensão com duas casas decimais e um "+" na frente se o valor for maior que zero
  document.getElementById('funding-rate').textContent = `${fundingRate >= 0 ? '+' : ''}${(fundingRate * 100).toFixed(5)}%`;

  // Adicionar a classe "negative" ao elemento "funding-rate" se o funding rate for negativo, adicionar a classe "positive" caso contrário
  fundingRateDisplay.classList.remove('negative');
  fundingRateDisplay.classList.remove('positive');
  if (fundingRate < 0) {
    fundingRateDisplay.classList.add('negative');
  } else if (fundingRate > 0) {
    fundingRateDisplay.classList.add('positive');
  }
}
