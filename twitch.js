// В twitch.js
const tmi = require('tmi.js');

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true
  },
  channels: ['andrusha_wav']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if (self) return; // Игнорируем свои сообщения
  
  addLine(`[CHAT] ${tags['display-name']}: ${message}`);
});

function addLine(text) {
  const terminalOutput = document.getElementById('terminalOutput');
  const line = document.createElement('div');
  line.textContent = text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}