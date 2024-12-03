const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do transporte de e-mail com Sendinblue
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: '812411001@smtp-brevo.com', // E-mail da sua conta Sendinblue
    pass: 'aBdRMxyt8HUmWNw7',          // API key gerada no Sendinblue
  },
});

// Rota para enviar o e-mail
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: 'andreneves6663234@gmail.com',  // E-mail de envio (deve ser autorizado no Sendinblue)
    to: 'andreneves6663234@gmail.com',  // E-mail que receberá as perguntas
    subject: 'FAQ - Pergunta do Usuário',
    text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ success: false, message: error.toString() });
    }
    res.send({ success: true, message: 'Email enviado com sucesso!' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
