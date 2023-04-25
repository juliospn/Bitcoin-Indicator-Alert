
document.getElementById("set-alarm-btn").addEventListener("click", function () {
  chrome.windows.create({
    url: "set-alarm.html",
    type: "popup",
    width: 500,
    height: 900
  });
});
