window.onload = function () {
    gerarCalendario();
}

function gerarCalendario() {
    const caledario = document.getElementById('calendario');

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    // define o mês atual
    meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    document.getElementById('mes').textContent = meses[mes];

    // adquire o primeiro e último dia do mês
    const primeDiaMes = new Date(ano, mes, 1);
    const ultDiaMes = new Date(ano, mes + 1, 0);

    // limita o input date
    const inputDate = document.getElementById('data-evento');

    inputDate.min = `${ano}-${mes + 1}-${primeDiaMes.getDate()}`;
    inputDate.max = `${ano}-${mes + 1}-${ultDiaMes.getDate()}`;

    // adquire o primeiro dia da semana e a quantidade total de dias
    const primeDiaSemana = primeDiaMes.getDay();
    const diasTotais = ultDiaMes.getDate();

    for (let i = 0; i < primeDiaSemana; i++) {
        let diaVazio = document.createElement('div');
        caledario.appendChild(diaVazio);
    }

    for (let dia = 1; dia <= diasTotais; dia++) {
        let quadradoDia = document.createElement('div');
        quadradoDia.className = 'dia-calendario';
        quadradoDia.textContent = dia;
        quadradoDia.id = `dia-${dia}`;
        caledario.appendChild(quadradoDia);
    }
}

function mostrarAddEventoModal() {
    document.getElementById('add-evento-modal').style.display = 'block';
}

function fecharAddEventoModal() {
    document.getElementById('add-evento-modal').style.display = 'none';
}

function delEvento(eventoElemento) {
    if (confirm('Deseja deletar esse evento?')) {
        eventoElemento.parentNode.removeChild(eventoElemento);
    }
}

function updateEvento(eventoElemento) {
    const novaDescEvento = prompt('Edite o evento:', eventoElemento.textContent);

    if (novaDescEvento !== null && novaDescEvento.trim() !== '') {
        eventoElemento.textContent = novaDescEvento;
    }
}

function addEvento() {
    const dataEvento = new Date(document.getElementById('data-evento').value);
    const descEvento = document.getElementById('desc-evento').value.trim();

    if (descEvento && !isNaN(dataEvento.getDate())) {
        const diasCalendario = document.getElementById('calendario').children;

        for (let i = 0; i < diasCalendario.length; i++) {
            const dia = diasCalendario[i];

            if (parseInt(dia.textContent) === dataEvento.getDate()) {
                const eventoElemento = document.createElement('div');
                eventoElemento.className = 'evento';
                eventoElemento.textContent = descEvento;

                eventoElemento.addEventListener('contextmenu', function (evento) {
                    evento.preventDefault();
                    delEvento(eventoElemento);
                });

                eventoElemento.addEventListener('click', function () {
                    updateEvento(eventoElemento)
                });

                dia.appendChild(eventoElemento);
                break;
            }
        }
        fecharAddEventoModal();
    } else {
        alert('Data ou descrição inválida.');
    }
}