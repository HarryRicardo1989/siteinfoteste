document.querySelector(".titulo-principal").textContent = "Status do Sistema";

function FetchParser(jsonOjb) {
    /* for (const item of jsonOjb['statusSistema']) {
        //console.log(item[i])
    } */
    console.log(jsonOjb)
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
            r.text().then(t => console.log(t));
        }
    });

};


setInterval(function () {
    atualizaStatus();

}, 2000)
