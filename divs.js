const { Client } = require('discord.js-selfbot-v11');
const fs = require('fs');
const colors = require("colors");

const msgSv = fs.readFileSync('./mensagemServer.txt').toString();
const msgDm = fs.readFileSync('./dm.txt').toString();

const idSv = "idserver";
const idChn = "idcanal";
const token = "token";
let client = new Client();

client.on('ready', () => {
    console.log(`conectado como ${client.user.tag}`.red);
    setInterval(() => {
        let sv = client.guilds.get(idSv);
        if (!sv) return console.log(`ID de servidor incorreto / ou a conta foi banida!`);
        let chn = sv.channels.get(idChn);
        if (!chn) return console.log(`ID de canal incorreto / ou a conta foi banida!`);
        chn.send(msgSv).catch((err) => {
            console.error(err);
        });
    }, 100 * 600);
});

const usersSentTo = [];

client.on("message", message => {
    if (message.guild) return;
    if (message.author.id === client.user.id) return;
    if (usersSentTo.some(id => id === message.author.id)) return;
    message.author.send(msgDm)
        .then(() => {
            usersSentTo.push(message.author.id);
            console.log(`mensagem enviada para ${message.author.tag}`)
        })
        .catch(() => console.error(`Erro ao enviar mensagem para ${message.author.tag}`));
});

client.on('error', (err) => console.error(err));

client.login(token).catch(console.error);