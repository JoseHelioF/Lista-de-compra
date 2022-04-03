//Array para guardar as informações da lista
let base = [];

// Variáveis principais
let textoEntrada = document.getElementsByTagName("input");
var elemento_pai = document.getElementsByTagName("section")[0];
let position = Object.keys(base).length;
var db = openDatabase("myDB", "1.0", "TIPS Database Example", 2 * 1024 * 1024);

db.transaction(function (tx) {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS myTable (id INTERGER PRIMARY KEY , nome TEXT)"
  );
});

console.log(db);

//Gerar os valores para inserir no array
function gera() {
  if (textoEntrada[0].value) {
    nome = textoEntrada[0].value;
    id = new Date().getDate().toString();
    console.log("id", id);
    db.transaction(function (tx) {
      tx.executeSql("INSERT INTO  myTable (id,nome) VALUES (?,?)", [id, nome]);
    });
    criaArticle(id);
  } 
  else {
    alert("Digite algo");
  }

  textoEntrada[0].value = "";
}

//Cria o elemento sem fazer vínculo
function geraElemento(nometag) {
  var filho = document.createElement(nometag);
  return filho;
}

//Gera atributos para o elemento
function geraAtributo(elemento, tipo, valor) {
  var atributo = elemento.setAttribute(tipo, valor);
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
  geraAtributo(tagArticle, "class", "articles");
  geraAtributo(tagArticle, "dados", id);
  var tagArticleF = geraFilho(elemento_pai, tagArticle);

  var tagP = geraElemento("p");
  texto = textoEntrada[0].value;
  const textNode = document.createTextNode(texto);
  var tagPF = geraFilho(tagP, textNode);
  geraFilho(tagArticleF, tagP);

  var tagD = geraElemento("div");
  geraAtributo(tagD, "class", "buttons");
  var tagBD = geraFilho(tagArticleF, tagD);

  var tagB = geraElemento("button");
  geraAtributo(tagB, "class", "btnEdit");
  geraAtributo(tagB, "onclick", "editar(this)");
  var tagBF = geraFilho(tagBD, tagB);
  tagBF.innerHTML = "Editar";

  console.log(tagBF);

  var tagB = geraElemento("button");
  geraAtributo(tagB, "class", "btnDelete");
  geraAtributo(tagB, "onclick", "excluir(this)");
  var tagBF = geraFilho(tagBD, tagB);
  tagBF.innerHTML = "Excluir";
}

function excluir(valor) {
  // let elemento = valor.parentNode.parentNode
  // var id = elemento.getAttribute('dados');
  // var newList = [];

  // for (let i in base) {
  //   if (base[i][0] != id) {
  //     newList.push(base[i]);
  //   }
  // }
  // elemento.parentNode.removeChild(elemento);
  // position--;
  // base = "";
  // base = newList;

  console.log("excluir");
}

function editar(valor) {
  // let elemento = valor.parentNode.parentNode;
  // var id = elemento.getAttribute('dados').toString();
  // var textoEntrada = '';

  // for (let i=1;i<=position;i++){
  //   console.log("i",i,"pos",position,"Id",id,"Base",base[i][0]);
  //   if(base[i][0]==id){
  //     textoEntrada[0] = base[i][1];
  //     document.getElementsByTagName("input")[0].value = base[i][1]
  //     break;
  //   }
  // }
  // botao = document.getElementsByClassName('submit')[0].getElementsByTagName('button')[0]
  // botao.innerHTML = 'Alterar'

  // geraAtributo(botao, "onclick", "altera(this)")
  // geraAtributo(botao, "dado", id)

  console.log("Editar");
}

function altera(valor) {
  console.log("Alterar");
  // var t = valor.parentNode.getElementsByTagName('input')[0].value;
  // var x = valor.parentNode.getElementsByTagName('button')[0].getAttribute('dado');
  // console.log(t,x);
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
