const buyForm = document.getElementById('buy-form');
const buyHistoryTable = document.getElementById('buy-history-table');
let buyHistory = JSON.parse(localStorage.getItem('buyHistory')) || [];
let lastAveragePrice = 0;


function renderBuyHistory() {
    buyHistoryTable.innerHTML = '';
    buyHistory.forEach((buy, index) => {
        const row = document.createElement('tr');

        const priceCell = document.createElement('td');
        priceCell.textContent = buy.price != null ? buy.price.toLocaleString() : '-';
        row.appendChild(priceCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = buy.quantity.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 });
        row.appendChild(quantityCell);

        const lastAvgPriceCell = document.createElement('td');
        lastAvgPriceCell.classList.add('last-avg-price');
        row.appendChild(lastAvgPriceCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                buyHistory.splice(index, 1);
                renderBuyHistory();
                saveBuyHistory();

                // Recalcula o preço médio e atualiza o valor exibido na página
                let sum = 0;
                let totalQuantity = 0;
                for (let i = 0; i < buyHistory.length; i++) {
                    sum += buyHistory[i].price * buyHistory[i].quantity;
                    totalQuantity += buyHistory[i].quantity;
                }
                if (totalQuantity > 0) {
                    lastAveragePrice = sum / totalQuantity;
                } else {
                    lastAveragePrice = 0;
                }
                updateLastAveragePrice(lastAveragePrice);

                // Atualiza o valor no localStorage
                localStorage.setItem('last-avg-price', lastAveragePrice.toFixed(1));
            });
        }
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        buyHistoryTable.appendChild(row);
    });

    // Recalcula o last average price
    let sum = 0;
    let totalQuantity = 0;
    for (let i = 0; i < buyHistory.length; i++) {
        sum += buyHistory[i].price * buyHistory[i].quantity;
        totalQuantity += buyHistory[i].quantity;
    }
    if (totalQuantity > 0) {
        lastAveragePrice = sum / totalQuantity;
    } else {
        lastAveragePrice = 0;
    }
    // Atualiza o valor no localStorage
    localStorage.setItem('last-avg-price', lastAveragePrice.toFixed(1));

    // Seleciona o último elemento com a classe "last-avg-price" e define o seu ID
    const lastAvgPriceCells = document.querySelectorAll('.last-avg-price');
    if (lastAvgPriceCells.length) {
        const lastAvgPriceCell = lastAvgPriceCells[lastAvgPriceCells.length - 1];
        lastAvgPriceCell.id = 'last-avg-price';
    }
}


function calculateAveragePrice() {
    const lastBuy = buyHistory[buyHistory.length - 1];
    const previousBuys = buyHistory.slice(0, buyHistory.length - 1);
    if (!previousBuys.length) {
        return lastBuy.price;
    }
    const totalValue = previousBuys.reduce((acc, buy) => {
        return acc + (buy.price * buy.quantity);
    }, 0) + (lastBuy.price * lastBuy.quantity);
    const totalQuantity = previousBuys.reduce((acc, buy) => {
        return acc + buy.quantity;
    }, 0) + lastBuy.quantity;
    return parseFloat((totalValue / totalQuantity).toFixed(1));
}

function addBuyToHistory(price, quantity) {
    const newBuy = { price, quantity };
    buyHistory.push(newBuy);
    const averagePrice = calculateAveragePrice();
    newBuy.averagePrice = isNaN(averagePrice) ? 0 : averagePrice;
    renderBuyHistory();
    saveBuyHistory();
    updateLastAveragePrice(newBuy.averagePrice); // passa o valor do último preço médio como argumento
    newBuy.lastAveragePrice = newBuy.averagePrice;
}

function saveBuyHistory() {
    localStorage.setItem('buyHistory', JSON.stringify(buyHistory));
    console.log('Buy history saved');
}

buyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const price = parseFloat(document.getElementById('price-buy').value);
    const quantity = parseFloat(document.getElementById('quantity').value);
    addBuyToHistory(price, quantity);
});

function loadBuyHistory() {
    buyHistory = JSON.parse(localStorage.getItem('buyHistory')) || [];
    renderBuyHistory();
    const lastAvgPrice = localStorage.getItem('last-avg-price');
    const lastAvgPriceSpan = document.getElementById('last_avg_price');
    lastAvgPriceSpan.textContent = lastAvgPrice ? lastAvgPrice : '-';
}

function getLastAveragePrice() {
    if (buyHistory.length === 0) {
        return 0;
    }
    return buyHistory[buyHistory.length - 1].averagePrice;
}

function updateLastAveragePrice(lastAveragePrice) {
    const lastAvgPriceSpan = document.getElementById('last-avg-price');
    lastAvgPriceSpan.textContent = lastAveragePrice ? lastAveragePrice.toFixed(1) : '-';
    localStorage.setItem('last-avg-price', lastAveragePrice.toFixed(1));
    lastAveragePrice = localStorage.getItem('last-avg-price');
}

loadBuyHistory();