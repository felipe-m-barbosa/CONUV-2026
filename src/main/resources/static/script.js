
const API_URL = "/produtos";

const form = document.getElementById("produtoForm");
const campoId = document.getElementById("id");
const campoNome = document.getElementById("nome");
const campoDescricao = document.getElementById("descricao");
const campoPreco = document.getElementById("preco");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Exibe mensagens para o usuário
function exibirMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? "red" : "green";
}

// Faz a requisição HTTP e trata erros
async function requisitar(url, metodo = "GET", dados = null) {
    const opcoes = {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (dados !== null) {
        opcoes.body = JSON.stringify(dados);
    }

    const resposta = await fetch(url, opcoes);

    if (!resposta.ok) {
        const detalhe = await resposta.text();
        throw new Error(
            detalhe || `Erro HTTP ${resposta.status}`
        );
    }

    return resposta.json();
}

// Lista os produtos na tabela
function renderizarProdutos(produtos) {
    listaProdutos.replaceChildren();

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        function adicionarCelula(valor) {
            const celula = document.createElement("td");
            celula.textContent = valor ?? "";
            linha.appendChild(celula);
            return celula;
        }

        adicionarCelula(produto.id);
        adicionarCelula(produto.nome);
        adicionarCelula(produto.descricao);
        adicionarCelula(
            Number(produto.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        );

        const celulaAcoes = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.type = "button";
        btnEditar.addEventListener("click", () => editarProduto(produto));

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.type = "button";
        btnExcluir.addEventListener("click", () => excluirProduto(produto.id));

        celulaAcoes.append(btnEditar, btnExcluir);
        linha.appendChild(celulaAcoes);

        listaProdutos.appendChild(linha);
    });
}

// GET: consulta todos os produtos
async function carregarProdutos() {
    try {
        const produtos = await requisitar(API_URL);
        renderizarProdutos(produtos);
    } catch (erro) {
        exibirMensagem(
            `Erro ao carregar produtos: ${erro.message}`,
            true
        );
    }
}

// Preenche o formulário para editar um produto
function editarProduto(produto) {
    campoId.value = produto.id;
    campoNome.value = produto.nome;
    campoDescricao.value = produto.descricao ?? "";
    campoPreco.value = produto.preco;

    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;

    exibirMensagem(`Editando o produto ${produto.nome}.`);
    campoNome.focus();
}

// Limpa o formulário e cancela a edição
function limparFormulario() {
    form.reset();
    campoId.value = "";

    btnSalvar.textContent = "Cadastrar";
    btnCancelar.hidden = true;
}

// POST: cadastra; PUT: atualiza
form.addEventListener("submit", async evento => {
    evento.preventDefault();

    const id = campoId.value;

    const produto = {
        nome: campoNome.value.trim(),
        descricao: campoDescricao.value.trim(),
        preco: Number(campoPreco.value)
    };

    if (id) {
        produto.id = Number(id);
    }

    try {
        const produtos = await requisitar(
            API_URL,
            id ? "PUT" : "POST",
            produto
        );

        renderizarProdutos(produtos);
        limparFormulario();

        exibirMensagem(
            id
                ? "Produto atualizado com sucesso!"
                : "Produto cadastrado com sucesso!"
        );
    } catch (erro) {
        exibirMensagem(
            `Erro ao salvar produto: ${erro.message}`,
            true
        );
    }
});

// DELETE: exclui um produto pelo ID
async function excluirProduto(id) {
    if (!confirm("Deseja realmente excluir este produto?")) {
        return;
    }

    try {
        const produtos = await requisitar(
            `${API_URL}/${id}`,
            "DELETE"
        );

        renderizarProdutos(produtos);

        if (campoId.value === String(id)) {
            limparFormulario();
        }

        exibirMensagem("Produto excluído com sucesso!");
    } catch (erro) {
        exibirMensagem(
            `Erro ao excluir produto: ${erro.message}`,
            true
        );
    }
}

// Botão para cancelar a edição
btnCancelar.addEventListener("click", () => {
    limparFormulario();
    exibirMensagem("Edição cancelada.");
});

// Carrega os produtos ao abrir a página
carregarProdutos();
