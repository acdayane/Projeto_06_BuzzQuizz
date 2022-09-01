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

<<<<<<< HEAD
//VARIÁVEIS USADAS MAIS DE UMA VEZ:
let noneTela1= document.querySelector(".conteudo-principal");
let criandoQuizz= document.querySelector(".criando-quizz");
let perguntasCriadas= document.querySelector(".tela-criando-perguntas-quizz");

function criarQuizz(){
    noneTela1.classList.add("none")
    criandoQuizz.classList.remove("none");
}

function criePerguntas(){
    criandoQuizz.classList.add("none");
    perguntasCriadas.classList.remove("none");
}
=======

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

    const umQuizz = document.querySelector('.um-quizz');
    umQuizz.classList.remove ('none');
       
    umQuizz.innerHTML = `
        <div class = 'quizz'>
            <span>${quizzClicado.title}</span>
            <img src = '${quizzClicado.image}' />
        </div>
        ` 
    console.log(quizzClicado.title)

    console.log (umQuizz);
}       



function criaQuizz(){
    let criandoQuizz= document.querySelector(".criando-quizz");
    criandoQuizz.classList.remove("none");
}


>>>>>>> b29e637bd1c784f3ecff49ddc4f3703bd02a5b6a
