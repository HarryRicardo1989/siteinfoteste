document.querySelector(".titulo-principal").textContent = "Status do Sistema";
myTimer();


function geraListas(listastatus) {
    //var teste = JSON.stringify(listastatus[0]);
    for (const item of listastatus) {
        for (var i = 0; i < item.length; i + 2) {
            console.log(item[i])
        }

    }

    //console.log(listastatus);
}


