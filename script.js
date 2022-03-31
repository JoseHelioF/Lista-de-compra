//Array para guardar as informações da lista
let base = [];

// Variáveis principais
let textoEntrada = document.getElementsByTagName("input");
var elemento_pai = document.getElementsByTagName("section")[0];
let position = Object.keys(base).length;

//Gerar os valores para inserir no array
function gera() {
  if (textoEntrada[0].value) {
    const id = new Date().getTime().toString()
    base[position + 1] = [id, textoEntrada[0].value];
    position++;
    criaArticle(id);
  } else {
    alert("Digite um valor");
  }
  textoEntrada[0].value = "";
  console.log(base);
}

//Cria o elemento sem fazer vínculo
function geraElemento(nometag) {
  var filho = document.createElement(nometag);
  return filho;
}

//Gera atributos para o elemento
function geraAtributo(elemento, tipo, valor) {
  var atributo = elemento.setAttribute(tipo, valor)
  return atributo;
}

//Gera elementos filhos
function geraFilho(pai, tag) {
  var tagnova = pai.appendChild(tag);
  return tagnova;
}

//Cria o elemento completo com classes e atributos e vincula elementos filhos
function criaArticle(id) {

  var tagArticle = geraElemento("article");
  geraAtributo(tagArticle, "class", "articles")
  geraAtributo(tagArticle, "dados", id)
  var tagArticleF = geraFilho(elemento_pai, tagArticle);

  var tagP = geraElemento("p");
  texto = base[position][1];
  const textNode = document.createTextNode(texto);
  var tagPF = geraFilho(tagP, textNode);
  geraFilho(tagArticleF, tagP);

  var tagD = geraElemento("div");
  geraAtributo(tagD, "class", "buttons")
  var tagBD = geraFilho(tagArticleF, tagD);

  var tagB = geraElemento("button");
  geraAtributo(tagB, "class", "btnEdit")
  geraAtributo(tagB, "onclick", "editar(this)")
  var tagBF = geraFilho(tagBD, tagB);
  document.getElementsByClassName('btnEdit')[position-1].innerHTML = 'Editar'

  var tagB = geraElemento("button");
  geraAtributo(tagB, "class", "btnDelete")
  geraAtributo(tagB, "onclick", "excluir(this)")
  var tagBF = geraFilho(tagBD, tagB);
  document.getElementsByClassName('btnDelete')[position-1].innerHTML = 'Excluir'
}

function excluir(valor) {
  let elemento = valor.parentNode.parentNode
  var id = elemento.getAttribute('dados');
  var newList = [];

  for (let i in base) {
    if (base[i][0] != id) {
      newList.push(base[i]);
    }
  }
  elemento.parentNode.removeChild(elemento);
  position--;
  base = "";
  base = newList;

  console.log(base);
}

function editar(valor){
  let elemento = valor.parentNode.parentNode;
  var id = elemento.getAttribute('dados');
  var textoEntrada = '';

  for (let i=1;i<position;i++){
    if(base[0][i]==id){
      textoEntrada = base[1][i];
      break;
    }
  }

  console.log("id",id,"Texto",textoEntrada);
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