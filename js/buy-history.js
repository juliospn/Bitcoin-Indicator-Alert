document.getElementById("buy-history-btn").addEventListener("click", function () {
  chrome.windows.create({
    url: "buy-history.html",
    type: "popup",
    width: 380,
    height: 600
  });
});
