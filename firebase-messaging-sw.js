importScripts('https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.3/firebase-messaging.js');

firebase.initializeApp({
  // Configurações do seu projeto do Firebase
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const notificationTitle = 'Título da Notificação';
  const notificationOptions = {
    body: 'Corpo da Notificação',
    icon: 'caminho/para/o/icone.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
