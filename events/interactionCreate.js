module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if(!interaction.isChatInputCommand()) return

        const command = client.slashCommands.get(interaction.commandName)
    
        if(!command) return
    
        try {

            await command.run(interaction, client)
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        }
    }
}