
const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);

app.get("/", (request, response) => {
  console.log(`Ping Received.`);
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("DISCORD BOT YO");
});

const listener = server.listen(3000, function() {
  console.log(`Your app is listening on port ` + listener.address().port);
});


const {Client, GatewayIntentBits, Collection} = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { TOKEN, CHANNEL_ID, SERVER_CHANNEL_ID } = require("./config.json");
const YouTubeNotifier = require('youtube-notification');
        const fs = require('node:fs')



const notifier = new YouTubeNotifier({
  hubCallback: 'https://milk-bot.conconred.repl.co/yt',
  secret: 'JOIN_MY_SERVER_OR_DIE'
});


notifier.on('notified', data => {
  console.log('New Video');
  try {
  client.channels.cache.get(SERVER_CHANNEL_ID).send(
    `<@998717797733511238> **${data.channel.name}** just uploaded a new video - **${data.video.link}**`
  );
  } catch (err) {
    console.log(err)
  }
});
 
notifier.subscribe(CHANNEL_ID);

app.use("/yt", notifier.listener());

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for(const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args, client))
    }
}

client.slashCommands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

let ascii = require("ascii-table")
let slashTable = new ascii("Slash Commands")
slashTable.setHeading("Command", "Active");
fs.readdirSync("./commands/").forEach(dir => {
    let commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"))
for(let file of commands) {
    let pull = require(`./commands/${dir}/${file}`);
    if(pull.data) {
        slashTable.addRow(file, "???");
        client.slashCommands.set(pull.data.name, pull)
    }
    else {
        slashTable.addRow(file, "???");
        continue;
    }
}
})
console.log(slashTable.toString())







client.login(process.env.TOKEN)