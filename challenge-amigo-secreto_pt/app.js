let listaDeAmigos = [];
let resultadoSorteio = [];

function adicionarAmigo() {
    let inputAmigo = document.getElementById("amigo");
    let nomeDigitado = inputAmigo.value.trim();

    if (nomeDigitado === "") {
        alert("Por favor, insira um nome.");
        return;
    }

    //verificação de nomes duplicados
    let contador = 0;
    while (contador < listaDeAmigos.length) {
        if (listaDeAmigos[contador].toLowerCase() === nomeDigitado.toLowerCase()) {
            alert("Esse nome já foi adicionado.");
            inputAmigo.value = "";
            return;
        }
        contador = contador + 1;
    }

    listaDeAmigos.push(nomeDigitado);
    inputAmigo.value = "";

    mostrarListaDeAmigos();
}

function mostrarListaDeAmigos() {
    let listaHTML = document.getElementById("listaAmigos");
    listaHTML.innerHTML = "";

    let contadorAmigos = 0;
    while (contadorAmigos < listaDeAmigos.length) {
        listaHTML.innerHTML = listaHTML.innerHTML + "<li>" + listaDeAmigos[contadorAmigos] + "</li>";
        contadorAmigos = contadorAmigos + 1;
    }
}

function sortearAmigos() {
    if (listaDeAmigos.length < 3) {
        alert("Adicione pelo menos 3 amigos.");
        return;
    }

    resultadoSorteio = [];

    //cria uma cópia da lista de amigos
    let amigosDisponiveisParaSorteio = [];
    let contadorCopia = 0;
    while (contadorCopia < listaDeAmigos.length) {
        amigosDisponiveisParaSorteio.push(listaDeAmigos[contadorCopia]);
        contadorCopia = contadorCopia + 1;
    }

    //sorteio de cada amigo
    let contadorAmigos = 0;
    while (contadorAmigos < listaDeAmigos.length) {
        let indiceSorteado = Math.floor(Math.random() * amigosDisponiveisParaSorteio.length);
        let amigoSorteado = amigosDisponiveisParaSorteio[indiceSorteado];

        //garante que ninguém tire a si mesmo
        while (amigoSorteado === listaDeAmigos[contadorAmigos]) {
            indiceSorteado = Math.floor(Math.random() * amigosDisponiveisParaSorteio.length);
            amigoSorteado = amigosDisponiveisParaSorteio[indiceSorteado];
        }

        resultadoSorteio.push(amigoSorteado);

        //tira o amigo sorteado da lista disponível
        let novaListaDisponiveis = [];
        let contadorLista = 0;
        while (contadorLista < amigosDisponiveisParaSorteio.length) {
            if (amigosDisponiveisParaSorteio[contadorLista] !== amigoSorteado) {
                novaListaDisponiveis.push(amigosDisponiveisParaSorteio[contadorLista]);
            }
            contadorLista = contadorLista + 1;
        }
        amigosDisponiveisParaSorteio = novaListaDisponiveis;

        contadorAmigos = contadorAmigos + 1;
    }

    alert("Sorteio realizado! Agora você pode ver o amigo secreto de cada pessoa.");
    atualizarBotoesDeVisualizacao();
}

function verAmigoSecreto(nomeDoAmigo) {
    let resultadoHTML = document.getElementById("resultado");
    let contador = 0;
    while (contador < listaDeAmigos.length) {
        if (listaDeAmigos[contador] === nomeDoAmigo) {
            resultadoHTML.innerHTML = nomeDoAmigo + " tirou " + resultadoSorteio[contador];
        }
        contador = contador + 1;
    }
}

function atualizarBotoesDeVisualizacao() {
    let containerDeBotoes = document.getElementById("botoesAmigos");
    containerDeBotoes.innerHTML = "";

    let contador = 0;
    while (contador < listaDeAmigos.length) {
        containerDeBotoes.innerHTML = containerDeBotoes.innerHTML +
            '<button onclick="verAmigoSecreto(\'' + listaDeAmigos[contador] + '\')">' +
            'Ver amigo secreto de ' + listaDeAmigos[contador] +
            '</button>';
        contador = contador + 1;
    }
}
