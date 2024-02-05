
// adquirindo elementos
const form = document.querySelector('form');
const pesquisar = document.querySelector('.pesquisar')

const btnAnterior = document.querySelector('.anterior');
const btnProximo = document.querySelector('.proximo');

const dadosPokemon = document.querySelector('.dados-pokemon');
const nomePokemon = document.querySelector('.nome-pokemon');
const idPokemon = document.querySelector('.id-pokemon');
const iconePokemon = document.querySelector('.imagem-pokemon');

let pesquisaPokemon = 0;

const buscarPokemon = async (pokemon) => {

    // exibe uma mensagem de carregamento
    dadosPokemon.classList.remove('esconder');
    nomePokemon.innerHTML = 'Buscando...';
    idPokemon.innerHTML = '';

    // esconde o ícone do pokémon enquanto está carregando
    if (!iconePokemon.classList.contains('esconder')) {
        iconePokemon.classList.add('esconder');
    }

    // faz uma busca pelo pokémon na API
    const respostaAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (respostaAPI.status === 200) {
        // guarda esses dados em um json
        const json = await respostaAPI.json();

        dados = {
            id: json.id,
            nome: json.name,
            iconeAnimado: json.sprites.versions['generation-v']['black-white'].animated['front_default']
        };

        // retorna a variável com os dados
        return dados;
    }
};

const renderPokemon = async (pokemon) => {
    const dados = await buscarPokemon(pokemon);

    // apenas renderiza se houver os dados
    if (dados) {
        // renderiza o ID do pokémon
        idPokemon.innerHTML = `${dados.id} -`;

        // renderiza o nome do pokémon
        nomePokemon.innerHTML = dados.nome;

        if (iconePokemon.classList.contains('nao-animado')) {
            iconePokemon.classList.remove('nao-animado');
        }

        if (!dados.iconeAnimado) {
            // renderiza o ícone estático do pokémon
            if (dados.id < 1011) {
                iconePokemon.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${dados.id.toString().padStart(3, '0')}.png`;
            } else {
                iconePokemon.src = `https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/${dados.nome}.avif`;
            }

            // adiciona uma nova classe caso o icone seja estático
            iconePokemon.classList.add('nao-animado');
        } else {
            // renderiza o ícone animado do pokémon
            iconePokemon.src = dados.iconeAnimado;
        } 

        // revela o ícone do pokémon
        iconePokemon.classList.remove('esconder');

        pesquisaPokemon = dados.id;
    } else {
        // exibe a mensagem de que o pokémon não foi encontrado
        nomePokemon.innerHTML = "Não encontrado";
        idPokemon.innerHTML = '';
        pesquisaPokemon = 0;
    }

    // limpa a caixa de pesquisa
    pesquisar.value = '';
};

form.addEventListener('submit', (event) => {
    // previne o comportamento padrão do formulário
    event.preventDefault();

    // mostra o pokemón pesquisado (replace remove os 0s a esquerda, caso a pesquisa seja feita pelo ID)
    renderPokemon(pesquisar.value.toLowerCase().replace(/^(0+)(\d)/g,"$2"));
});

btnAnterior.addEventListener('click', () => {
    if (pesquisaPokemon > 1) {
        pesquisaPokemon -= 1;
    } else {
        pesquisaPokemon = 1025;
    }

    renderPokemon(pesquisaPokemon);
});

btnProximo.addEventListener('click', () => {
    if (pesquisaPokemon > 0 && pesquisaPokemon < 1025) {
        pesquisaPokemon += 1;
    } else {
        pesquisaPokemon = 1;
    }

    renderPokemon(pesquisaPokemon);
});
