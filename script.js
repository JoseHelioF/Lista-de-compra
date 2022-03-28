const base = {};
textoEntrada = document.getElementsByTagName("input");
var  elemento_pai = document.getElementsByTagName("section")[0];
let position = Object.keys(base).length;

//Gerar um novo item na lista
function gera() {
  if (textoEntrada[0].value) {
    
    console.log(textoEntrada[0].value);
    base[position + 1] = textoEntrada[0].value;
    console.log(position);
    position++;
    console.log(base);
    criaArticle();
  } else {
    alert("Digite um valor");
  }
  console.log("Aqui cheguei");
  textoEntrada[0].value = "";
    
}

function geraElemento(nometag){
  var filho = document.createElement(nometag);
  return filho;

}
function geraAtributo(elemento,tipo, valor){
  var atributo = elemento.setAttribute(tipo,valor)
  return atributo;
}
function geraFilho(pai,tag){
  var tagnova = pai.appendChild(tag);
  return tagnova;
}



//Cria um novo elemento para exibir o novo item
function criaArticle() {

  var tagArticle = geraElemento("article");
  geraAtributo(tagArticle,"class","articles")
  var tagArticleF = geraFilho(elemento_pai,tagArticle);
  
  
  var tagP = geraElemento("p");
  // let position = Object.keys(base).length;
  texto = base[position];
  const textNode = document.createTextNode(texto);
  var tagPF = geraFilho(tagP,textNode);
  geraFilho(tagArticleF,tagP);

  var tagD = geraElemento("div");
  geraAtributo(tagD,"class","buttons")  
  var tagBD = geraFilho(tagArticleF,tagD);

  var tagB = geraElemento("button");
  geraAtributo(tagB,"class","btnEdit")   
  var tagBF = geraFilho(tagBD,tagB);
  document.getElementsByClassName('btnEdit')[position+1].innerHTML = 'Editar'

  var tagB = geraElemento("button");
  geraAtributo(tagB,"class","btnDelete") 
  geraAtributo(tagB,"onclick","excluir(this)")   
  var tagBF = geraFilho(tagBD,tagB);
  document.getElementsByClassName('btnDelete')[position+1].innerHTML = 'Excluir'
}

function excluir(valor){
  let x = valor.parentNode.parentNode
  console.log(valor , x);
  x.parentNode.removeChild(x);
  console.log(valor , x);
  
}

