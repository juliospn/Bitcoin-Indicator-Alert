document.getElementById("buy-history-btn").addEventListener("click", function () {
  chrome.windows.create({
    url: "purchase-history.html",
    type: "popup",
    width: 380,
    height: 600
  });
});
