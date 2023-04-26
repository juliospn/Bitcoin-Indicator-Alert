const buyForm = document.getElementById('buy-form');
const buyHistoryTable = document.getElementById('buy-history-table');
let buyHistory = JSON.parse(localStorage.getItem('buyHistory')) || [];
let lastAveragePrice = 0;

function renderBuyHistory() {
    buyHistoryTable.innerHTML = '';
    buyHistory.forEach((buy, index) => {
        console.log('buy.averagePrice:', buy.averagePrice);
        console.log('buy.price:', buy.price);
        const row = document.createElement('tr');
        const priceCell = document.createElement('td');
        priceCell.textContent = buy.price != null ? buy.price.toFixed(0) : '-';

        const quantityCell = document.createElement('td');
        quantityCell.textContent = buy.quantity.toFixed(6);

        const avgPriceCell = document.createElement('td');
        avgPriceCell.textContent = buy.averagePrice != null ? buy.averagePrice.toFixed(0) : '-';

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                buyHistory.splice(index, 1);
                renderBuyHistory();
                saveBuyHistory();
            });
        }
        deleteCell.appendChild(deleteButton);

        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(avgPriceCell);
        row.appendChild(deleteCell);

        buyHistoryTable.appendChild(row);
    });
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
    updateLastAveragePrice();
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
    updateLastAveragePrice(); // Added
}

function getLastAveragePrice() {
    if (buyHistory.length === 0) {
        return 0;
    }
    return buyHistory[buyHistory.length - 1].averagePrice;
}

function updateLastAveragePrice() {
    const lastAvgPriceElement = document.querySelector('#last-avg-price');
    lastAvgPriceElement.textContent = getLastAveragePrice().toFixed(2);
}

loadBuyHistory();
console.log(lastAveragePrice);