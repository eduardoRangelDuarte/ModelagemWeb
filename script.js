const entradaTarefa = document.getElementById("entrada-tarefa");
const botaoAdicionar = document.getElementById("btn-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const listaConcluidas = document.getElementById("lista-concluidas");
const totalTarefas = document.getElementById("total-tarefas");
const totalConcluidas = document.getElementById("total-concluidas");

function salvarTarefas() {
    const tarefas = [];

    document.querySelectorAll("#lista-tarefas li, #lista-concluidas li").forEach(function (tarefa) {
        const checkbox = tarefa.querySelector("input");
        const texto = tarefa.querySelector(".texto-tarefa");

        tarefas.push({
            texto: texto.textContent,
            concluida: checkbox.checked
        });
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function atualizarContadores() {
    const tarefas = document.querySelectorAll("#lista-tarefas li, #lista-concluidas li");
    const concluidas = listaConcluidas.querySelectorAll("li");

    totalTarefas.textContent = tarefas.length;
    totalConcluidas.textContent = concluidas.length;
}

function criarTarefa(texto, concluida = false) {
    const novaTarefa = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = concluida;

    const textoTarefa = document.createElement("span");
    textoTarefa.className = "texto-tarefa";
    textoTarefa.textContent = texto;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    novaTarefa.appendChild(checkbox);
    novaTarefa.appendChild(textoTarefa);
    novaTarefa.appendChild(botaoExcluir);

    if (checkbox.checked) {
        novaTarefa.style.textDecoration = "line-through";
    }

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            novaTarefa.style.textDecoration = "line-through";
            listaConcluidas.appendChild(novaTarefa);
        } else {
            novaTarefa.style.textDecoration = "none";
            listaTarefas.appendChild(novaTarefa);
        }

        salvarTarefas();
        atualizarContadores();
    });

    botaoExcluir.addEventListener("click", function () {
        novaTarefa.remove();
        salvarTarefas();
        atualizarContadores();
    });

    if (concluida) {
        listaConcluidas.appendChild(novaTarefa);
    } else {
        listaTarefas.appendChild(novaTarefa);
    }
}

function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefasSalvas.forEach(function (tarefa) {
        if (typeof tarefa === "string") {
            criarTarefa(tarefa);
        } else {
            criarTarefa(tarefa.texto, tarefa.concluida);
        }
    });
}

botaoAdicionar.addEventListener("click", function () {
    const texto = entradaTarefa.value.trim();

    if (texto === "") {
        return;
    }

    criarTarefa(texto);
    salvarTarefas();
    atualizarContadores();

    entradaTarefa.value = "";
    entradaTarefa.focus();
});

entradaTarefa.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        botaoAdicionar.click();
    }
});

carregarTarefas();
atualizarContadores();