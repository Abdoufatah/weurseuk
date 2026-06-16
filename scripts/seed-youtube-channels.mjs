import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

// Top 30 chaînes YouTube sénégalaises (source: Social Blade, juin 2026)
// Pour obtenir les channel IDs, on utilise le format YouTube RSS: 
// https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
const channels = [
  { name: "Marodi TV Sénégal", channelId: "UCNn9V3xkNYOKz-LBxMEkMkg", subscribers: "8.82M", category: "Séries/Divertissement" },
  { name: "EvenProd", channelId: "UC7Bv4Uo0MIUb-jMOFgXzQNQ", subscribers: "6.91M", category: "Séries/Divertissement" },
  { name: "Pikini Production", channelId: "UCfzZCy6p-YjjjWRSLiGBJTg", subscribers: "4.99M", category: "Séries/Divertissement" },
  { name: "TFM (Télé Futurs Medias)", channelId: "UCEXnL5MhO7mhPIcfl8JxuLQ", subscribers: "3.12M", category: "Média/TV" },
  { name: "2stvsenegal", channelId: "UCaKvMjYqm3JBmGMbKRVQhwg", subscribers: "2.83M", category: "Média/TV" },
  { name: "Senegal7", channelId: "UC_7VU1j2JYvmHMOxPFzBtjA", subscribers: "2.52M", category: "Média/Info" },
  { name: "Yesdakar", channelId: "UCQwMkhWxrxBPMz1v-0AEEHA", subscribers: "2.51M", category: "Divertissement" },
  { name: "DAKARBUZZ TV", channelId: "UC4u1ouaFIpQnYOkYKgq4tUQ", subscribers: "2.28M", category: "Divertissement/Info" },
  { name: "SSP SENEGAL OFFICIEL", channelId: "UCKOvQnL-B_QGGVHkz2RRDKQ", subscribers: "1.94M", category: "Divertissement" },
  { name: "Seneweb TV", channelId: "UCFvNGIDQxBiF8bT3MuI0F0g", subscribers: "1.72M", category: "Média/Info" },
  { name: "BUZZ Bi", channelId: "UCVMFBOuHJTT7Bv8bPALhBuw", subscribers: "1.68M", category: "Divertissement" },
  { name: "Walfadjri TV", channelId: "UCVoUBfNNqj-2Kl-kSNRlFXA", subscribers: "1.6M", category: "Média/TV" },
  { name: "Lutte TV", channelId: "UCT4mwJO5Agz-2OwMIVTeHPA", subscribers: "1.55M", category: "Sport/Lutte" },
  { name: "LEUZTV", channelId: "UCZnFXqJjCsi1s1_UhL4QMcA", subscribers: "1.51M", category: "Divertissement" },
  { name: "Xalaat TV", channelId: "UCXXRDqEfLCFnlNbSFOIxDhA", subscribers: "1.48M", category: "Débat/Politique" },
  { name: "Sans limites TV", channelId: "UCVFQxnNhbbMOE8z-qlEgW8g", subscribers: "1.44M", category: "Média/Info" },
  { name: "RTS - RADIO TÉLÉVISION SÉNÉGALAISE", channelId: "UCG7Atl5IU5XbqkPWhi3fN2A", subscribers: "1.41M", category: "Média/TV" },
  { name: "Feeling Dakar TV", channelId: "UCmYOL3MZl44E-eQjqJOLKhA", subscribers: "1.4M", category: "Divertissement" },
  { name: "Sen Tv Officiel [DMEDIA]", channelId: "UCuxLMEi1jU6_gMHBSDF_YYQ", subscribers: "1.28M", category: "Média/TV" },
  { name: "DAKARACTU TV HD", channelId: "UCz0YSKvE_bosMUfMlPEJNhg", subscribers: "1.25M", category: "Média/Info" },
  { name: "Sunugal 24", channelId: "UCqYLmdDGn3FNY8GXOQ5zuEg", subscribers: "1.17M", category: "Média/Info" },
  { name: "Senegal5", channelId: "UCYKo_GGOKZ1YiMBH-P5BVWQ", subscribers: "1.09M", category: "Média/Info" },
  { name: "Allô Senegal", channelId: "UCR_WKFGF0lYOSwVG-JcV7Ig", subscribers: "1.08M", category: "Divertissement" },
  { name: "Maniok", channelId: "UCQq4YJ-0T2JVhEqMvpCOuVQ", subscribers: "1.07M", category: "Séries/Divertissement" },
  { name: "Itv Sénégal", channelId: "UCjst9u-MXjXDJzGCvy1s1Dg", subscribers: "959K", category: "Média/TV" },
  { name: "Dakar Shorts", channelId: "UC8P7CZTKVw_RhFdTgkvqmQw", subscribers: "947K", category: "Divertissement" },
  { name: "Tele Senegal", channelId: "UCqN-QPQ7fEGkNfBMmnrZNFg", subscribers: "924K", category: "Média/Info" },
  { name: "Infos Rewmi", channelId: "UCdF5LZWjkHJKl2w-JVqaHGg", subscribers: "911K", category: "Média/Info" },
  { name: "Wally B. Seck", channelId: "UCJmxmJ6SWBqMnHEFEBR-JRg", subscribers: "2.62M", category: "Musique" },
  { name: "Youssou Ndour", channelId: "UC7FIGIVqIfU3bVPWBFQTyKQ", subscribers: "1.37M", category: "Musique" },
];

async function main() {
  const connection = await mysql.createConnection(DATABASE_URL);
  
  let inserted = 0;
  let skipped = 0;
  
  for (const ch of channels) {
    try {
      await connection.execute(
        'INSERT INTO youtube_channels (channelId, name, subscribers, category) VALUES (?, ?, ?, ?)',
        [ch.channelId, ch.name, ch.subscribers, ch.category]
      );
      inserted++;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        skipped++;
      } else {
        console.error(`Erreur pour ${ch.name}:`, e.message);
      }
    }
  }
  
  console.log(`✅ ${inserted} chaînes insérées, ${skipped} déjà existantes`);
  await connection.end();
}

main().catch(e => { console.error(e); process.exit(1); });
