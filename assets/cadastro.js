let textoEntrada = document.getElementsByTagName("input");

function gravaitem(valor) {
    console.log(valor);
    console.log(textoEntrada[0].value);
    if(!textoEntrada[0].value){
        alert("Digite algo");
    }
}