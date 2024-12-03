document.getElementById('faq-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
  
      const result = await response.json();
      document.getElementById('response-message').innerText = result.message;
    } catch (error) {
      document.getElementById('response-message').innerText = 'Erro ao enviar a mensagem.';
    }
  });

  function selectBike(model) {
    fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Usuário Anônimo',
        email: 'usuario@exemplo.com',
        message: `O modelo ${model} foi selecionado.`,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
      })
      .catch(() => {
        alert('Erro ao enviar a seleção.');
      });
  }