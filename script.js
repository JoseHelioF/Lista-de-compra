let base = [];

console.log(typeof (base));
textoEntrada = document.getElementsByTagName("input");
var elemento_pai = document.getElementsByTagName("section")[0];
let position = Object.keys(base).length;

//Gerar um novo item na lista
function gera() {
  if (textoEntrada[0].value) {

    // console.log(textoEntrada[0].value);
    const id = new Date().getTime().toString()
    console.log("ID", id);
    base[position + 1] = [id, textoEntrada[0].value];
    // console.log(position);
    position++;
    // console.log(base);
    criaArticle(id);
  } else {
    alert("Digite um valor");
  }
  // console.log("Aqui cheguei");
  textoEntrada[0].value = "";

}

function geraElemento(nometag) {
  var filho = document.createElement(nometag);
  return filho;

}

function geraAtributo(elemento, tipo, valor) {
  var atributo = elemento.setAttribute(tipo, valor)
  return atributo;
}

function geraFilho(pai, tag) {
  var tagnova = pai.appendChild(tag);
  return tagnova;
}



//Cria um novo elemento para exibir o novo item
function criaArticle(id) {

  var tagArticle = geraElemento("article");
  geraAtributo(tagArticle, "class", "articles")
  geraAtributo(tagArticle, "dados", id)
  var tagArticleF = geraFilho(elemento_pai, tagArticle);


  var tagP = geraElemento("p");
  // let position = Object.keys(base).length;
  texto = base[position][1];
  const textNode = document.createTextNode(texto);
  var tagPF = geraFilho(tagP, textNode);
  geraFilho(tagArticleF, tagP);

  var tagD = geraElemento("div");
  geraAtributo(tagD, "class", "buttons")
  var tagBD = geraFilho(tagArticleF, tagD);

  var tagB = geraElemento("button");
  geraAtributo(tagB, "class", "btnEdit")
  var tagBF = geraFilho(tagBD, tagB);
  document.getElementsByClassName('btnEdit')[position + 1].innerHTML = 'Editar'

  var tagB = geraElemento("button");
  geraAtributo(tagB, "class", "btnDelete")
  geraAtributo(tagB, "onclick", "excluir(this)")
  var tagBF = geraFilho(tagBD, tagB);
  document.getElementsByClassName('btnDelete')[position + 1].innerHTML = 'Excluir'
}

function excluir(valor) {
  let elemento = valor.parentNode.parentNode
  var id = elemento.getAttribute('dados');
  console.log('teste', id)

  console.log("Base", base);

  var newList =[];

  for (let i in base) {
    if(base[i][0]!=id){
      newList.push(base[i]);
     }

    console.log("lista", base[i][0]);
  }


  elemento.parentNode.removeChild(elemento);
  position--;
  console.log(newList);
  base = "";
  base = newList;
}



// let lista = [];

// lista = [[1,2],[3,4],[5,6],[7,8],[9,10]]
// console.log(lista);
// let item = 6;
// var newt = [];
// for (let  i of lista){
//   if(i[1]!=6){
//     newt.push(i);
//    }

//   console.log("lista",i[1]);
// }
// newt[5] = [11,12];
// console.log(newt);
// // for (let i = 0; i< lista.length;i++){
// //   console.log(lista[i][1]);
// // }