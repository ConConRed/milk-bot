const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    active: 'active',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Milk Bot Ping command'),
    run:async (interaction, client) => {
        try {
            const mesg = await interaction.reply({ content: "Calculating ping \<a:Loading:847950318599143435>", fetchReply: true });
      
            await interaction.editReply({ content: `Pong!: Bot: \`${mesg.createdTimestamp - interaction.createdTimestamp}ms\`, API: \`${client.ws.ping}ms\`` });
          } catch (err) {
            console.log("Something Went Wrong => slash command ping", err);
          }
          
    }
}