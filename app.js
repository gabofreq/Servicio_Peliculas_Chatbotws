// Gabriel Mantilla Saltos
// Proyecto Chatbot de Peliculas estreno por Whatsapp
// Maestría en Ciencias de la Computación
// Materia - Principios de Lenguajes de Programación

// Inicializo Librerias, y variables constantes
const fs = require('fs');
const chalk = require('chalk');
const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const SESSION_FILE_PATH = './session.json';
let client;
let sessionData;
// Función que guarda la session del chatbot
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
// Función de entrada que devuelve codigo de Barra y Guarda la informacion en json
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
// Función de escuchar y devuelve información de peliculas
const listenMessage = () => {
    client.on('message', (msg) => {
        const {from, to, body} = msg;
        switch(body) {
            case 'Hola':
                sendMessage(from, 'Hola como estas, escriba Catálogo para conocer la información')
                break;    
            case 'holis':
                sendMessage(from, 'Hola como estas, escriba Catálogo para conocer la información')
                break;        
            case 'Buenos dias':
                sendMessage(from, 'Hola como estas, escriba Catálogo para conocer la información')
                break;
            case 'Cómo estás?':
                sendMessage(from, 'Yo estoy bien y tu?, escriba Catálogo para conocer la información')
                break;
            case 'Quién eres?':
                sendMessage(from, 'El servicio de Información de Peliculas, escriba Catálogo para conocer la información')
                break;
            case 'Catálogo':
                sendMessage(from,  '1 : No Way Home\n2 : Shang-Chi\n3 : Sin Tiempo para Morir\n4: Top Gun 2\n5 : The king´s Man\n6 : Minions Nace un Villano\n7 : Venom Carnage Liberado\n8 : Los Eternos\n9 : The Batman\n10 : Hallowen Kills')
                break;
            case '1':
                sendMessage(from,  'Spiderman No Way Home\nFecha de Estreno: 17 de Diciembre de 2021')
                sendMedia(from,'no_way_home.jpg')    
                sendMessage(from, 'https://www.youtube.com/watch?v=rl0EZCJcrGc')
                break;
            case '2':
                sendMessage(from,  'Shang-Chi\nFecha de Estreno: 2 de Septiembre de 2021')
                sendMedia(from,'shang-chi.jpg')    
                sendMessage(from, 'https://www.youtube.com/watch?v=HjzATzdlN2A')
                 break;

            case '3':
                sendMessage(from,  'Sin Tiempo para Morir\nFecha de Estreno: 30 de Septiembre de 2021')
                sendMedia(from,'morir.jpg')    
                sendMessage(from, 'https://www.youtube.com/watch?v=VYvmuz7ILvg')
                break;

            case '4':
                sendMessage(from,  'Top Gun 2\nFecha de Estreno: 27 de Mayo de 2022')
                sendMedia(from,'topgun.jpg')    
                sendMessage(from, 'https://www.youtube.com/watch?v=nJbEpMfr5aY')
                break;
                             
            case '5':
                sendMessage(from,  'The king´s Man\nFecha de Estreno: 22 de Diciembre de 2021')
                sendMedia(from,'kingsman.jpg')    
                sendMessage(from, 'https://www.youtube.com/watch?v=NM5Pf4gONJ4')
                break;

            case '6':
                sendMessage(from,  'Minions Nace un Villano\nFecha de Estreno: 2 de Septiembre de 2021')
                sendMedia(from,'minions.jpg')    
                sendMessage(from, 'https://www.youtube.com/watch?v=tOCczL-LYHo')
                break;

            case '7':
                sendMessage(from,  'Venom Carnage Liberado\nFecha de Estreno: 15 de Octubre de 2021')
                sendMedia(from,'venon.jpg')    
                sendMessage(from, 'https://www.youtube.com/watch?v=F4Ygcigj0Gk')
                break;
    
            case '8':
                sendMessage(from,  'Los Eternos\nFecha de Estreno: 5 de Noviembre de 2021')
                sendMedia(from,'eternos.jpg')    
                sendMessage(from, 'https://www.youtube.com/watch?v=v1EkoQV4g5c')
                break;

            case '9':
                sendMessage(from,  'The Batman\nFecha de Estreno: 2 de Septiembre de 2021')
                sendMedia(from,'batman.jpg')    
                sendMessage(from, 'https://www.youtube.com/watch?v=FzdaIYojS3Q')
                break;
    
            case '10':
                sendMessage(from,  'Hallowen Kills\nFecha de Estreno: 15 de Octubre de 2021')
                sendMedia(from,'hallowen.jpg')    
                sendMessage(from, 'https://www.youtube.com/watch?v=I-iJbMA3aoA')
                break;
                   
                case 'Adiós':
                sendMessage(from, 'Nos vemos, adiós')
                    break;
            case 'Nos vemos':
                sendMessage(from, 'Nos vemos, adiós')
                    break;
        }
        console.log(from, to, body);
     })
}
// Función devuelve un archivo multimedia
const sendMedia = (to, file) => {
    const mediaFile = MessageMedia.fromFilePath(`./mediaSend/${file}`)
    client.sendMessage(to, mediaFile)
}
// Función devuelve un Mensaje
const sendMessage = (to, message) => {
    client.sendMessage(to, message)
}
// Función valida Sessión
(fs.existsSync(SESSION_FILE_PATH)) ? wihSession() : withOutSession();