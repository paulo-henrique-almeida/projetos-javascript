function lerJson() {
    const json = document.getElementById('json').value;

    try {
        const objetoJson = JSON.parse(json);
        document.getElementById('ver-json').innerHTML = '';
        construirTree(objetoJson, document.getElementById('ver-json'), 'principal');
    } catch (e) {
        document.getElementById('ver-json').innerHTML = '<p class="vermelho">JSON inválido.</p>';
    }
}

function construirTree(objeto, elemento, key) {
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.flexDirection = 'column';
    elemento.appendChild(item);

    if (typeof objeto === 'object' && objeto !== null) {
        const spanKey = document.createElement('span');
        spanKey.className = 'key collapsible';
        spanKey.textContent = key + ': ';

        item.appendChild(spanKey);

        const containerChild = document.createElement('div');
        containerChild.className = 'esconder ' + (Array.isArray(objeto) ? 'array' : 'object');
        item.appendChild(containerChild);

        for (const keyChild in objeto) {
            construirTree(objeto[keyChild], containerChild, keyChild);
        }

        spanKey.onclick = function (evento) {
            evento.stopPropagation();
            const divChild = this.nextElementSibling;
            if (divChild.style.display === 'none') {
                divChild.style.display = 'block';
                this.classList.add('collapsed');
            } else {
                divChild.style.display = 'none';
                this.classList.remove('collapsed');
            }
        };
    } else {
        const content = document.createElement('div');
        content.innerHTML = '<span class="key"> ' + key + ':</span>' +
            '<span class="' + checarTipo(objeto) + '">' + objeto + '</span>';
        item.appendChild(content);
    }
}

function checarTipo(valor) {
    if (typeof valor === 'string') return 'string';
    if (typeof valor === 'number') return 'number';
    if (typeof valor === 'boolean') return 'boolean';
    if (Array.isArray(valor)) return 'array';
    if (typeof valor === 'object' && valor !== null) return 'object';
    return 'unknown';
}

document.getElementById('arquivo-json').addEventListener('change', function (evento) {
    const arquivo = evento.target.files[0];
    if (!arquivo) {
        return;
    }

    let leitor = new FileReader();
    leitor.onload = function (evento) {
        const contArquivo = evento.target.result;

        document.getElementById('json').value = contArquivo;

        lerJson();
    };
    leitor.readAsText(arquivo);
});
