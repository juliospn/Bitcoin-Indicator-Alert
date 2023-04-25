document.getElementById("buy-history-btn").addEventListener("click", function () {
  chrome.windows.create({
    url: "buy-history.html",
    type: "popup",
    width: 350,
    height: 500
  });
});
