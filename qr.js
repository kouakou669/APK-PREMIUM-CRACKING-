const PastebinAPI = require('pastebin-js'),
    pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
    default: Hacking_Md,
    useMultiFileAuthState,
    jidNormalizedUser,
    Browsers,
    delay,
    makeInMemoryStore,
} = require("maher-zubair-baileys");

function removeFile(filePath) {
    if (!fs.existsSync(filePath)) return false;
    fs.rmSync(filePath, {
        recursive: true,
        force: true
    });
};

const { readFile } = require("node:fs/promises");

router.get('/', async (req, res) => {
    const id = makeid();

    async function HACKING_MD_QR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);

        try {
            let Qr_Code_By_Hacking_Md = Hacking_Md({
                auth: state,
                printQRInTerminal: false,
                logger: pino({ level: "silent" }),
                browser: Browsers.macOS("Desktop"),
            });

            Qr_Code_By_Hacking_Md.ev.on('creds.update', saveCreds);
            Qr_Code_By_Hacking_Md.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect, qr } = s;

                if (qr) await res.end(await QRCode.toBuffer(qr));

                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Qr_Code_By_Hacking_Md.sendMessage(Qr_Code_By_Hacking_Md.user.id, { text: 'HACKING-MD;;;=>' + b64data });

                    let HACKING_MD_TEXT = `
*✅sᴇssɪᴏɴ ᴄᴏɴɴᴇᴄᴛᴇᴅ✅*
Use the session Id Above to
deploy your Bot.
╔════◇
║『 *YOU'VE CHOSEN HACKING-MD* 』
║ You've Completed the First Step
║ to Deploy a Whatsapp Bot.
╚════════════════╝
╔═════◇
║ 『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❒ 𝐎𝐰𝐧𝐞𝐫: https://wa.me/2250705607226
║❒ 𝐑𝐞𝐩𝐨: https://github.com/HACKING995/HACKING--MD9
║❒ 𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦: https://t.me/freeeherokucc
║❒ 𝐘𝐨𝐮𝐭𝐮𝐛𝐞: https://youtube.com/@device.bot.thomas?si=1XTGwLjhIuk5XeNN
║❒ 𝐖𝐚𝐆𝐫𝐨𝐮𝐩: https://chat.whatsapp.com/CmrAOrFSBMi4eXW8xL5UHZ
║❒ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: https://whatsapp.com/channel/0029VaYrk3lIiRozw8zeoh00
║ 💜💜💜
╚════════════════╝
Don't Forget To Give Star⭐ To My Repo`;

                    await Qr_Code_By_Hacking_Md.sendMessage(Qr_Code_By_Hacking_Md.user.id, { text: HACKING_MD_TEXT }, { quoted: session });

                    await delay(100);
                    await Qr_Code_By_Hacking_Md.ws.close();
                    return await removeFile("./temp/" + id);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    await HACKING_MD_QR_CODE();
                }
            });
        } catch (err) {
            if (!res.headersSent) {
                await res.json({
                    code: "Service is Currently Unavailable"
                });
            }
            console.error("Service Error:", err);
            await removeFile("./temp/" + id);
        }
    }

    return await HACKING_MD_QR_CODE();
});

module.exports = router;
