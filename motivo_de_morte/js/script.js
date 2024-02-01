const btn = document.getElementById('btn');

btn.addEventListener('click', function() {
    const inputName = document.getElementById('inputName');
    const name = document.getElementById('name');

    // transforma o primeiro caractere do nome em maiúsculo
    name.textContent = inputName.value.charAt(0).toUpperCase() + inputName.value.slice(1);

    // motivos de morte
    const deathReasons = [
    'foi atacado(a) por uma hiena',
    'se afogou',
    'foi picado(a) por uma cobra',
    'foi atropelado(a) por um caminhão',
    'passou fome',
    ];

    // escolhe o motivo da morte aleatoriamente
    const deathReason = deathReasons[Math.floor(Math.random() * deathReasons.length)];
    const deathReasonElement = document.getElementById('deathReason');

    deathReasonElement.textContent = `${inputName.value} morreu porque ${deathReason}.`;
});