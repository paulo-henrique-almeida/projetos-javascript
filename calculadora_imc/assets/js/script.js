// adquirindo elementos

let altura = document.getElementById('altura');
let peso = document.getElementById('peso');

let btnCalcular = document.getElementById('calcular');

let valorImc = document.getElementById('valor-imc');
let desc = document.getElementById('desc');

const info = document.getElementById('infos');

btnCalcular.addEventListener('click', (event) => {
    // Evita o comportamento padrão
    event.preventDefault();

    valorAltura = parseFloat(altura.value);
    valorPeso = parseFloat(peso.value)

    if (!isNaN(valorAltura) && !isNaN(valorPeso) && valorAltura > 0) {
        // deixa as informações visíveis
        info.classList.remove('esconder');

        // calcula o IMC
        let imc = valorPeso / (valorAltura * valorAltura)
        valorImc.innerHTML = imc.toFixed(2).replace('.', ',');

        // classifica o IMC
        const classificacao = classificar(imc);
        if (classificacao.saudavel) {
            valorImc.className = 'saudavel';
        } else {
            valorImc.className = 'atencao';
        }

        desc.innerHTML = classificacao.mensagem;
    } else if (valorAltura <= 0 || valorPeso <= 0) {
        alert('Os valores devem ser maiores que 0.')
        altura.value = '';
        peso.value = '';
    } else {
        alert('Valores inválidos.')
    }
});

// classifica o imc
function classificar(imc) {
    // define um objeto classificacao
    let classificacao = {}

    // verifica a classificação do IMC
    if (imc >= 40) {
        classificacao.mensagem = 'Obesidade grau III';
    } else if (imc >= 35) {
        classificacao.mensagem = 'Obesidade grau II';
    } else if (imc >= 30) {
        classificacao.mensagem = 'Obesidade grau I';
    } else if (imc >= 25) {
        classificacao.mensagem = 'Sobrepeso';
    } else if (imc >= 18.5) {
        classificacao.mensagem = 'Peso Saudável';
        classificacao.saudavel = true;
    } else {
        classificacao.mensagem = 'Abaixo do peso';
    }

    // retorna a classificacao
    return classificacao;
}

