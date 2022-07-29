module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const fs = require('node:fs')
        const { REST } = require('@discordjs/rest')
        const { Routes, ActivityType } = require('discord-api-types/v10')
        const { clientId, guildId} = require('../config.json')

        console.log(`Ready! logged in as ${client.user.tag}`)

        client.user.setPresence({ activities: [{ name: 'MILK Valorant Shorts', type: ActivityType.Watching}],  status: 'online'})



const commands = []
const publicCommands = []

fs.readdirSync("./commands/").forEach(dir => {
    let commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"))
    for (const file of commandFiles) {
        const command = require(`../commands/${dir}/${file}`)
        commands.push(command.data.toJSON())
    }
    for(const file of commandFiles) {
        const command = require(`../commands/${dir}/${file}`)
    
        if(command.active === "active") {
            publicCommands.push(command.data.toJSON())
        }
    }
})

//console.log(publicCommands)
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)
rest.put(Routes.applicationCommands(clientId), { body: publicCommands })
    .then(() => console.log('successfully registered public commands.'))
    .catch(console.error)
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('successfully registered dexter bot server commands.'))
    .catch(console.error)
    }
}