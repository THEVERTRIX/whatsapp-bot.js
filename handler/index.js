const fs = require('fs');
const { Client } = require('whatsapp-web.js');
const path = require('path');

/**
 * @param {Client} client
**/

module.exports = async (client) => {
    // Commands
    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));    
    
    commandFiles.map((value) => {
        const file = require(path.join(__dirname, '../commands', value));
        const splitted = value.split(path.sep);
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.push(file.name, properties);
        }
    });

    // Events
    const eventFiles = fs.readdirSync(path.join(__dirname, '../events')).filter(file => file.endsWith('.js'));
    eventFiles.map((value) => require(path.join(__dirname, '../events', value)));
}