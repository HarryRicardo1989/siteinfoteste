document.querySelector(".titulo-principal").textContent = "Status DATASAT";
const divPrincipal = document.querySelector("#InicioBlocos");
var ulEt01, pass;
var movimenta = false
function createUlList(lista, classeUL) {
    let ul = document.createElement("ol");
    ul.classList.add(classeUL)
    lista.forEach(function (item) {
        li = document.createElement("li");
        li.innerHTML = item;
        ul.appendChild(li);
    });
    return ul

}

function divCreate(tagFilha, classeDiv) {
    let div = document.createElement("div");
    div.classList.add(classeDiv);
    div.appendChild(tagFilha);
    return div
}

function h1Create(h1Text, className) {
    let tag_Name = document.createElement("h1");
    tag_Name.classList.add(className);
    tag_Name.innerHTML = h1Text;
    return tag_Name
}

function formataPassagens(lista, idName) {
    let listaFormatada = []
    listaFormatada.push(`<h2><span class="hora">Hora </span><span class="sat">   Satelite</span></h2>`)
    for (x of Object.keys(lista)) {
        listaFormatada.push(`<span class="hora">${x}</span>&#8658;<span class="sat">${lista[x]}</span>`)
    }
    if (movimenta == true) {
        listaFormatada[1] = listaFormatada[1].replace(/class=/g, `id="${idName}" class=`)
    } else {
        listaFormatada[1] = listaFormatada[1].replace(/class=/g, `id="${idName}" class=`)
    }
    return listaFormatada
}

function movimento(status) {
    if (status['Posicao_Atual'] == "AZ010.00 EL-00.00" || status['Posicao_Atual'] == "AZ075.00 EL-00.00" || status['Posicao_Atual'] == "AZ010.00 EL00.00" || status['Posicao_Atual'] == "AZ075.00 EL00.00") {
        return "parada"
    } else {
        return "movimentando"
    }
}

function checkSheduleds(lista) {
    if (Object.keys(lista).length) {
        return lista
    }
    else {
        return { "XX:XX": "NoSatScheduledYet" }
    }
}

function FetchParser(jsonObj) {

    let statusGeral = jsonObj["statusSistema"];
    let passagens = statusGeral["Passagens"];
    let statusSistema = statusGeral["Status"];
    let agendaEt1 = formataPassagens(checkSheduleds(passagens[1]["Passagens ET-CSS-001"]), movimento(statusSistema[1]["Status ET-CSS-001"]));
    let agendaEt2 = formataPassagens(checkSheduleds(passagens[2]["Passagens ET-CSS-002"]), movimento(statusSistema[2]["Status ET-CSS-002"]));
    let statusEt1 = formataStatus(statusSistema[1]["Status ET-CSS-001"]);
    let statusEt2 = formataStatus(statusSistema[2]["Status ET-CSS-002"]);
    divPrincipal.innerHTML = '';
    divPrincipal.appendChild(divCreate(divCreate(divCreate(createUlList(statusEt1, "status"), "ET-CSS-001"), "datasat"), "bloco"))
    divPrincipal.appendChild(divCreate(divCreate(divCreate(createUlList(statusEt2, "status"), "ET-CSS-002"), "datasat"), "bloco"))
    ulEt01 = document.querySelector(".ET-CSS-001");
    ulEt01.insertAdjacentHTML('beforebegin', '<h1>ET-CSS-001</h1>');
    ulEt01.appendChild(createUlList(agendaEt1, "pass"), "pass");
    ulEt01 = document.querySelector(".ET-CSS-002");
    ulEt01.appendChild(createUlList(agendaEt2, "pass"), "pass");
    ulEt01.insertAdjacentHTML('beforebegin', '<h1>ET-CSS-002</h1>');



}

function atualizaStatus() {
    var url = "/statusSistema";
    fetch(url).then(r => {
        var error = false;
        if (r.status == 200) {
            r.json().then(json => FetchParser(json)).catch(() => {
                error = true;
                console.log('Error');
            });
        }
        if (error) {
            r.text().then(t => console.log(t));
        }
    });

};

setInterval(function () {
    atualizaStatus();
}, 300)