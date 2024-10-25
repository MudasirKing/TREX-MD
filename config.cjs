// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE1ZUGZ6NkVzazFqUHBYSGRWckVNeGFzZkMzMTYwekQ3Q1NrU0RTT2IxST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOWpuOGNKSjBKc0k0VkJjaFZKR2FtUkpBUzdNY1JjdEw5dERiTStqOWdXMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySk5yd2ZFZkxRUEw3My8wRVBkN0Zva0Rwd2M2bkVOUDhucWErKzhXRGtnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnc3U1bGg3bFM2VE5YeDdSejdEVGZoNFkrWjloZFdRZVkvbFBNUVpsalRJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndOZk1OalhtQUJhZm9pUGJJUUQ4clo3N21NT29hOHRaQ0F4cXhreG0ySFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVTbGNkbWUyZ1p1dzRNdC9jaTJ3Z1NUZUxkVHhtSGN2VGtjalBoMU4xZ1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEl3ai9EdDM4QTc1MXZ4RXFHaXdxZUt3eUxJRE9IdEJqTyswRC82c3duQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0NuUlZDMk9jYVVhREQzc2FkTVNlS29GZXFOUGhib0dzSW0xYzRWeVB6TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhMMTRWdStwZjNJZGRYYTVPRzROc2xpYTdkR20yTGNOMUhibDExMFRpYTJ1RlRHMEFHQWxVKzF0YUVtQlcweUhocjdHT1U5bEhMY21vbGFqRExaNkNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjgsImFkdlNlY3JldEtleSI6IlloNkJjRG10em13QUtYeldxaTBtZE9PZmFzR2JWTG1jc3pSdEd3L0UwOEU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InBrT2tNdVNEUjFLZHcwYWlrUXhhbkEiLCJwaG9uZUlkIjoiMGJkMmM2Y2YtNDU0ZC00ZTIxLWI5NzMtZTliMGUzN2EwNTY4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldZcmFjTjEra3Q4Q3hQZFUrYjVqdWVuUXpUST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMaERkODQ2Mm9xb0g3Yis2K0FYL0c3ejZrYmc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSjhSVlE4WVgiLCJtZSI6eyJpZCI6IjkyMzIzOTk1NjQ3Njo2N0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS2VzMk5vRUVPZS83cmdHR0NFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNnhsZWVselR0cjNFL3BhWWU5RUwvMXVLWjdYOU9VQno2N0lIQ2w0VGxCaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiaEg1RFJPNGNTR21tVUNCdng2dzVsa2xwMFhHandVZ1JwSlk3SElJYXd6dkwyaDY2dk94MWg1bVc5SkVXa1NRRVFJRlpuQXpnTHlIR2cwM2hZMjRlQnc9PSIsImRldmljZVNpZ25hdHVyZSI6ImV3Y0xWdW82c1UwQ010M2t5aDVZNHJsRy9IT21FelVwdWVBOTlGeXJHckF2NFlTRy9HYlczejUvTUpvQnljUnVTNUc2Sjd0ZjJ2TTBBY3M0ZTFnT0JnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMjM5OTU2NDc2OjY3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVzWlhucGMwN2E5eFA2V21IdlJDLzliaW1lMS9UbEFjK3V5QndwZUU1UVoifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjk4NjM2Njl9",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "private",
  OWNER_NAME: process.env.OWNER_NAME || "ᗰᑌᗞᗩᔑᏆR",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "254743982206",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'false' : false, 
};


module.exports = config;
