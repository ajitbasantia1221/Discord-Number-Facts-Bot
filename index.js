
import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import replyFact from './replyFact.js';


//Dotenv will load the environment variable stored.
dotenv.config();

//GUILD -> SERVER will activate the BOT and we can see it will be available.
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on('ready', () => {
    console.log(`${client.user.tag} is ready for use!`) //passing a dynamic string

    const guildId = "752770045666525277"; //our server id;
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if (guild) {
        commands = guild.commands;
    } else {
        commands = client.application?.commands;  //For global commands
    }

    commands.create({
        name: 'fact',
        description: 'Gives a trivia fact for a number',
        options: [
            {
                name: "number",
                description: "Number for the fact",
                required: true,
                type: 10
            },
        ],
    }).then(command => console.log(`Successfully registered ${command.name} command`))
    .catch(console.error);

    commands.create({
        name: 'math_fact',
        description: 'Gives a math fact for a number',
        options: [
            {
                name: "number",
                description: "Number for the math fact",
                required: true,
                type: 10
            },
        ],
    }).then(command => console.log(`Successfully registered ${command.name} command`))
    .catch(console.error);

    commands.create({
        name: 'year_fact',
        description: 'Gives a year facts for a number',
        options: [
            {
                name: "number",
                description: "Number for the year fact",
                required: true,
                type: 10
            },
        ],
    }).then(command => console.log(`Successfully registered ${command.name} command`))
    .catch(console.error);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.replied) return;
    const { commandName, options } = interaction;
    const number = options.getNumber('number');
    if (commandName === 'fact') {
        replyFact(number, 'trivia', interaction);
    } else if (commandName === 'math_fact') {
        replyFact(number, 'math', interaction);
    } else if (commandName === 'year_fact') {
        replyFact(number, 'year', interaction);
    }
});


//LOGIN
client.login(process.env.BOT_TOKEN)
.catch(error => {
    console.error('Error during login', error);
});
