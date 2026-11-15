// 1. Elementos HTML utilizados na aplicação (DOM)
const entradaTarefa = document.getElementById("entrada-tarefa");
const botaoAdicionar = document.getElementById("btn-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const listaConcluidas = document.getElementById("lista-concluidas");
const totalTarefas = document.getElementById("total-tarefas");
const totalConcluidas = document.getElementById("total-concluidas");
const totalPendentes = document.getElementById("total-pendentes");

// Elementos do login
const modalLogin = document.getElementById("modal-login");
const formLogin = document.getElementById("form-login");
const inputUsuario = document.getElementById("input-usuario");
const inputSenha = document.getElementById("input-senha");
const msgErroLogin = document.getElementById("msg-erro-login");
const btnSair = document.getElementById("btn-sair");
const identificacaoUsuario = document.getElementById("identificacao-usuario");

// Login apenas DIDÁTICO. Em um sistema real, a senha seria verificada em um servidor.
const USUARIO_DEMO = "admin";
const SENHA_DEMO = "1234";

// 2. Salva um array de objetos com as tarefas no navegador (localStorage).
function salvarTarefas() {
    const tarefas = [];

    document.querySelectorAll("#lista-tarefas li, #lista-concluidas li").forEach(function (tarefa) {
        const checkbox = tarefa.querySelector("input[type='checkbox']");
        const texto = tarefa.querySelector(".texto-tarefa");

        tarefas.push({
            texto: texto.textContent,
            concluida: checkbox.checked
        });
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// 3. Atualiza os números da coluna lateral e as mensagens de listas vazias.
function atualizarContadores() {
    const tarefas = document.querySelectorAll("#lista-tarefas li, #lista-concluidas li");
    const concluidas = listaConcluidas.querySelectorAll("li");
    const pendentes = listaTarefas.querySelectorAll("li");

    totalTarefas.textContent = tarefas.length;
    totalConcluidas.textContent = concluidas.length;
    totalPendentes.textContent = pendentes.length;
    document.getElementById("vazio-pendentes").hidden = pendentes.length > 0;
    document.getElementById("vazio-concluidas").hidden = concluidas.length > 0;
}

// 4. Cria a tarefa e seus elementos dinamicamente com JavaScript.
function criarTarefa(texto, concluida = false) {
    const novaTarefa = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = concluida;
    checkbox.setAttribute("aria-label", "Marcar tarefa como concluída");

    const textoTarefa = document.createElement("span");
    textoTarefa.className = "texto-tarefa";
    textoTarefa.textContent = texto;

    const botoes = document.createElement("div");
    botoes.className = "botoes-acao";

    const botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.className = "btn-editar";
    botaoEditar.textContent = "Editar";

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.className = "btn-excluir";
    botaoExcluir.textContent = "Excluir";

    botoes.appendChild(botaoEditar);
    botoes.appendChild(botaoExcluir);
    novaTarefa.appendChild(checkbox);
    novaTarefa.appendChild(textoTarefa);
    novaTarefa.appendChild(botoes);

    // Atualização: move o mesmo elemento entre pendentes e concluídas.
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            listaConcluidas.appendChild(novaTarefa);
        } else {
            listaTarefas.appendChild(novaTarefa);
        }
        salvarTarefas();
        atualizarContadores();
    });

    // Edição: cria um campo temporário no mesmo item da lista.
    botaoEditar.addEventListener("click", function () {
        if (novaTarefa.querySelector(".input-edicao")) return;

        const inputEdicao = document.createElement("input");
        inputEdicao.type = "text";
        inputEdicao.className = "input-edicao";
        inputEdicao.maxLength = 150;
        inputEdicao.value = textoTarefa.textContent;
        inputEdicao.setAttribute("aria-label", "Editar texto da tarefa");

        textoTarefa.hidden = true;
        novaTarefa.insertBefore(inputEdicao, botoes);
        inputEdicao.focus();
        inputEdicao.select();

        let edicaoFinalizada = false;
        function finalizarEdicao(salvar = true) {
            if (edicaoFinalizada) return;
            edicaoFinalizada = true;

            if (salvar) {
                const novoTexto = inputEdicao.value.trim();
                if (novoTexto !== "") textoTarefa.textContent = novoTexto;
            }
            inputEdicao.remove();
            textoTarefa.hidden = false;
            if (salvar) salvarTarefas();
        }

        inputEdicao.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter") finalizarEdicao(true);
            if (evento.key === "Escape") finalizarEdicao(false);
        });
        inputEdicao.addEventListener("blur", function () {
            finalizarEdicao(true);
        });
    });

    // Exclusão: remove o elemento da página e atualiza o localStorage.
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

// 5. Recupera o array salvo e recria as tarefas ao abrir a página.
function carregarTarefas() {
    const dadosSalvos = localStorage.getItem("tarefas");
    let tarefasSalvas = [];
    try {
        tarefasSalvas = dadosSalvos ? JSON.parse(dadosSalvos) : [];
        if (!Array.isArray(tarefasSalvas)) tarefasSalvas = [];
    } catch (erro) {
        // Se o armazenamento estiver inválido, o aplicativo inicia com a lista vazia.
        tarefasSalvas = [];
    }

    tarefasSalvas.forEach(function (tarefa) {
        if (typeof tarefa === "string") {
            criarTarefa(tarefa, false);
        } else if (tarefa && typeof tarefa.texto === "string") {
            criarTarefa(tarefa.texto, tarefa.concluida === true);
        }
    });
}

// 6. Login demonstrativo (sessionStorage guarda apenas o usuário da sessão).
function abrirModalLogin() {
    modalLogin.hidden = false;
    msgErroLogin.hidden = true;
    formLogin.reset();
    inputUsuario.focus();
}

function fecharModalLogin() {
    modalLogin.hidden = true;
}

function verificarLogin() {
    const usuario = inputUsuario.value.trim();
    const senha = inputSenha.value;

    if (usuario === USUARIO_DEMO && senha === SENHA_DEMO) {
        sessionStorage.setItem("usuarioLogado", usuario);
        identificacaoUsuario.textContent = usuario;
        fecharModalLogin();
        entradaTarefa.focus();
    } else {
        msgErroLogin.hidden = false;
        inputSenha.value = "";
        inputSenha.focus();
    }
}

function sair() {
    sessionStorage.removeItem("usuarioLogado");
    abrirModalLogin();
}

function verificarSessao() {
    const usuarioAtivo = sessionStorage.getItem("usuarioLogado");
    if (usuarioAtivo === USUARIO_DEMO) {
        identificacaoUsuario.textContent = usuarioAtivo;
        fecharModalLogin();
    } else {
        sessionStorage.removeItem("usuarioLogado");
        abrirModalLogin();
    }
}

// 7. Eventos: adicionar pelo botão ou pela tecla Enter.
botaoAdicionar.addEventListener("click", function () {
    if (sessionStorage.getItem("usuarioLogado") !== USUARIO_DEMO) {
        abrirModalLogin();
        return;
    }
    const texto = entradaTarefa.value.trim();
    if (texto === "") return;

    criarTarefa(texto);
    salvarTarefas();
    atualizarContadores();
    entradaTarefa.value = "";
    entradaTarefa.focus();
});

entradaTarefa.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") botaoAdicionar.click();
});

formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();
    verificarLogin();
});

btnSair.addEventListener("click", sair);

// 8. Inicialização
carregarTarefas();
atualizarContadores();
verificarSessao();
