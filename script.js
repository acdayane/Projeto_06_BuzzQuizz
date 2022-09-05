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
let quizzesLocalStorage= JSON.parse(localStorage.getItem("objetoQuizz")||"[]");
let DivCriarQuizz= document.querySelector(".criar-quizz");
let DivContendoSeusQuizzes= document.querySelector('.seus-quizzes');

//VARIÁVEIS USADAS MAIS DE UMA VEZ:
let homePage= document.querySelector(".conteudo-principal");
let criandoQuizz= document.querySelector(".criando-quizz");
let perguntasCriadas= document.querySelector(".tela-criando-perguntas-quizz");
let containerPerguntas= document.querySelector(".container-perguntas");
let niveisQuizz= document.querySelector(".niveis-do-quizz");
let ulNiveisQuizz= document.querySelector(".ulNiveisQuizz");
let ulSucessoQuizz= document.querySelector(".ul-sucesso-quizz");
let ulContendoQuizzCriados= document.querySelector(".lista-seus-quizzes");

//PARTES DOS OBJETOS
let objetoPromessa ="";
let objetoPromessaSerializado ="";

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
let textoDaResposta1="";
let URLdaResposta1="";
let textoDaResposta2="";
let URLdaResposta2="";
let textoDaResposta3="";
let URLdaResposta3="";

//VALORES DOS INPUTS DA TELA 3.3:
let tituloDoNivel= "";
let porcentagemDeAcerto= "";
let URLimagemDoNivel= "";
let descricaoNivel="";

//ARRAYS CONTENDO PARTE DO OBBJETO
let objetoQuestoes= [];
let objetoNiveis= [];

if(quizzesLocalStorage!=""){
    DivContendoSeusQuizzes.classList.remove("none");
    DivCriarQuizz.classList.add("none");

        ulContendoQuizzCriados.innerHTML+=` 
        <li class = 'quizz' onclick = 'abrirQuizzCriado(this)'>
            <span>${quizzesLocalStorage.title}</span>
            <img src = '${quizzesLocalStorage.image}' />
        </li>`;
   
}
// Obter quizzes que não são do usuário para tela 1
obterQuizzes();

function obterQuizzes () {
    const promessa = axios.get ('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(renderizarQuizzes);
    promessa.catch(deuErro);
}

function renderizarQuizzes (res) {
    quizzes = res.data;
    //console.log(res.data);

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
    //console.log('Deu erro no recebimento dos quizzes', err);
    alert("Algo deu errado. Por favor, recarregue a página.");  
} 



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
            
            <input type="text" class="Texto-da-resposta-1-${i+1}" placeholder="Resposta incorreta 1">
            <input type="text" class="margin-bottom URL-da-resposta-1-${i+1}" placeholder="URL da imagem 1">

            <input type="text" class="Texto-da-resposta-2-${i+1}" placeholder="Resposta incorreta 2">
            <input type="text" class="margin-bottom URL-da-resposta-2-${i+1}" placeholder="URL da imagem 2">

            <input type="text" class="Texto-da-resposta-3-${i+1}" placeholder="Resposta incorreta 3">
            <input type="text" class="URL-da-resposta-3-${i+1}" placeholder="URL da imagem 3">
        </div>
    </li>`
    }
}

function validarQuestoes(){
    let ca=0
    for(let i=0; i<quantidadePerguntas.value; i++){
            textoDaPergunta= document.querySelector(`.texto-da-pergunta${i+1}`);
            corDaPergunta= document.querySelector(`.cor-da-pergunta${i+1}`);
            textoDaRespostaCorreta= document.querySelector(`.Texto-da-resposta-correta${i+1}`);
            URLdaRespostaCorreta= document.querySelector(`.URL-da-resposta-correta${i+1}`);
            textoDaResposta1=document.querySelector(`.Texto-da-resposta-1-${i+1}`);
            URLdaResposta1=document.querySelector(`.URL-da-resposta-1-${i+1}`);
            textoDaResposta2=document.querySelector(`.Texto-da-resposta-2-${i+1}`);
            URLdaResposta2=document.querySelector(`.URL-da-resposta-2-${i+1}`);
            textoDaResposta3=document.querySelector(`.Texto-da-resposta-3-${i+1}`);
            URLdaResposta3=document.querySelector(`.URL-da-resposta-3-${i+1}`);

            if(textoDaPergunta.value.length>=20 &&
                corDaPergunta.value.length===7 &&
                textoDaRespostaCorreta.value.length>0 &&
                URLdaRespostaCorreta.value.includes('https') &&
                textoDaResposta1.value.length>0 &&
                URLdaResposta1.value.includes("https") &&
                textoDaResposta2.value.length>0 &&
                URLdaResposta2.value.includes('https') &&
                textoDaResposta3.value.length>0 &&
                URLdaResposta3.value.includes('https')){
                   ca=ca+1
                } else{
                    alert("Você escreveu algo errado. Verifique os links e a quantidade d ecaracteres.");
                }
    } 
    if(ca==quantidadePerguntas.value){
       niveisDoQuizz();
    }
    //console.log(ca);
    //console.log(quantidadePerguntas.value);
}

function editarQuestaox(questaoSelecionada){
    let questaoNone= questaoSelecionada.children[0];
    let questaoRemoveNone= questaoSelecionada.children[1];

    questaoNone.classList.add('none');
    questaoRemoveNone.classList.remove('none');
}

function niveisDoQuizz(){
    
    for (let i=0; i<quantidadePerguntas.value; i++){
        
            textoDaPergunta= document.querySelector(`.texto-da-pergunta${i+1}`);
            corDaPergunta= document.querySelector(`.cor-da-pergunta${i+1}`);
            textoDaRespostaCorreta= document.querySelector(`.Texto-da-resposta-correta${i+1}`);
            URLdaRespostaCorreta= document.querySelector(`.URL-da-resposta-correta${i+1}`);
            textoDaResposta1=document.querySelector(`.Texto-da-resposta-1-${i+1}`);
            URLdaResposta1=document.querySelector(`.URL-da-resposta-1-${i+1}`);
            textoDaResposta2=document.querySelector(`.Texto-da-resposta-2-${i+1}`);
            URLdaResposta2=document.querySelector(`.URL-da-resposta-2-${i+1}`);
            textoDaResposta3=document.querySelector(`.Texto-da-resposta-3-${i+1}`);
            URLdaResposta3=document.querySelector(`.URL-da-resposta-3-${i+1}`);

        objetoQuestoes.push( 
            {
            title: textoDaPergunta.value,
            color: corDaPergunta.value,
            answers: [
                {
                    text: textoDaRespostaCorreta.value,
                    image: URLdaRespostaCorreta.value,
                    isCorrectAnswer: true
                },
                {
                    text: textoDaResposta1.value,
                    image:  URLdaResposta1.value,
                    isCorrectAnswer: false
                },
                {
                    text: textoDaResposta2.value,
                    image: URLdaResposta2.value,
                    isCorrectAnswer: false
                },
                {
                    text: textoDaResposta3.value,
                    image: URLdaResposta3.value,
                    isCorrectAnswer: false
                }
            ]
        },
        );
    }
    //console.log(objetoQuestoes);
    //console.log(objetoQuestoes[0].title);
    //console.log(objetoQuestoes[1].title);
    //console.log(objetoQuestoes[2].title);

    for(let i=0; i<nivelQuizz.value; i++){
        ulNiveisQuizz.innerHTML+= ` 
        <li onclick="editarNivel(this)">
            <div class="pergunta-fechada">
                <div class="numero-da-pergunta text-closed">Nível ${i+1} <ion-icon name="create-outline"></ion-icon></div>
            </div>

            <div class="perguntaX none">
                <div class="numero-da-pergunta text">Nivel ${i+1}</div>
                <input type="text" class="titulo-do-nivel-${i+1}" placeholder="Título do nível">
                <input type="text" class="porcentagem-acerto-nivel-${i+1}" placeholder="% de acerto mínima"> 
                <input type="text" class="URL-imagem-nivel-${i+1}" placeholder="URL da imagem do nível">
                <input type="text" class="descricao-nivel-${i+1}" class="descricao-nivel" placeholder="Descrição do nível">
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

function validarNiveis(){
    let co=0
    for(let i=0; i<nivelQuizz.value; i++){
        tituloDoNivel= document.querySelector(`.titulo-do-nivel-${i+1}`);
        porcentagemDeAcerto= document.querySelector(`.porcentagem-acerto-nivel-${i+1}`);
        URLimagemDoNivel= document.querySelector(`.URL-imagem-nivel-${i+1}`);
        descricaoNivel= document.querySelector(`.descricao-nivel-${i+1}`);

         if(tituloDoNivel.value.length>=10 &&
            porcentagemDeAcerto.value >=0 &&
            porcentagemDeAcerto.value<=100 &&
            URLimagemDoNivel.value.includes('https') &&
            descricaoNivel.value.length>=30){
                co=co+1
        } else{
            alert("você escreveu algo errado. Favor veriricar links e quantidade de caracteres.");
        }
    } 
    if(co==nivelQuizz.value){
        sucessoQuizz();
    }
    //console.log(co);
    //console.log(nivelQuizz.value);
}

function sucessoQuizz(){

    for(let i= 0; i<nivelQuizz.value; i++){
        tituloDoNivel= document.querySelector(`.titulo-do-nivel-${i+1}`);
        porcentagemDeAcerto= document.querySelector(`.porcentagem-acerto-nivel-${i+1}`);
        URLimagemDoNivel= document.querySelector(`.URL-imagem-nivel-${i+1}`);
        descricaoNivel= document.querySelector(`.descricao-nivel-${i+1}`);

        objetoNiveis.push({
            title: tituloDoNivel.value,
            image: URLimagemDoNivel.value,
            text: descricaoNivel.value,
            minValue: porcentagemDeAcerto.value
         },);
    }

    //console.log(objetoNiveis);

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

    objetoPromessa= {
        title: tituloQuizz.value,
        image: URLQuizz.value,
        questions: objetoQuestoes,
        levels: objetoNiveis,
        };
        console.log(objetoPromessa);

    let promessa=axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', objetoPromessa);
    console.log(objetoPromessa);

   promessa.then(sucessoCriacaoQuizz);
   promessa.catch(mostrarErro);
}

function sucessoCriacaoQuizz(respostaPost){
    console.log(respostaPost.data);
    obterQuizzes();
    postNoLocalStorage(respostaPost.data);
}

function postNoLocalStorage(respostaQuizz){
    objetoPromessaSerializado= JSON.stringify(respostaQuizz);
    localStorage.setItem("objetoQuizz", objetoPromessaSerializado);
}



function mostrarErro(erroPost){
    if(erroPost.response.status=== 422){
        alert("Sintaxe inválida. Por favor, verifique o que digitou.");
    }
    if(erroPost.response.status=== 409){
        alert("Esse nome já está em uso. Por favor, escolha outro nome.");
    }
    if(erroPost.response.status=== 404){
        alert("O servidor não pode encontrar o recurso solicitado. Esse link não está disponível ou não existe.");
    }
    if(erroPost.response.status=== 400){
        alert("Sintaxe inválida. Por favor, verifique o que digitou.");
    }
}

function backHome(){
    homePage.classList.remove("none");
    ulSucessoQuizz.classList.add("none");
    DivContendoSeusQuizzes.classList.remove("none");
    DivCriarQuizz.classList.add("none");

    console.log(quizzesLocalStorage);

    ulContendoQuizzCriados.innerHTML+=` 
    <li class = 'quizz' onclick = 'abrirQuizzCriado(this)'>
        <span>${quizzesLocalStorage.title}</span>
        <img src = '${quizzesLocalStorage.image}' />
    </li>`;

}

function abrirQuizzCriado(quizzSelecionado){
    
        promessa = axios.get (`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzSelecionado.id}`);
        promessa.then(abrirQuizz);
        promessa.catch(deuErro);
    
    
    function abrirQuizz(res) {
    
        quizzClicado = res.data; 
        
    
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
            
            
            arrayRespostas = [];
        }
    }
    
    
}


// Abrir quizz selecionado na tela 2
function buscarQuizz(idQuizz) {
    
    promessa = axios.get (`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    promessa.then(abrirQuizz);
    promessa.catch(deuErro);

}


function abrirQuizz(res) {

    quizzClicado = res.data; 
    

removeTela();

    function removeTela(){
        let removeTela1 = document.querySelector ('.conteudo-principal')
        removeTela1.classList.add ('none');    
    }

    window.scroll(0,0);

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

        

        let percentualAcertos = (Math.round((acertos/arrayFim.length) * 100 ));
        

        let armazenaNivel;
        
        for (let i=0; i<quizzClicado.levels.length; i++){ 

            let m = 0;

            arrayNiveis.push(quizzClicado.levels[i]); //identifica qtde de niveis

            arrayNiveis.sort(function(a, b) { //ordena niveis em ordem crescente
                return a - b;
            });
            console.log(arrayNiveis, 'niveis');

            for (m=0; m<arrayNiveis.length; m++){

                if (percentualAcertos >= arrayNiveis[m].minValue){
                    armazenaNivel = arrayNiveis[m];

                let tituloResultado = percentualAcertos + '% de acerto: ' + arrayNiveis[m].title;
                console.log(tituloResultado)

                addFinal.innerHTML = `
                <div class = 'titulo-final'>
                    <h1>${tituloResultado}</h1> 
                </div>
                <div class = 'conteudo-final'>
                    <img src = '${arrayNiveis[m].image}'/>   
                    <p>${arrayNiveis[m].text}</p>                     
                </div>          
                `
                }       
            }
        }   
}


function reiniciarQuizz (){
    const feed = document.querySelector ('.feed-quizz');
    feed.innerHTML = ''; 
    addFinal.classList.add ('none');
    arrayFim = [];
    acertos = 0;
    arrayNiveis = [];
    renderizarQuizz(quizzClicado);
    window.scroll(0,0);   

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
    arrayNiveis = [];  

}

function criaQuizz(){
    let criandoQuizz= document.querySelector(".criando-quizz");
    criandoQuizz.classList.remove("none");
}
