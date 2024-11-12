const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path'); // Adicione o módulo 'path'
const app = express();
const PORT = 3000;

app.use(express.json());

// Serve os arquivos estáticos da pasta 'frontend'
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Carregar perguntas do FAQ
const loadFAQData = () => {
    const data = fs.readFileSync('./data.json');
    return JSON.parse(data);
};

// Endpoint para obter todas as perguntas
app.get('/faq', (req, res) => {
    const faqData = loadFAQData();
    res.json(faqData);
});

// Endpoint para busca de perguntas por palavra-chave
app.get('/faq/search', (req, res) => {
    const { query } = req.query;
    const faqData = loadFAQData();
    const filteredFAQ = faqData.filter(item =>
        item.question.toLowerCase().includes(query.toLowerCase())
    );
    res.json(filteredFAQ);
});

// Configuração do transporte de email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seuemail@gmail.com', // Substitua pelo seu email
        pass: 'suasenha'            // Substitua pela sua senha
    }
});

// Endpoint para enviar email com o conteúdo do FAQ
app.post('/send-faq', (req, res) => {
    const faqData = loadFAQData();
    const emailContent = faqData.map(item => 
        `Categoria: ${item.category}\nPergunta: ${item.question}\nResposta: ${item.answer}\n\n`
    ).join('');

    const mailOptions = {
        from: 'seuemail@gmail.com',              // Substitua pelo seu email
        to: 'andreneves6663234@gmail.com',
        subject: 'FAQ - Perguntas Frequentes',
        text: emailContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar o email');
        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).send('Email enviado com sucesso');
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
