const ws = new WebSocket('wss://fstream.binance.com/ws/btcusdt@markPrice@1s');

ws.onmessage = function(event) {
  const parsedData = JSON.parse(event.data);
  const markPrice = parsedData.p;
  const fundingRate = parsedData.r;
  
  // Exibir o preço e o funding rate na interface da extensão
  document.getElementById('price').textContent = parseFloat(markPrice).toFixed(2);
  document.getElementById('funding-rate').textContent = fundingRate;
}
