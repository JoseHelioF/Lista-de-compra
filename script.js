// Variáveis principais
let textoEntrada = document.getElementsByTagName("input");
var elemento_pai = document.getElementsByTagName("section")[0];
var elementoAltera = "";
var db = openDatabase("myDB", "1.0", "TIPS Database Example", 2 * 1024 * 1024);
// db.transaction(function (tx) {
//   tx.executeSql("DROP TABLE  myTable ");
// });

document.addEventListener("load", carrega());

db.transaction(function (tx) {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS myTable (id INTERGER PRIMARY KEY , nome TEXT)"
  );
});

// console.log(db);
function carrega() {
  db.transaction(function (tx) {
    tx.executeSql("SELECT * FROM myTable ", [], function (tx, resultado) {
      var dados = resultado.rows;
      for (let i = 0; i < dados.length; i++) {
        console.log("xxx", dados[i].id, dados[i].nome);
        textoEntrada[0].value = dados[i].nome;
        gera(dados[i].id);
      }
    });
  });
}

//Gerar os valores para inserir no array
function gera(d) {
  if (textoEntrada[0].value) {
    nome = textoEntrada[0].value;
    if (d == 0) {
      id = Date.now().toString();
    } else {
      id = d;
    }
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
  textoEntrada[0].focus();
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

  var tagB = geraElemento("input");
  geraAtributo(tagB, "type", "checkbox");
  geraAtributo(tagB, "onclick", "checar(this)");
  var tagBF = geraFilho(tagBD, tagB);

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
  let elemento = valor.parentNode.parentNode;
  var id = elemento.getAttribute("dados");
  console.log(elemento, "ID", id);

  db.transaction(function (tx) {
    tx.executeSql("DELETE from myTable WHERE id=(?) ;", [id]);
  });

  elemento.parentNode.removeChild(elemento);
  console.log("Excluir");
}

function editar(valor) {
  let elemento = valor.parentNode.parentNode;
  var id = elemento.getAttribute("dados").toString();
  var texto = elemento.getElementsByTagName("p")[0].innerHTML;
  textoEntrada[0].value = texto;
  elementoAltera = valor;
  console.log("Elemento", texto, "teste", elementoAltera, "ID", id);

  botao = document
    .getElementsByClassName("submit")[0]
    .getElementsByTagName("button")[0];
  botao.innerHTML = "Alterar";
  geraAtributo(botao, "onclick", "altera(this," + id + ")");
  console.log("Editar");
}

function altera(valor, id) {
  texto = textoEntrada[0].value;
  elementoAltera.parentNode.parentNode.getElementsByTagName("p")[0].innerHTML =
    texto;
  let vid = parseInt(
    elementoAltera.parentNode.parentNode.getAttribute("dados")
  );

  console.log("elementoAltera", elementoAltera.parentNode.parentNode);
  db.transaction(function (tx) {
    tx.executeSql("UPDATE myTable SET nome = (?) WHERE id=(?) ;", [texto, vid]);
  });

  botao = document
    .getElementsByClassName("submit")[0]
    .getElementsByTagName("button")[0];
  botao.innerHTML = "Gerar";
  geraAtributo(botao, "onclick", "gera()");
  textoEntrada[0].value = "";
  console.log("valor", valor);
  console.log("III", typeof id, typeof vid);
  console.log(id === vid, texto);
}

function checar(valor) {
  valor.parentNode.parentNode.classList.toggle("check");
}

function limpa() {
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM myTable;");
  });

  // elemento_pai.parentNode.removeChild(elemento_pai);

  console.log(elemento_pai);
  section = elemento_pai.getElementsByTagName("article");
  const tam = section.length;
  for (let i = tam - 1; i >= 0; i--) {
    console.log("qqq", i, tam, "i", section[i]);
    section[i].parentNode.removeChild(section[i]);
  }

  console.log("Limpa", elemento_pai);
}
