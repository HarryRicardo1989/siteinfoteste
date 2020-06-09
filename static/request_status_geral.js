document.querySelector(".titulo-principal").textContent = "Status do Sistema";
myTimer();

function FetchParser(jsonOjb) {
    for (const item of jsonOjb['statusSistema']) {
        for (var i = 0; i < item.length; i + 2) {
            console.log(item[i])
        }
    }
}

function myTimer() {
    var timer = setTimeout(function () {
        atualizaStatus();
        myTimer();

    }, 2000)
};


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


