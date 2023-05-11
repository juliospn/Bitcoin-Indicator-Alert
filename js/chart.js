const ctx = document.getElementById('funding-rate-chart').getContext('2d');

ctx.canvas.style.margin = 'auto';
ctx.canvas.style.display = 'block';
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Global Funding Rate',
            data: [],
            backgroundColor: function (context) {
                var index = context.dataIndex;
                var value = context.dataset.data[index];
                return value > 0 ? 'rgb(220, 65, 112)' : 'rgb(83, 165, 83)';
            },
            borderColor: function (context) {
                var index = context.dataIndex;
                var value = context.dataset.data[index];
                return value > 0 ? 'rgba(0, 0, 0, 1)' : 'solid';
            },
        }]
    },
    options: {
        scales: {
            y: {
                display: false, // Remover a legenda lateral sobre os valores
                ticks: {
                    min: -0.2,
                    max: 0.2,
                    stepSize: 0.1,
                    callback: function (value, index, values) {
                        return value.toFixed(5) + '%';
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            x: {
                barThickness: 1, // Definir o intervalo entre as barras como 1 (quase 0)
                ticks: {
                    display: false // Remover a legenda na parte de baixo do gráfico
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false // Remover a legenda
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return 'Global Funding Rate: ' + context.parsed.y.toFixed(5) + '%';
                    }
                }
            },
            backgroundColor: 'black'
        }
    }
});

// Fazer a requisição para obter os dados do arquivo JSON
fetch('http://localhost:3000/funding-rate-data-json')
    .then(response => response.json())
    .then(data => {
        // Processar os dados obtidos e atualizar o gráfico
        const labels = [];
        const fundingRateData = [];
        data.forEach(entry => {
            const timestamp = entry['Timestamp;Global Funding Rate'].split(';')[0] + entry['_1'].split(';')[0];
            const fundingRate = parseFloat(entry['_1'].split(';')[1]);
            labels.push(timestamp);
            fundingRateData.push(fundingRate);
        });

        // Atualizar os dados do gráfico
        chart.data.labels = labels;
        chart.data.datasets[0].data = fundingRateData;

        // Redesenhar o gráfico
        chart.update();
    })
    .catch(error => {
        console.error(error);
    });
