// adquirindo elementos
let container = document.querySelector(".container");
let btnCriarGrade = document.getElementById("btn-criar-grade");
let btnLimparGrade = document.getElementById("btn-limpar-grade");
let larguraGrade = document.getElementById("largura");
let alturaGrade = document.getElementById("altura");
let inputCor = document.getElementById("input-cor");
let btnApagar = document.getElementById("btn-apagar");
let btnPintar = document.getElementById("btn-pintar");
let valorLargura = document.getElementById("valor-largura");
let valorAltura = document.getElementById("valor-altura");

let eventos = {
    mouse: {
        baixo: "mousedown",
        mover: "mousemove",
        cima: "mouseup"
    },
    toque: {
        baixo: "touchstart",
        mover: "touchmove",
        cima: "touchend"
    }
};

let tipoDispositivo = "";
let pintar = false;
let apagar = false;

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
    for (let i = 0; i < alturaGrade.value; i++) {
        contador += 2;
        let div = document.createElement('div');
        div.classList.add('linha-grade');

        for (let j = 0; j < larguraGrade.value; j++) {
            contador += 2;
            let col = document.createElement('div');
            col.classList.add('coluna-grade');
            col.setAttribute('id', `coluna=grade-${contador}`);

            col.addEventListener(eventos[tipoDispositivo].baixo, () => {
                pintar = true;
                if (apagar) {
                    col.style.backgroundColor = "transparente";
                } else {
                    col.style.backgroundColor = inputCor.value;
                }
            });

            col.addEventListener(eventos[tipoDispositivo].mover, (e) => {
                let idElemento = document.elementFromPoint(
                    !ehDispositivoToque() ? e.clientX : e.touches[0].clientX,
                    !ehDispositivoToque() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(idElemento);
            });

            col.addEventListener(eventos[tipoDispositivo].cima, () => {
                pintar = false;
            });

            div.appendChild(col);
        }

        container.appendChild(div);
    }
});

function checker(idElemento) {
    let colunasGrade = document.querySelectorAll('.coluna-grade');
    colunasGrade.forEach((elemento) => {
        if (idElemento == elemento.id) {
            if (pintar && !apagar) {
                elemento.style.backgroundColor = inputCor.value;
            } else if (pintar && apagar) {
                elemento.style.backgroundColor = "transparent";
            }
        }
    });
}

btnLimparGrade.addEventListener('click', () => {
    container.innerHTML = '';
});

btnApagar.addEventListener('click', () => {
    apagar = true;
});

btnPintar.addEventListener('click', () => {
    apagar = false;
});

larguraGrade.addEventListener('input', () => {
    valorLargura.innerHTML = larguraGrade.value.toString().padStart(2, '0');
});

alturaGrade.addEventListener('input', () => {
    valorAltura.innerHTML = alturaGrade.value.toString().padStart(2, '0');
});

window.onload = () => {
    alturaGrade.value = 0;
    larguraGrade.value = 0
};