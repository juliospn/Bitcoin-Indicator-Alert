// alarm.js

let lastNotifications = {};

// Define o nome da chave de armazenamento local
const storageKey = "alarmEnabled";

// Adiciona um ouvinte de evento ao interruptor de alarme para detectar quando o usuário o altera
document.getElementById("alarm-checkbox").addEventListener("change", function (event) {
    // Armazena o novo estado do interruptor no armazenamento local
    chrome.storage.local.set({ [storageKey]: event.target.checked });
});

// Lê o estado do interruptor do armazenamento local e define seu estado de acordo
chrome.storage.local.get([storageKey], function (result) {
    const isEnabled = result[storageKey];
    document.getElementById("alarm-checkbox").checked = isEnabled;
});

chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === "updateAlarmLevels") {
        chrome.storage.local.get(["enabledAlarmLevels", "alarmLevels"], function (
            result
        ) {
            const enabledAlarmLevels = result.enabledAlarmLevels || [];
            const alarmLevels = result.alarmLevels || {};
            for (let i = 0; i < enabledAlarmLevels.length; i++) {
                const alarmLevel = enabledAlarmLevels[i];
                const fundingRate = parseFloat(
                    document.getElementById("funding-rate").textContent
                );
                if (
                    isEnabled && // Verifica se o interruptor de alarme está ativado
                    fundingRate <= alarmLevels[alarmLevel] &&
                    (lastNotifications[alarmLevel] == undefined ||
                        Date.now() - lastNotifications[alarmLevel] > 60000)
                ) {
                    lastNotifications[alarmLevel] = Date.now();
                    chrome.notifications.create({
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "#Time2Buy",
                        message: ' Funding rate has dropped to ${ alarmLevels[alarmLevel]}.Time to buy!',
                    });
                }
            }
        });
    }
});