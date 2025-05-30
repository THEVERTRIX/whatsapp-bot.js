const { Client, LocalAuth} = require('whatsapp-web.js');
const QRCode = require('qrcode');
require('dotenv').config();

const wwebVersion = '2.2412.54';

/**
 * @type {Client}
 */
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    },
    webVersionCache: {
        type: 'remote',
        remotePath: "https://cdn.jsdelivr.net/gh/pedroslopez/whatsapp-web.js@v" + wwebVersion + "/dist/whatsapp-web.js"
    }
});

client.on('qr', (qr) => {
    QRCode.toString(qr, { type: 'terminal', small: true }, function (err, url) {
        console.log(url);
    });
});

// create a colletion
client.commands = new Array();

module.exports = client;
require('./handler/index')(client);

client.initialize();
