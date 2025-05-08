const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const insults = require('./insultos.json');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const INTERVALO_MS = 3 * 60 * 1000; // 5 minutos
const CANAL_NOMBRE = process.env.CANAL_NOMBRE; // <- nombre, no ID
const USUARIO_ID = process.env.USUARIO_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;

function obtenerInsultoAleatorio() {
  const todas = Object.values(insults).flat();
  return todas[Math.floor(Math.random() * todas.length)];
}

client.once('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);

  // Buscamos el canal por nombre
  const canal = client.channels.cache.find(
    c => c.name === CANAL_NOMBRE && c.type === ChannelType.GuildText
  );

  if (!canal) {
    console.error(`Canal "${CANAL_NOMBRE}" no encontrado. Verifica el nombre.`);
    return;
  }

  console.log(`Canal encontrado: ${canal.name}`);

  setInterval(() => {
    const insulto = obtenerInsultoAleatorio();
    canal.send(`<@${USUARIO_ID}>, ${insulto}`).catch(console.error);
  }, INTERVALO_MS);
});

client.login(BOT_TOKEN);
