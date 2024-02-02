// adquirindo os elementos
const temporizador = document.getElementById('temporizador');
const marksList = document.getElementById('marks-list');

const play = document.getElementById('play');
const marcar = document.getElementById('marcar');
const resetar = document.getElementById('resetar');

let interval = 0;
let timer = 0;
let marks = [];

const formatarTempo = (time) => {
    // transforma os centésimos recebidos pela variável time em horas, minutos, segundos e centésimos
    const horas = Math.floor(time / 360000);
    const minutos = Math.floor((time % 360000) / 6000);
    const segundos = Math.floor((time % 6000) / 100);
    const centesimos = time % 100;

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}:${centesimos.toString().padStart(2, '0')}`;
}

const addMarkList = (markIndex, markTime) => {
    marksList.innerHTML += `<p>Marca ${markIndex}: ${formatarTempo(markTime)}</p>`;
};

const markTime = () => {
    const qtdMarks = marks.length + 1;

    marks.push(timer);
    addMarkList(qtdMarks, timer);

    // se houver mais que duas marcações, adiciona uma barra de rolagem
    if (qtdMarks > 2) {
        marksList.style.overflowY = 'scroll'
    }
};

const mudarTimer = () => {
    // habilita o botão para marcação
    marcar.removeAttribute('disabled');

    const action = play.getAttribute('action');

    // limpa o intervalo atual
    clearInterval(interval);

    if (action == 'start' || action == 'continue') {
        interval = setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);
        play.setAttribute('action', 'pause');
        play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (action == 'pause') {
        play.setAttribute('action', 'continue');
        play.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
};

const resetTimer = () => {
    clearInterval(interval);
    timer = 0;
    marks = [];
    setTimer(0);
    marksList.innerHTML = '';
    marksList.style.overflowY = 'hidden';
    play.setAttribute('action', 'start');
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
    marcar.setAttribute('disabled', 'disabled');
};

const setTimer = (time) => {
    temporizador.innerText = formatarTempo(time);
}

// adicionando as funções aos botões
play.addEventListener('click', mudarTimer)
marcar.addEventListener('click', markTime)
resetar.addEventListener('click', resetTimer)
