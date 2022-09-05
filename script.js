let quizzes;
let idQuizz;
let quizzClicado;
let feed;
let box;
let i;
let j;
let acertos = 0;
let arrayFim = [];
let arrayRespostas = [];
let addFinal;


// Obter quizzes que não são do usuário para tela 1
obterQuizzes();

function obterQuizzes () {
    const promessa = axios.get ('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(renderizarQuizzes);
    promessa.catch(deuErro);
}

function renderizarQuizzes (res) {
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
let containerPerguntas= document.querySelector(".container-perguntas");
let niveisQuizz= document.querySelector(".niveis-do-quizz");
let ulNiveisQuizz= document.querySelector(".ulNiveisQuizz");
//let sucessoDoQuizz= document.querySelector(".sucesso-quizz");
let ulSucessoQuizz= document.querySelector(".ul-sucesso-quizz");

//VALORES DOS INPUTS:
let tituloQuizz= document.querySelector(".Título-Quizz");
let URLQuizz= document.querySelector(".URL-Quizz");
let quantidadePerguntas= document.querySelector(".quantidade-perguntas");
let nivelQuizz= document.querySelector(".niveis-Quizz");
//VALORES DOS INPUTS DA TELA 3.2:
let textoDaPergunta= "";
let corDaPergunta= "";
let textoDaRespostaCorreta= "";
let URLdaRespostaCorreta= "";
let textoDaResposta="";
let URLdaResposta="";

function criarQuizz(){
    homePage.classList.add("none")
    criandoQuizz.classList.remove("none");
}

function criePerguntas(){
    containerPerguntas.innerHTML="";
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

    for(let i=0; i<quantidadePerguntas.value; i++){
        containerPerguntas.innerHTML+= `

    <li onclick="editarQuestaox(this)">
        <div class="pergunta-fechada">
            <div class="numero-da-pergunta text-closed">Pergunta ${i+1}<ion-icon name="create-outline"></ion-icon></div>
        </div>
        
        <div class="perguntaX pergunta${i+1} none">
            <div class="numero-da-pergunta text">Pergunta ${i+1}</div>

            <input type="text" class="texto-da-pergunta${i+1}" placeholder="texto da pergunta">
            <input type="text" class="cor-da-pergunta${i+1}" placeholder="cor de fundo da pergunta"> 

            <div class="resposta-correta text">Resposta correta</div>

            <input type="text" class="Texto-da-resposta-correta${i+1}" placeholder="Resposta correta">
            <input type="text" class="URL-da-resposta-correta${i+1}" placeholder="URL da imagem">

            <div class="respostas-incorretas text">Respostas incorretas</div>
            
            <input type="text" class="Texto-da-resposta${i+1}" placeholder="Resposta incorreta 1">
            <input type="text" class="margin-bottom URL-da-resposta${i+1}" placeholder="URL da imagem 1">

            <input type="text" class="Texto-da-resposta${i+1}" placeholder="Resposta incorreta 2">
            <input type="text" class="margin-bottom URL-da-resposta${i+1}" placeholder="URL da imagem 2">

            <input type="text" class="Texto-da-resposta${i+1}" placeholder="Resposta incorreta 3">
            <input type="text" class="URL-da-resposta${i+1}" placeholder="URL da imagem 3">
        </div>
    </li>`
    }
    //VALORES DOS INPUTS DA TELA 3.2:
    textoDaPergunta= document.querySelector(".texto-da-pergunta1");
    corDaPergunta= document.querySelector(".cor-da-pergunta1");
    textoDaRespostaCorreta= document.querySelector(".Texto-da-resposta-correta1");
    URLdaRespostaCorreta= document.querySelector(".URL-da-resposta-correta1");
    textoDaResposta= document.querySelector(".Texto-da-resposta1");
    URLdaResposta=document.querySelector(".URL-da-resposta1");

   console.log(tituloQuizz.value) ;
   console.log(URLQuizz.value) ;
   console.log(quantidadePerguntas.value);
   console.log(nivelQuizz.value);
}

function editarQuestaox(questaoSelecionada){
    let questaoNone= questaoSelecionada.children[0];
    let questaoRemoveNone= questaoSelecionada.children[1];

    questaoNone.classList.add('none');
    questaoRemoveNone.classList.remove('none');
}

function niveisDoQuizz(){
    for(let i=0; i<nivelQuizz.value; i++){
        ulNiveisQuizz.innerHTML+= ` 
        <li onclick="editarNivel(this)">
            <div class="pergunta-fechada">
                <div class="numero-da-pergunta text-closed">Nível ${i+1} <ion-icon name="create-outline"></ion-icon></div>
            </div>

            <div class="perguntaX none">
                <div class="numero-da-pergunta text">Nivel ${i+1}</div>
                <input type="text" placeholder="Título do nível">
                <input type="text" placeholder="% de acerto mínima"> 
                <input type="text" placeholder="URL da imagem do nível">
                <input type="text" class="descricao-nivel" placeholder="Descrição do nível">
            </div>          
        </li>`
    }

    niveisQuizz.classList.remove("none");
    perguntasCriadas.classList.add("none");
    
}

function editarNivel(nivelSelecionado){
    let nivelNone= nivelSelecionado.children[0];
    let nivelRemoveNone= nivelSelecionado.children[1];

    nivelNone.classList.add('none');
    nivelRemoveNone.classList.remove('none');
}

function sucessoQuizz(){
    niveisQuizz.classList.add("none");
    ulSucessoQuizz.classList.remove("none");
    ulSucessoQuizz.innerHTML+=`
    <li>
        <div class="sucesso-quizz">
            <div class="container-sucesso-quizz"> 
                <div class="titulo-comeco"><b>Seu quizz está pronto!</b></div>
                <div class = 'quizz'>
                        <span>${tituloQuizz.value}</span>
                        <img src ='${URLQuizz.value}'/>
                </div> 
            </div>
            <button class="acessar-quizz">Acessar Quizz</button>
            <button class="back-home" onclick="backHome()">Voltar pra home</button>
        </div>
    </li>`;
}

function backHome(){
    homePage.classList.remove("none");
    ulSucessoQuizz.classList.add("none");
}


// Abrir quizz selecionado na tela 2
function buscarQuizz(idQuizz) {
    
    promessa = axios.get (`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    promessa.then(abrirQuizz, console.log(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`));
    promessa.catch(deuErro);

}


function abrirQuizz(res) {

    quizzClicado = res.data; 
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

    renderizarQuizz();

}
   
  
function renderizarQuizz(){

    for (let i=0; i<quizzClicado.questions.length; i++){ 
        
        arrayFim.push(0);

        feed = document.querySelector ('.feed-quizz');

            feed.innerHTML += 
        
           `<div class = 'box-quizz'>                    
                <div class = 'titulo-quizz' style='background-color: ${quizzClicado.questions[i].color}'>
                    <h1>${quizzClicado.questions[i].title}</h1> 
                </div>
                <div class = 'respostas-quizz box-quizz${i}'>

                </div>
            </div>
            `
                                            
        for (let j=0; j<quizzClicado.questions[i].answers.length; j++){
            
            embaralharQuizz();

            function embaralharQuizz(){             
            
                        arrayRespostas.push(j);
            
                        arrayRespostas.sort(comparador);
            
                        function comparador() { 
                            return Math.random() - 0.5; 
                        }  

            }
        }

        for (let k=0; k<arrayRespostas.length; k++){

            box = document.querySelector ('.box-quizz'+i);

            box.innerHTML +=
            `   <div class = 'resposta-quizz pergunta${i} nao-clicado ${quizzClicado.questions[i].answers[arrayRespostas[k]].isCorrectAnswer}'  onclick = 'addCorETransparencia(this, ${i})'>
                    <img src = '${quizzClicado.questions[i].answers[arrayRespostas[k]].image}'/>
                    <p>${quizzClicado.questions[i].answers[arrayRespostas[k]].text}</p>
                </div>                        
               
            `        
        }   
        
        console.log (arrayRespostas);
        arrayRespostas = [];
    }
}

// Comportamento das respostas na tela 2
function addCorETransparencia (elementoClicado, pergunta) {
    
    arrayFim[pergunta] = 1;

    elementoClicado.classList.remove ('nao-clicado');

    if (elementoClicado.classList.contains ('true')){
        if (!elementoClicado.classList.contains ('verde')){
            elementoClicado.classList.add ('verde');
            acertos += 1;
        }      
    }
    if (elementoClicado.classList.contains ('false')){
        elementoClicado.classList.add ('vermelho');
    }

    elementos = document.querySelectorAll ('div.pergunta'+pergunta);

    for (i=0; i<elementos.length; i++){

        if (elementos[i].classList.contains ('nao-clicado')){
            elementos[i].classList.add ('transparencia');
        }
        if (elementos[i].classList.contains ('true')){
            elementos[i].classList.add ('verde');
        }
        if (elementos[i].classList.contains ('false')){
            elementos[i].classList.add ('vermelho');
        }        
    }

    console.log (arrayFim);
    console.log (acertos);

    let soma = 0;

    for (l=0; l<arrayFim.length; l++){

        soma = soma + arrayFim[l];
        
        if (arrayFim.length === soma){
            
            finalizarQuizz();
        }
    }    
}  

// Renderizar box de finalização do quizz
function finalizarQuizz (){
        addFinal = document.querySelector ('.box-final');
        addFinal.classList.remove ('none');

        console.log (arrayFim.length)

        let percentualAcertos = (Math.round((acertos/arrayFim.length) * 100 ));
        console.log (percentualAcertos)

        for (let i=0; i<quizzClicado.levels.length; i++){ 

            const qtdeNiveis = quizzClicado.levels.length;
            //ordenar
            //comparar
                
        //let titulo = percentualAcertos + '% : ' + quizzClicado.levels[i].title;
        //console.log(titulo);   
          
        addFinal.innerHTML = `
            <div class = 'titulo-final'>
                <h1>BATATA</h1> 
            </div>
            <div class = 'conteudo-final'>
                <img src = '${quizzClicado.levels[i].image}'/>
                <p>${quizzClicado.levels[i].text}</p> 
            </div>          
        `
    
}
}

function reiniciarQuizz (){
    const feed = document.querySelector ('.feed-quizz');
    feed.innerHTML = ''; 
    addFinal.classList.add ('none');
    arrayFim = [];
    acertos = 0;
    renderizarQuizz(quizzClicado);
    

} 

function voltarHome (){    

    const apaga = document.querySelector ('.container-quizz');
    apaga.classList.add ('none');

    const aparece = document.querySelector ('.conteudo-principal');
    aparece.classList.remove ('none');

    quizzClicado = 0;
    addFinal.classList.add ('none');
    feed.innerHTML = '';
    box.innerHTML = '';   

}

function criaQuizz(){
    let criandoQuizz= document.querySelector(".criando-quizz");
    criandoQuizz.classList.remove("none");
}
