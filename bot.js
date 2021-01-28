'use strict';
/* === basic stuff === */
const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const fetch = require("node-fetch");
const prefix = '.';
require("dotenv").config();
client.login(process.env.GIF_BOT_TOKEN);

/* === Code === */



client.on('message', giveGif);

async function giveGif(message) {
 
    let space = message.content.split(" ");
        if(space[0] === prefix + "gif") {
            let keywords = "jaguar gifs";
            if(space.length > 1){
                keywords = space.slice(1, space.length).join(" ");
            }
            let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_API_KEY}&contentfilter=high`;
            let response = await fetch(url);
            let json = await response.json();
            const index = Math.floor(Math.random() * json.results.length);
            let result = json.results[index].media[0].gif.url
                
                const embed = new Discord.MessageEmbed()
                .setTitle(`Gif bot`)
                .setDescription(`<@${message.member.id}> asked for ${keywords} gif`)
                .setImage(result)
                .setColor('RANDOM')
                .setFooter('this bot is provided by by jaguar')
                .setTimestamp();           
                message.guild.channels.cache.find(i => i.name === 'gifs').send(embed);
               
    }
}