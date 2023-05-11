const lastAvgPriceSpan = document.getElementById('last_avg_price');
const lastAvgPriceStorage = JSON.parse(localStorage.getItem('last-avg-price'));
if (lastAvgPriceStorage) {
  lastAvgPriceSpan.textContent = lastAvgPriceStorage.toLocaleString();
}

const globalFundingRateSpan = document.getElementById('global-funding-rate');

function saveGlobalFundingRate(globalFundingRate) {
  // salva o valor em um arquivo tabela usando o fs do Node.js
  // ou outra biblioteca de manipulação de arquivos
}

fetch('http://localhost:3000/global-funding-rate')
  .then(response => response.text())
  .then(data => {
    const globalFundingRate = parseFloat(data.replace(/['"]+/g, ''));
    const formattedGlobalFundingRate = (globalFundingRate >= 0 ? '+' : '') + globalFundingRate.toFixed(5) + '%';
    globalFundingRateSpan.textContent = formattedGlobalFundingRate;
    const color = globalFundingRate >= 0 ? 'rgb(224, 113, 142)' : 'rgb(83, 165, 83)';
    globalFundingRateSpan.style.color = color;

    // chama a função para salvar o valor atual
    saveGlobalFundingRate(globalFundingRate);
  })
  .catch((err) => {
    console.error(err);
  });

// chama a função a cada 30 minutos


setInterval(() => {
  fetch('http://localhost:3000/global-funding-rate')
    .then(response => response.text())
    .then(data => {
      const globalFundingRate = parseFloat(data.replace(/['"]+/g, ''));
      // chama a função para salvar o valor atual
      saveGlobalFundingRate(globalFundingRate);
    })
    .catch((err) => {
      console.error(err);
    });
}, 30 * 60 * 1000);

// use a tabela salva como fonte de dados para gerar o gráfico com o Chart.js
