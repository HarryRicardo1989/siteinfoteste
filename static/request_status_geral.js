document.querySelector(".titulo-principal").textContent = "Status do Sistema";

function montaUl(liItens) {
    div = document.createElement("div");
    div.classList.add('bloco')
    ul = document.createElement("ul");
    ul.classList.add('pass')
    div.appendChild(ul);
    liItens.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });
    return div
}



function FetchParser(jsonObj) {
    statusGeral = jsonObj['statusSistema']
    passET01 = statusGeral[0]
    statET01 = statusGeral[1]
    passET02 = statusGeral[2]
    statET02 = statusGeral[4]
    var divPrincipal = document.querySelector("#InicioBlocos");

    bloco = document.querySelector(".bloco")
    bloco.remove();
    divPrincipal.appendChild(montaUl(passET01));
    bloco = document.querySelector(".bloco")
}



function atualizaStatus() {
    var url = "/statusSistema";
    fetch(url).then(r => {
        let error = false;
        if (r.status == 200) {
            r.json().then(json => FetchParser(json)).catch(() => {
                error = true;
                console.log('Error');
            });
        }
        if (error) {
            r.text().then(t => console.log('t'));
        }
    });

};


setInterval(function () {
    atualizaStatus();

}, 2000)
