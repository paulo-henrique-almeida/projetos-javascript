// adquirindo elementos
const resultado = document.getElementById('resultado');
const btnPesquisar = document.getElementById('btn-pesquisar');
const inputPesquisar = document.getElementById('input-pesquisar');
const containerPesquisa = document.querySelector('.pesquisar');

const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

btnPesquisar.addEventListener('click', pesquisarComida);

function pesquisarComida() {
    const pesquisa = inputPesquisar.value.trim();

    if (!pesquisa) {
        resultado.innerHTML = '<h3><i class="fa-solid fa-pencil"></i> Digite o nome de algum prato.</h3>';
        return;
    }

    fetch(apiUrl + pesquisa).then((response) => response.json()).then((dado) => {
        const prato = dado.meals[0];

        if (!prato) {
            resultado.innerHTML = '<h3><i class="fa-solid fa-ban"></i> Prato não encontrado.</h3>';
            return;
        }

        const ingredientes = obterIngredientes(prato);
        const receita = `
            <div class='detalhes'>
                <h2>${prato.strMeal}</h2>
                <h4>${prato.strArea}</h4>
            </div>

            <img src='${prato.strMealThumb}' alt='${prato.strMeal}'>

            <div id='container-ingrediente'>
                <h3>Ingredientes:</h3>
                <ul>${ingredientes}</ul>
            </div>

            <div id='receita'>
                <button id='btn-esconder-receita'><i class="fa-solid fa-xmark"></i></button>
                <pre id='intrucoes'>${prato.strInstructions}</pre>
            </div>

            <button id='btn-mostrar-receita'>Ver Receita</button>
        `;
        resultado.innerHTML = receita;

        const btnEsconderReceita = document.getElementById('btn-esconder-receita');
        btnEsconderReceita.addEventListener('click', esconderReceita);

        const btnMostrarReceita = document.getElementById('btn-mostrar-receita');
        btnMostrarReceita.addEventListener('click', mostrarReceita);
        containerPesquisa.style.opacity = '0';
        containerPesquisa.style.display = 'none';
    })
        .catch(() => {
            containerPesquisa.style.opacity = '1';
            containerPesquisa.style.display = 'grid';
            resultado.innerHTML = '<h3><i class="fa-solid fa-xmark"></i> Erro</h3>';
        });
}

function obterIngredientes(prato) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        const ingrediente = prato[`strIngredient${i}`];
        if (ingrediente) {
            const medida = prato[`strMeasure${i}`];
            ingredients += `<li>${medida} ${ingrediente}</li>`;
        } else {
            break;
        }
    };
    return ingredients;
};

function esconderReceita() {
    const receita = document.getElementById('receita');
    receita.style.display = 'none';
};

function mostrarReceita() {
    const receita = document.getElementById('receita');
    receita.style.display = 'block';
};