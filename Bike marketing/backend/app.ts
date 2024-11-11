import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Definir os tipos explicitamente para os parâmetros
app.post('/enviar-email', async (req: Request, res: Response) => {
    const { destinatario, mensagem } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'seuemail@gmail.com',
            pass: 'suasenha'
        }
    });

    const mailOptions = {
        from: 'seuemail@gmail.com',
        to: destinatario,
        subject: 'Nova Mensagem',
        text: mensagem
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send({ sucesso: true, mensagem: 'E-mail enviado!' });
    } catch (error) {
        res.status(500).send({ sucesso: false, erro: error });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
