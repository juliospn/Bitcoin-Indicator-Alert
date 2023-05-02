// Selecione o formulário de configurações de alerta
const alertForm = document.querySelector('#alert-form');

// Adicione um evento de envio para o formulário
alertForm.addEventListener('submit', (event) => {
  // Impedir que o formulário seja enviado por meio de uma solicitação HTTP padrão
  event.preventDefault();

  // Obtenha os valores dos campos do formulário
  const asset = document.querySelector('#asset').value;
  const metric = document.querySelector('#metric').value;
  const exchange = document.querySelector('#exchange').value;
  const condition = document.querySelector('#condition').value;
  const threshold = document.querySelector('#threshold').value;
  const type = document.querySelector('#type').value;
  const cool_down = document.querySelector('#cool_down').value;
  const channels = document.querySelectorAll('input[name="channels"]:checked');
  const channelsArr = Array.from(channels).map(channel => channel.value);
  const channelsStr = channelsArr.join(',');
  const note = document.querySelector('#note').value;

  // Crie um objeto com as configurações de alerta
  const alert = {
    asset: asset,
    metric: metric,
    exchange: exchange,
    condition: condition,
    threshold: threshold,
    type: type,
    cool_down: cool_down,
    channels: channelsStr,
    note: note,
  };

  // Envie uma solicitação POST para adicionar as configurações de alerta ao servidor
  $.ajax({
    url: '/alerts',
    type: 'POST',
    data: JSON.stringify(alert),
    contentType: 'application/json',
    success: (data) => {
      // Exiba uma mensagem de sucesso para o usuário
      alert('Alerta criado com sucesso!');
      // Limpe o formulário para permitir a criação de novos alertas
      alertForm.reset();
    },
    error: (error) => {
      // Exiba uma mensagem de erro para o usuário
      alert('Ocorreu um erro ao criar o alerta!');
    }
  });
});