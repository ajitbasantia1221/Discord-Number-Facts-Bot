import fetch from 'node-fetch';

export default async function replyFact(number, type, interaction) {
  const res = await fetch(
    `https://numbersapi.p.rapidapi.com/${number}/${type}?json=true&fragment=true`,
    {
      headers: {
        'x-rapidapi-host': 'numbersapi.p.rapidapi.com',
        'x-rapidapi-key': process.env.API_KEY,
      },
    }
  );
  const { text } = await res.json();
  interaction.reply(`${number}: **${text}**`);
}