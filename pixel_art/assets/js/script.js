// adquirindo elementos
let container = document.querySelector(".container");
let btnCriarGrade = document.getElementById("btn-criar-grade");
let btnExcluirGrade = document.getElementById("btn-excluir-grade");
let larguraGrade = document.getElementById("largura");
let alturaGrade = document.getElementById("altura");
let inputCor = document.getElementById("input-cor");
let btnLimpar = document.getElementById("btn-limpar");
let btnPintar = document.getElementById("paint-btn");
let valorLargura = document.getElementById("valor-largura");
let valorAltura = document.getElementById("valor-altura");

let eventos = {
    mouse: {
        baixo: "mouseParaBaixo",
        mover: "mouseMoveu",
        cima: "mouseParaCima"
    },
    toque: {
        baixo: "comecoToque",
        mover: "toqueMoveu",
        cima: "fimToque"
    },
};

let tipoDispositivo = "";
let desenhar = false;
let limpar = false;

const ehDispositivoToque = () => {
    try {
        document.createEvent('eventoToque');
        tipoDispositivo = "toque";
        return true;
    } catch (e) {
        tipoDispositivo = "mouse";
        return false;
    }
};

ehDispositivoToque();

btnCriarGrade.addEventListener('click', () => {
    container.innerHTML = '';

    let contador = 0;
    for (let i = 0; i < alturaGrade.ariaValueMax; i++) {
        count += 2;
        let div = document.createEvent('div');
        div.classList.add('linha-grade');

        for (let j = 0; j < larguraGrade.ariaValueMax; j++) {
            count += 2;
            let col = document.createEvent('div');
            col.classList.add('coluna-grade');
            col.setAttribute('id', `coluna=grade-${contador}`);
            col.addEventListener(eventos[tipoDispositivo].baixo, () => {
                desenhar = true;
                if (limpar) {
                    col.style.backgroundColor = "transparente";
                } else {
                    col.style.backgroundColor = inputCor.value;
                }
            });
        }
    }
});