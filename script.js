let quizzes;
let idQuizz;


// Obter quizzes que não são do usuário para tela 1
obterQuizzes();

function obterQuizzes () {
    const promessa = axios.get ('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(renderizarQuizzes);
    promessa.catch(deuErro);
}

function renderizarQuizzes (res) {
    console.log('Deu certo o recebimento dos quizzes');
    quizzes = res.data;
    console.log(res.data);

    const listaQuizzes = document.querySelector('.lista-quizzes');

    for (let i=0; i<quizzes.length; i++){
        listaQuizzes.innerHTML += `
        <li class = 'quizz' onclick = 'buscarQuizz(${quizzes[i].id})'>
            <span>${quizzes[i].title}</span>
            <img src = '${quizzes[i].image}' />
        </li>
        `
    }    

}

function deuErro(err) {
    console.log('Deu erro no recebimento dos quizzes', err);
    alert("Algo deu errado. Por favor, recarregue a página.");  
} 

//VARIÁVEIS USADAS MAIS DE UMA VEZ:
let homePage= document.querySelector(".conteudo-principal");
let criandoQuizz= document.querySelector(".criando-quizz");
let perguntasCriadas= document.querySelector(".tela-criando-perguntas-quizz");
let niveisQuizz= document.querySelector(".niveis-do-quizz");
let sucessoDoQuizz= document.querySelector(".sucesso-quizz");

//VALORES DOS INPUTS:
let tituloQuizz= document.querySelector(".Título-Quizz");
let URLQuizz= document.querySelector(".URL-Quizz");
let quantidadePerguntas= document.querySelector(".quantidade-perguntas");
let nivelQuizz= document.querySelector(".niveis-Quizz");

function criarQuizz(){
    homePage.classList.add("none")
    criandoQuizz.classList.remove("none");
}

function criePerguntas(){
    if(tituloQuizz.value.length>=20 && tituloQuizz.value.length<=65){
        if(URLQuizz.value.includes('https')== true|| URLQuizz.value.includes('http')==true) {
            if(quantidadePerguntas.value>=3 && quantidadePerguntas.value<=5 && nivelQuizz.value>=2 && nivelQuizz.value<=5){
                criandoQuizz.classList.add("none");
                perguntasCriadas.classList.remove("none");
            }
            else{
                alert("Atenção: a quantidade de perguntas é no máximo 5 e no mínimo 3. A quantidade de níveis é no máximo 5 e no mínimo 2")
            }
        }else {
            alert("Atenção: sua imagem precisa ser uma URL")
        } 
    }
    else {
        alert("Atenção: o título precisa conter no mínimo 20 caracteres e no máximo 65")
    }
   console.log(tituloQuizz.value) ;
   console.log(URLQuizz.value) ;
   console.log(quantidadePerguntas.value);
   console.log(nivelQuizz.value);
}

function niveisDoQuizz(){
    niveisQuizz.classList.remove("none");
    perguntasCriadas.classList.add("none");
}

function sucessoQuizz(){
    niveisQuizz.classList.add("none");
    sucessoDoQuizz.classList.remove("none");
}

function backHome(){
    homePage.classList.remove("none");
    sucessoDoQuizz.classList.add("none");
}

// Abrir quizz selecionado na tela 2
function buscarQuizz(idQuizz) {
    
    promessa = axios.get (`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    promessa.then(abrirQuizz, console.log(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`));
    promessa.catch(deuErro);

}

function abrirQuizz(res) {

    let quizzClicado = res.data; 
    console.log(quizzClicado)

removeTela();

    function removeTela(){
        let removeTela1 = document.querySelector ('.conteudo-principal')
        removeTela1.classList.add ('none');    
    }

    const umQuizz = document.querySelector('.container-quizz');
    umQuizz.classList.remove ('none');

    const banner = document.querySelector('.banner-quizz')
       
    banner.innerHTML = `
            <span>${quizzClicado.title}</span>
            <img src = '${quizzClicado.image}' />        
        ` 
    
}
      


/* 
renderizarQuiz(); 

function renderizarQuiz(){
    let arrayRespostas = [];

    arrayRespostas.sort(comparador);

    function comparador() { 
	    return Math.random() - 0.5; 
    } 

} */

function criaQuizz(){
    let criandoQuizz= document.querySelector(".criando-quizz");
    criandoQuizz.classList.remove("none");
}
