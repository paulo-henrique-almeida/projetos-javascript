function gerar() {
    const frases = [
        "A vida é uma viagem ao desconhecido.",
        "O sucesso é a soma de pequenos esforços, repetidos dia após dia.",
        "O fracasso é apenas uma oportunidade de começar de novo de forma mais inteligente.",
        "O verdadeiro sucesso vem de superar os obstáculos, não de evitá-los.",
        "Nunca é tarde demais para ser o que você poderia ter sido.",
        "São das pessoas que ninguém espera nada que surgem as coisas que ninguém imaginava."
    ];

    const aleatorio = Math.floor(Math.random() * frases.length);
    const fraseAleatoria = frases[aleatorio];

    document.getElementById("gerador").innerHTML = `"${fraseAleatoria}"`;
}