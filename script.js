/* =========================================
   BLOQUEAR ROLAGEM NA PRIMEIRA TELA
========================================= */

document.body.classList.add("abertura-ativa");


/* =========================================
   PULAR ABERTURA
========================================= */

function pularAbertura() {

    const abertura =
        document.getElementById("abertura");

    const segundaTela =
        document.getElementById("segundaTela");

    const musica =
        document.getElementById("musicaConvite");


    /* ================================
       INICIAR MÚSICA
    ================================= */

    musica.volume = 0.35;

    musica.play().catch(() => {
        console.log("A reprodução da música foi bloqueada pelo navegador.");
    });


    /* ================================
       ANIMAÇÃO DA ABERTURA
    ================================= */

    abertura.style.opacity = "0";

    abertura.style.transform =
        "scale(1.02)";


    /* ================================
       MOSTRAR SEGUNDA TELA
    ================================= */

    setTimeout(() => {

        abertura.style.display = "none";

        segundaTela.classList.add("ativa");

        /* libera a rolagem */
        document.body.classList.remove("abertura-ativa");

        /* volta para o topo */
        window.scrollTo(0, 0);

    }, 700);

}

/* =========================================
   CARROSSEL DA PROGRAMAÇÃO
========================================= */

const programacao =
    document.querySelector('.programacao-container');

const setaEsquerda =
    document.querySelector('.seta-esquerda');

const setaDireita =
    document.querySelector('.seta-direita');


setaDireita.addEventListener('click', () => {

    programacao.scrollBy({

        left: programacao.offsetWidth * 0.8,

        behavior: 'smooth'

    });

});


setaEsquerda.addEventListener('click', () => {

    programacao.scrollBy({

        left: -programacao.offsetWidth * 0.8,

        behavior: 'smooth'

    });

});


/* =========================================
   CONFIRMAÇÃO DE PRESENÇA
========================================= */

const formulario =
    document.getElementById("formConfirmacao");


formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    /* PEGAR OS DADOS */

    const nome =
        document.getElementById("nome").value.trim();

    const whatsapp =
        document.getElementById("whatsapp").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const presenca =
        document.querySelector(
            'input[name="presenca"]:checked'
        ).value;

    const acompanhantes =
        document.getElementById("acompanhantes").value;


    /* MONTAR A MENSAGEM */

    const mensagem =
`CONFIRMAÇÃO DE PRESENÇA — FORMATURA CHAIANE ROTT

Nome: ${nome}

WhatsApp: ${whatsapp}

E-mail: ${email}

Presença: ${presenca}

Quantidade de acompanhantes: ${acompanhantes}

A participação dos acompanhantes depende da aprovação da formanda, que será repassada posteriormente pelo WhatsApp após análise.`;


    /* TRANSFORMAR A MENSAGEM EM LINK */

    const mensagemCodificada =
        encodeURIComponent(mensagem);


    /* SEU WHATSAPP */

    const numero =
        "5547997161316";


    /* ABRIR WHATSAPP */

    const link =
        `https://wa.me/${numero}?text=${mensagemCodificada}`;


    window.open(link, "_blank");

});


/* =========================================
   DÚVIDAS FREQUENTES
========================================= */

const perguntasFAQ =
    document.querySelectorAll('.faq-pergunta');


perguntasFAQ.forEach(pergunta => {

    pergunta.addEventListener('click', () => {

        const item =
            pergunta.parentElement;


        /* Fecha os outros */

        document
            .querySelectorAll('.faq-item')
            .forEach(outroItem => {

                if (outroItem !== item) {

                    outroItem.classList.remove('ativo');

                }

            });


        /* Abre ou fecha o selecionado */

        item.classList.toggle('ativo');

    });

});


/* =========================================
   CONTAGEM REGRESSIVA
========================================= */

const dataBaile =
    new Date("2027-01-29T21:00:00").getTime();


function atualizarContagem() {

    const agora =
        new Date().getTime();

    const distancia =
        dataBaile - agora;


    if (distancia <= 0) {

        document.getElementById("dias").textContent = "00";

        document.getElementById("horas").textContent = "00";

        document.getElementById("minutos").textContent = "00";

        document.getElementById("segundos").textContent = "00";

        return;

    }


    const dias =
        Math.floor(
            distancia /
            (1000 * 60 * 60 * 24)
        );


    const horas =
        Math.floor(
            (distancia %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutos =
        Math.floor(
            (distancia %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const segundos =
        Math.floor(
            (distancia %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("dias").textContent =
        String(dias).padStart(2, "0");


    document.getElementById("horas").textContent =
        String(horas).padStart(2, "0");


    document.getElementById("minutos").textContent =
        String(minutos).padStart(2, "0");


    document.getElementById("segundos").textContent =
        String(segundos).padStart(2, "0");

}


atualizarContagem();

setInterval(atualizarContagem, 1000);

/* =========================================
   GALERIA DE FOTOS — COMPUTADOR
========================================= */

function iniciarGaleriaComputador() {

    if (window.innerWidth <= 600) {
        return;
    }

    const galeria = document.querySelector('.galeria-formatura');
    const track = document.querySelector('.galeria-track');

    if (!galeria || !track) {
        return;
    }

    /* Remove qualquer animação CSS */
    track.style.animation = 'none';

    let posicao = 0;
    const velocidade = 0.5;

    function moverGaleria() {

        posicao -= velocidade;

        /*
         * A primeira sequência possui 4 fotos.
         * Calculamos exatamente a largura dela.
         */

        const primeiraFoto = track.children[0];

        if (!primeiraFoto) {
            return;
        }

        const larguraFoto =
            primeiraFoto.offsetWidth;

        const estilo =
            window.getComputedStyle(track);

        const gap =
            parseFloat(estilo.columnGap) ||
            parseFloat(estilo.gap) ||
            0;

        const quantidadeFotos = 4;

        const distancia =
            (larguraFoto + gap) *
            quantidadeFotos;

        /*
         * Quando a primeira sequência saiu,
         * voltamos exatamente para o começo
         * da segunda sequência.
         */

        if (Math.abs(posicao) >= distancia) {
            posicao += distancia;
        }

        track.style.transform =
            `translate3d(${posicao}px, 0, 0)`;

        requestAnimationFrame(moverGaleria);
    }

    moverGaleria();
}


/* Iniciar quando a página carregar */

window.addEventListener(
    'load',
    iniciarGaleriaComputador
);