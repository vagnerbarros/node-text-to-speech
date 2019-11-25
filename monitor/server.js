const axios = require('axios');
const TotalVoice = require('totalvoice-node');
const util = require('./util');
const client = new TotalVoice(util.TOTALVOICE_API_KEY);

const servers = [
    {
        name: 'Servidor 1',
        url: 'http://localhost:4001',
        developer: {
            name: 'Vagner Barros',
            telefone: util.VAGNER_BARROS
        }
    },
    {
        name: 'Servidor 2',
        url: 'http://localhost:4002',
        developer: {
            name: 'Eduardo Tavares',
            telefone: util.EDUARDO_TAVARES
        }
    }
];


(async () => {
    console.log('Iniciando Monitoramento dos servidores');

    for(const server of servers){
        await axios({
            url: server.url,
            method: 'GET'
        }).then(response => {
            console.log(`${server.name} está no ar`);
        }).catch(erro => {
            console.log(`${server.name} está fora do ar`);
            const message = `${server.developer.name} o servidor ${server.name} está fora do ar, por favor faça alguma coisa o mais rápido possível`;
            const options = {
                velocidade: 2,
                tipo_voz: 'br-Vitoria'
            };
            client.tts.enviar(server.developer.telefone, message, options)
            .then(() => {
                console.log(`O desenvolvedor ${server.developer.name} foi avisado`);
            });
        })
    }

    console.log('Finalizando Monitoramento dos servidores');
})();
