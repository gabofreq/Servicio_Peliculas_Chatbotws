const fs = require('fs');
const chalk = require('chalk');
const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const SESSION_FILE_PATH = './session.json';
let client;
let sessionData;

const wihSession = () => {
    sessionData = require(SESSION_FILE_PATH);
    
    client = new Client({
        session:sessionData
    })
    client.on('ready',() => {
        console.log('Cliente is ready');
        listenMessage();
    })
    client.on('auth_failure',() => {
        console.log('Error de authentificacion');
    })
    client.initialize();
}

const withOutSession = () => {
    console.log('No tenemos una session guardada');
    const client = new Client();
    client.on('qr', (qr) => {
        console.log('QR RECIVED', qr);
        qrcode.generate(qr, {small:true});
    });
    
    client.on('authenticated', (session) => {
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            console.log('Cliente is ready');
            if (err) {
                console.log(err);
            }
        });
    });
    
    
    client.initialize();
}

(fs.existsSync(SESSION_FILE_PATH)) ? wihSession() : withOutSession();


// Funcion de escuchar
const listenMessage = () => {
    client.on('message', (msg) => {
        const {from, to, body} = msg;
        switch(body) {
            case 'Quiero info':
                sendMessage(from, 'De que quieres informacion')
                break;
            case 'Adiós':
                sendMessage(from, 'Nos vemos')
                break;
            case 'Nos vemos':
                sendMessage(from, 'Nos vemos')
                break;
            case 'Quién eres?':
                sendMessage(from, 'El bot de Gabriel Mantilla')
                break;
            case 'Hola':
                sendMessage(from, 'Hola como estas')
                break;    
            case 'holis':
                sendMessage(from, 'Hola como estas')
                break;        
            case 'Buenos dias':
                sendMessage(from, 'Buenos dias')
                break;
            case 'Cómo estás?':
                sendMessage(from, 'Yo estoy bien y tu?')
                break;
            case '.':
                sendMessage(from, 'Escribe algo, gracias')
                break;
            case 'pepe':
                sendMedia(from,'pepe.jpg')    
                break;
            case 'No Way Home':
                sendMessage(from, 'https://www.youtube.com/watch?v=6QkTCmhOzuA')
                sendMedia(from,'no_way_home.jpg')    
                    break;
            case 'No way Home':
                sendMessage(from, 'https://www.youtube.com/watch?v=6QkTCmhOzuA')
                sendMedia(from,'no_way_home.jpg')    
                    break;
            case 'No way home':
                sendMessage(from, 'https://www.youtube.com/watch?v=6QkTCmhOzuA')
                sendMedia(from,'no_way_home.jpg')    
                    break;
            case 'no way home':
                sendMessage(from, 'https://www.youtube.com/watch?v=6QkTCmhOzuA')
                sendMedia(from,'no_way_home.jpg')    
                    break;
            case 'spiderman':
                sendMessage(from, 'https://www.youtube.com/watch?v=6QkTCmhOzuA')
                sendMedia(from,'no_way_home.jpg')    
            case 'Spiderman':
                sendMessage(from, 'https://www.youtube.com/watch?v=6QkTCmhOzuA')
                sendMedia(from,'no_way_home.jpg')    
                 break;
            case 'Shang-Chi':
                sendMessage(from, 'https://www.youtube.com/watch?v=BD77EOU8N3o')
                sendMedia(from,'shang_chi.jpg')    
                    break;
            case 'Shang-chi':
                sendMessage(from, 'https://www.youtube.com/watch?v=BD77EOU8N3o')
                sendMedia(from,'shang_chi.jpg')    
                    break;
             case 'shang-chi':
                sendMessage(from, 'https://www.youtube.com/watch?v=BD77EOU8N3o')
                sendMedia(from,'shang_chi.jpg')    
                break;
        }
        console.log(from, to, body);
     })
}


const sendMedia = (to, file) => {
    const mediaFile = MessageMedia.fromFilePath(`./mediaSend/${file}`)
    client.sendMessage(to, mediaFile)
}

const sendMessage = (to, message) => {
    client.sendMessage(to, message)
}
