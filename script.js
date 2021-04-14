let seuVotoPara =  document.querySelector('.d-1-1 span')
let cargo =  document.querySelector('.d-1-2 span')
let descricao =  document.querySelector('.d-1-4')
let aviso =  document.querySelector('.d-2')
let lateral =  document.querySelector('.d-1-direita')
let numeros =  document.querySelector('.d-1-3')


let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];


function comecarEtapa() {
    let etapa = etapas[etapaAtual];
     
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(i=0; i< etapa.numeros; i++) {

        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml; 
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item)=>{
        if (item.numero === numero) {
           return true;
        } else {
            return false;
        }
    });
    
    if( candidato.length > 0 ) {
        candidato = candidato[0]

        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome.toUpperCase()} <br> Partido: ${candidato.partido.toUpperCase()}`
        aviso.style.display = 'block';
        
        let fotosHtml = ''
        for ( let i in candidato.fotos) {

            if (candidato.fotos[i].small) {
                    fotosHtml += ` <div class="d-1-image small">
                    <img src="${candidato.fotos[i].url}" alt="">
                    ${candidato.fotos[i].legenda.toUpperCase()}
                    </div>`
                     
                    descricao.innerHTML  += `<br>Vice: ${candidato.vice.nome.toUpperCase()}`
                   
            } else {
                    fotosHtml += ` <div class="d-1-image">
                    <img src="${candidato.fotos[i].url}" alt="">
                    ${candidato.fotos[i].legenda.toUpperCase()}
                    </div>`
            }
            
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca" style="margin: 30px">VOTO NULO</div>`
    }
}

function clicou (n) {
    let numeroPisca = document.querySelector('.numero.pisca');

    if( numeroPisca !== null ) {
        numeroPisca.innerHTML = n;
        numero = `${numero}${n}`

        numeroPisca.classList.remove('pisca');

        if( numeroPisca.nextElementSibling !== null ) {
            numeroPisca.nextElementSibling.classList.add('pisca');    
        } else {
            atualizaInterface()
        }
        
    }

    new Audio('audio/ul1.mp3').play(); 
}

function branco(){
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso--grande pisca" style="margin-left: 25px">VOTO EM BRANCO</div>`

        new Audio('audio/ul1.mp3').play(); 
    }
}

function corrige(){
    comecarEtapa()
    new Audio('audio/ul2.mp3').play(); 
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    
    if (votoBranco === true) {
        votoConfirmado = true;
        
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        })
        
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }
    
    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
            new Audio('audio/ul3.mp3').play(); 
        } else {
             document.querySelector('.tela').innerHTML = `<div class="aviso--gigante">FIM</div>`
             console.log(votos)
             new Audio('audio/ul3.mp3').play(); 
        }
    }
}

comecarEtapa()