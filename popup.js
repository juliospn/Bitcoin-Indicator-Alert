const ws = new WebSocket('wss://fstream.binance.com/ws/btcusdt@markPrice@1s');

const fundingRateDisplay = document.getElementById('funding-rate');
const fundingRateThresholdInput = document.getElementById('fundingRateThreshold');
const saveButton = document.getElementById('saveButton');

ws.onmessage = function (event) {
  const parsedData = JSON.parse(event.data);
  const markPrice = parsedData.p;
  const fundingRate = parsedData.r;

  // Exibir o preço e o funding rate na interface da extensão
  document.getElementById('price').textContent = '$ ' + parseFloat(markPrice).toFixed(2);

  // Adicionar a classe "negative" ao elemento "funding-rate" se o funding rate for negativo, adicionar a classe "positive" caso contrário
  fundingRateDisplay.classList.remove('negative');
  fundingRateDisplay.classList.remove('positive');
  if (fundingRate < 0) {
    fundingRateDisplay.classList.add('negative');
  } else if (fundingRate > 0) {
    fundingRateDisplay.classList.add('positive');
  }

  // Exibir o funding rate na interface da extensão com duas casas decimais
  fundingRateDisplay.textContent = `+${(fundingRate * 100).toFixed(5)}%`;

  // Atualizar a descrição da extensão com as informações de preço e funding rate
  chrome.browserAction.setTitle({
    title: `Bitcoin Price: $ ${parseFloat(markPrice).toFixed(2)} | Funding Rate: ${(fundingRate * 100).toFixed(4)}%`
  });
}

// Inicializa o Firebase
const firebaseConfig = {
  // Configurações do seu projeto do Firebase
};

firebase.initializeApp(firebaseConfig);

// Obtém o token de registro
const messaging = firebase.messaging();
messaging.requestPermission().then(() => {
  return messaging.getToken();
}).then((token) => {
  console.log('Token de registro:', token);
}).catch((error) => {
  console.error(error);
});

