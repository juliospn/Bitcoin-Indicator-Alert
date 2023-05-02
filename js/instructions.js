
document.getElementById("instructions-btn").addEventListener("click", function () {
  chrome.windows.create({
    url: "instructions.html",
    type: "popup",
    width: 500,
    height: 900
  });
});
