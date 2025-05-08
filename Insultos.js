const { Client, GatewayIntentBits } = require('discord.js');
const insults = require('./insultos.json');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// Configuración — CAMBIA ESTOS DATOS
const INTERVALO_MS = 5 * 60 * 1000; // 5 minutos
const CANAL_ID = process.env.CANAL_ID;
const USUARIO_ID = process.env.USUARIO_ID;
//const CANAL_ID = '1355079546189381652'; // ID del canal donde se enviará el mensaje
//const USUARIO_ID = '719810360374329387'; // ID del usuario a mencionar

// Función para elegir un insulto aleatorio
function obtenerInsultoAleatorio() {
  const todas = Object.values(insults).flat();
  return todas[Math.floor(Math.random() * todas.length)];
}

client.once('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);

  const canal = client.channels.cache.get(CANAL_ID);

  if (!canal) {
    console.error('Canal no encontrado. Verifica el ID.');
    return;
  }

  // Envío inicial y luego cada 5 minutos
  setInterval(() => {
    const insulto = obtenerInsultoAleatorio();
    canal.send(`<@${USUARIO_ID}>, ${insulto}`);
  }, INTERVALO_MS);
});

client.login(process.env.BOT_TOKEN);
