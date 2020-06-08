document.querySelector(".titulo-principal").textContent = "Status do Sistema";

var passagensjson = '"Nome da ADA": "ET-CSS-001", "13:56": "POLYITAN-1", "15:07": "OSCAR 7 AO-7", "17:00": "OSCAR 7 AO-7", "17:51": "NOAA 19", "19:25": "NOAA 15", "20:46": "ISS ZARYA", "21:07": "NOAA 15", "21:29": "NAYIF-1 EO-88", "22:34": "ITASAT 1", "22:52": "NOAA 18"'.split(',');
var statusjson = { "Nome da ADA": "ET-CSS-001", "Temperatura do Processador": "+55.0", "Porcentagem do SSD usado": "42%", "Posicao Atual da Antena": "AZ075.00 EL00.00" };
//console.log(passagensjson)
var teste = montaOL(passagensjson);

function montaOL(passagens) {
    for (var i = 0; i < passagens.length; i++) {
        console.log(passagens[i])
    }

}
