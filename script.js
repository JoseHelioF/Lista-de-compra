//Array para guardar as informações da lista
let base = [];

// Variáveis principais
let textoEntrada = document.getElementsByTagName("input");
var elemento_pai = document.getElementsByTagName("section")[0];
let position = Object.keys(base).length;
var db = openDatabase("myDB", "1.0", "TIPS Database Example", 2 * 1024 * 1024);
// db.transaction(function (tx) {
//   tx.executeSql("DROP TABLE  myTable ");
// });

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
    id = Date.now().toString();
    // id = 12;
    console.log("id", id);
    db.transaction(function (tx) {
      tx.executeSql("INSERT INTO  myTable (id,nome) VALUES (?,?)", [id, nome]);
    });
    criaArticle(id);
  } else {
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

  // var tagB = geraElemento("input");
  // geraAtributo(tagB, "class", "check");
  // geraAtributo(tagB, "type", "checkbox");
  // var tagBF = geraFilho(tagBD, tagB);

  var tagB = geraElemento("button");
  geraAtributo(tagB, "class", "btnEdit");
  geraAtributo(tagB, "onclick", "editar(this)");
  var tagBF = geraFilho(tagBD, tagB);
  tagBF.innerHTML = "Editar";

  // console.log(tagBF);

  var tagB = geraElemento("button");
  geraAtributo(tagB, "class", "btnDelete");
  geraAtributo(tagB, "onclick", "excluir(this)");
  var tagBF = geraFilho(tagBD, tagB);
  tagBF.innerHTML = "Excluir";

  ///******************* */

}

function excluir(valor) {
  let elemento = valor.parentNode.parentNode
  var id = elemento.getAttribute('dados');
  console.log(elemento, "ID", id);

  db.transaction(function (tx) {
    tx.executeSql("DELETE from myTable WHERE id=(?) ;", [id]);
  });

  elemento.parentNode.removeChild(elemento);
  console.log("Excluir");
}

function editar(valor) {
  let elemento = valor.parentNode.parentNode;
  var id = elemento.getAttribute('dados').toString();
  var texto = elemento.getElementsByTagName('p')[0].innerHTML;
  textoEntrada[0].value = texto;
  var teste = valor;
  console.log("Elemento", texto, "ID", id);

  botao = document.getElementsByClassName('submit')[0].getElementsByTagName('button')[0]
  botao.innerHTML = 'Alterar'
  geraAtributo(botao, "onclick", "altera(" + teste + ",this," + id + ")")
  console.log("Editar");
}

function altera(origem, valor, id) {
  texto = textoEntrada[0].value
  db.transaction(function (tx) {
    tx.executeSql("UPDATE myTable SET nome = (?) WHERE id=(?) ;", [texto, id]);
  });

  botao = document.getElementsByClassName('submit')[0].getElementsByTagName('button')[0]
  botao.innerHTML = 'Gerar'
  geraAtributo(botao, "onclick", "gera()")
  textoEntrada[0].value = ""
  console.log('valor',valor);
  console.log('origem',origem);
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