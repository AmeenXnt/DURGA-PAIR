const { makeWASocket, useSingleFileAuthState, delay } = require('@adiwajshing/baileys');
const pino = require('pino');
const fs = require('fs');
const fetch = require('node-fetch');
const { exec } = require('child_process');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const { state, saveState } = useSingleFileAuthState('./durga.data.json');
exec('rm -rf durga.data.json');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

function XeonBotInc() {
  let _0x180872 = [0x3, 0xca2, 0x9];
  const _0x37e6f4 = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    browser: ['DURGA MD', 'AmeenInt', '1.0.0'],
    auth: state,
    version: _0x180872,
  });

  _0x37e6f4.ev.on('connection.update', async (_0x3e98bf) => {
    const { connection: _0x361c11, lastDisconnect: _0x27bace, qr } = _0x3e98bf;
    if (qr) {
      io.emit('qr', qr);
    }
    if (_0x361c11 == 'open') {
      await delay(10000);
      const _0x5df854 = fs.readFileSync('./durga.data.json');
      let _0xa853d4 = await (await fetch('https://i.ibb.co/x125MFB/abf1dfc8f937.jpg')).buffer();
      await _0x37e6f4.sendMessage(_0x37e6f4.user.id, {
        document: _0x5df854,
        mimetype: 'application/json',
        fileName: 'durga.data.json',
      });
      await _0x37e6f4.sendMessage(_0x37e6f4.user.id, {
        text: ' *🕊️ UPLOAD THIS FILE ON YOUR FORKED REPOSITORY* *_BY DURGA MD BOT TEAM🤍_* ',
        contextInfo: {
          externalAdReply: {
            title: 'JOIN-DURGA MD',
            body: 'AMEEN SER BOTS',
            previewType: 'preview',
            thumbnailUrl: '',
            thumbnail: _0xa853d4,
            sourceUrl: 'https://chat.whatsapp.com/GVxT4w51GIU3sndNPZGTnw',
          },
        },
      });
      console.log(_0x37e6f4);
      process.exit(0x0);
    }
    if (_0x361c11 === 'close' && _0x27bace && _0x27bace.error && _0x27bace.error.output.statusCode != 0x191) {
      XeonBotInc();
    }
  });

  _0x37e6f4.ev.on('creds.update', saveState);
  _0x37e6f4.ev.on('messages.upsert', () => {});
}

XeonBotInc();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
