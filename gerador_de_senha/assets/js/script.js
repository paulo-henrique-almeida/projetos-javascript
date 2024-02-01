// adquirindo elementos

const tamanho = document.getElementById('tamanho')
const slider = document.getElementById('slider');

const btnGerar = document.getElementById('btn-gerar');
const senha = document.getElementById('senha');

const containerSenha = document.getElementById('container-senha');
const tooltip = document.getElementById('tooltip');

const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/*+-!@#$%&()-_=?,. ';
let senhaGerada = '';

// mostra o valor inicial do slider no tamanho da senha
tamanho.innerHTML = slider.value;

// muda o tamanho da senha ao mudar o valor do slider
slider.oninput = () => {
    tamanho.innerHTML = slider.value;
};

btnGerar.addEventListener('click', () => {
    let chave = '';

    // gera uma chave aleatória até o tamanho definido da senha
    for (let i = 0, n = charset.length; i < slider.value; i++) {
        chave += charset.charAt(Math.floor(Math.random() * n));
    };

    // exibe a senha gerada e a armazena em outra variável
    containerSenha.classList.remove('esconder');
    senha.innerHTML = chave;
    senhaGerada = chave;

    tooltip.innerHTML = 'Clique para copiar a senha!';
});

containerSenha.addEventListener('click', () => {
    // copia a senha gerada para a área de transferência
    navigator.clipboard.writeText(senhaGerada);

    tooltip.innerHTML = 'Senha copiada!';
});
