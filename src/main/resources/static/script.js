// Controle de Abas
function mudarAba(aba) {
    document.querySelectorAll('.secao-aba').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(`secao-${aba}`).style.display = 'block';
    event.currentTarget.classList.add('active');

    if (aba === 'vendas') {
        carregarOpcoesVendas();
        carregarVendas();
    }
}

const mensagem = document.getElementById("mensagem");

function exibirMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? "red" : "green";
}

async function requisitar(url, metodo = "GET", dados = null) {
    const opcoes = {
        method: metodo,
        headers: { "Content-Type": "application/json" }
    };
    if (dados !== null) opcoes.body = JSON.stringify(dados);
    const resposta = await fetch(url, opcoes);
    if (!resposta.ok) {
        const detalhe = await resposta.text();
        throw new Error(detalhe || `Erro HTTP ${resposta.status}`);
    }
    return resposta.json();
}

// --- PRODUTOS ---
const produtoForm = document.getElementById("produtoForm");
const prodId = document.getElementById("produto-id");
const prodNome = document.getElementById("produto-nome");
const prodDesc = document.getElementById("produto-descricao");
const prodPreco = document.getElementById("produto-preco");
const btnSalvarProd = document.getElementById("btnSalvarProduto");
const btnCancelarProd = document.getElementById("btnCancelarProduto");
const listaProdutos = document.getElementById("listaProdutos");

function renderizarProdutos(produtos) {
    listaProdutos.replaceChildren();
    produtos.forEach(produto => {
        const linha = document.createElement("tr");
        [produto.id, produto.nome, produto.descricao, Number(produto.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })].forEach(val => {
            const td = document.createElement("td");
            td.textContent = val ?? "";
            linha.appendChild(td);
        });

        const tdAcoes = document.createElement("td");
        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Editar";
        btnEdit.type = "button";
        btnEdit.onclick = () => {
            prodId.value = produto.id;
            prodNome.value = produto.nome;
            prodDesc.value = produto.descricao ?? "";
            prodPreco.value = produto.preco;
            btnSalvarProd.textContent = "Salvar alterações";
            btnCancelarProd.hidden = false;
        };

        const btnDel = document.createElement("button");
        btnDel.textContent = "Excluir";
        btnDel.type = "button";
        btnDel.onclick = async () => {
            if (confirm("Excluir produto?")) {
                renderizarProdutos(await requisitar(`/produtos/${produto.id}`, "DELETE"));
                exibirMensagem("Produto excluído!");
            }
        };

        tdAcoes.append(btnEdit, btnDel);
        linha.appendChild(tdAcoes);
        listaProdutos.appendChild(linha);
    });
}

async function carregarProdutos() {
    try { renderizarProdutos(await requisitar("/produtos")); } catch(e) { exibirMensagem(e.message, true); }
}

produtoForm.addEventListener("submit", async e => {
    e.preventDefault();
    const id = prodId.value;
    const produto = { nome: prodNome.value.trim(), descricao: prodDesc.value.trim(), preco: Number(prodPreco.value) };
    if (id) produto.id = Number(id);
    try {
        renderizarProdutos(await requisitar("/produtos", id ? "PUT" : "POST", produto));
        produtoForm.reset();
        prodId.value = "";
        btnSalvarProd.textContent = "Cadastrar Produto";
        btnCancelarProd.hidden = true;
        exibirMensagem("Produto salvo com sucesso!");
    } catch(err) { exibirMensagem(err.message, true); }
});

btnCancelarProd.addEventListener("click", () => {
    produtoForm.reset();
    prodId.value = "";
    btnSalvarProd.textContent = "Cadastrar Produto";
    btnCancelarProd.hidden = true;
});


// --- CLIENTES ---
const clienteForm = document.getElementById("clienteForm");
const cliId = document.getElementById("cliente-id");
const cliNome = document.getElementById("cliente-nome");
const cliEmail = document.getElementById("cliente-email");
const cliTel = document.getElementById("cliente-telefone");
const btnSalvarCli = document.getElementById("btnSalvarCliente");
const btnCancelarCli = document.getElementById("btnCancelarCliente");
const listaClientes = document.getElementById("listaClientes");

function renderizarClientes(clientes) {
    listaClientes.replaceChildren();
    clientes.forEach(cliente => {
        const linha = document.createElement("tr");
        [cliente.id, cliente.nome, cliente.email, cliente.telefone].forEach(val => {
            const td = document.createElement("td");
            td.textContent = val ?? "";
            linha.appendChild(td);
        });

        const tdAcoes = document.createElement("td");
        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Editar";
        btnEdit.type = "button";
        btnEdit.onclick = () => {
            cliId.value = cliente.id;
            cliNome.value = cliente.nome;
            cliEmail.value = cliente.email;
            cliTel.value = cliente.telefone ?? "";
            btnSalvarCli.textContent = "Salvar alterações";
            btnCancelarCli.hidden = false;
        };

        const btnDel = document.createElement("button");
        btnDel.textContent = "Excluir";
        btnDel.type = "button";
        btnDel.onclick = async () => {
            if (confirm("Excluir cliente?")) {
                renderizarClientes(await requisitar(`/clientes/${cliente.id}`, "DELETE"));
                exibirMensagem("Cliente excluído!");
            }
        };

        tdAcoes.append(btnEdit, btnDel);
        linha.appendChild(tdAcoes);
        listaClientes.appendChild(linha);
    });
}

async function carregarClientes() {
    try { renderizarClientes(await requisitar("/clientes")); } catch(e) { exibirMensagem(e.message, true); }
}

clienteForm.addEventListener("submit", async e => {
    e.preventDefault();
    const id = cliId.value;
    const cliente = { nome: cliNome.value.trim(), email: cliEmail.value.trim(), telefone: cliTel.value.trim() };
    if (id) cliente.id = Number(id);
    try {
        renderizarClientes(await requisitar("/clientes", id ? "PUT" : "POST", cliente));
        clienteForm.reset();
        cliId.value = "";
        btnSalvarCli.textContent = "Cadastrar Cliente";
        btnCancelarCli.hidden = true;
        exibirMensagem("Cliente salvo com sucesso!");
    } catch(err) { exibirMensagem(err.message, true); }
});

btnCancelarCli.addEventListener("click", () => {
    clienteForm.reset();
    cliId.value = "";
    btnSalvarCli.textContent = "Cadastrar Cliente";
    btnCancelarCli.hidden = true;
});


// --- VENDAS ---
const vendaForm = document.getElementById("vendaForm");
const vendaId = document.getElementById("venda-id");
const clienteSelect = document.getElementById("venda-cliente");
const produtoSelect = document.getElementById("venda-produto");
const vendaQtd = document.getElementById("venda-quantidade");
const btnSalvarVenda = document.getElementById("btnSalvarVenda");
const btnCancelarVenda = document.getElementById("btnCancelarVenda");
const listaVendas = document.getElementById("listaVendas");

async function carregarOpcoesVendas() {
    try {
        const clientes = await requisitar("/clientes");
        clienteSelect.innerHTML = '<option value="">Selecione um cliente</option>';
        clientes.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.id;
            opt.textContent = c.nome;
            clienteSelect.appendChild(opt);
        });

        const produtos = await requisitar("/produtos");
        produtoSelect.innerHTML = '<option value="">Selecione um produto</option>';
        produtos.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.id;
            opt.textContent = `${p.nome} (R$ ${p.preco.toFixed(2)})`;
            produtoSelect.appendChild(opt);
        });
    } catch (e) { exibirMensagem(e.message, true); }
}

function renderizarVendas(vendas) {
    listaVendas.replaceChildren();
    vendas.forEach(venda => {
        const linha = document.createElement("tr");
        [
            venda.id, 
            venda.cliente?.nome, 
            venda.produto?.nome, 
            venda.quantidade, 
            Number(venda.valorTotal).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        ].forEach(val => {
            const td = document.createElement("td");
            td.textContent = val ?? "";
            linha.appendChild(td);
        });

        const tdAcoes = document.createElement("td");
        
        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Editar";
        btnEdit.type = "button";
        btnEdit.onclick = () => {
            vendaId.value = venda.id;
            clienteSelect.value = venda.cliente?.id ?? "";
            produtoSelect.value = venda.produto?.id ?? "";
            vendaQtd.value = venda.quantidade;
            btnSalvarVenda.textContent = "Salvar alterações";
            btnCancelarVenda.hidden = false;
        };

        const btnDel = document.createElement("button");
        btnDel.textContent = "Excluir";
        btnDel.type = "button";
        btnDel.onclick = async () => {
            if (confirm("Excluir venda?")) {
                renderizarVendas(await requisitar(`/vendas/${venda.id}`, "DELETE"));
                exibirMensagem("Venda excluída!");
            }
        };

        tdAcoes.append(btnEdit, btnDel);
        linha.appendChild(tdAcoes);
        listaVendas.appendChild(linha);
    });
}

async function carregarVendas() {
    try { renderizarVendas(await requisitar("/vendas")); } catch(e) { exibirMensagem(e.message, true); }
}

vendaForm.addEventListener("submit", async e => {
    e.preventDefault();
    const id = vendaId.value;
    const venda = {
        cliente: { id: Number(clienteSelect.value) },
        produto: { id: Number(produtoSelect.value) },
        quantidade: Number(vendaQtd.value)
    };
    if (id) venda.id = Number(id);

    try {
        renderizarVendas(await requisitar("/vendas", id ? "PUT" : "POST", venda));
        vendaForm.reset();
        vendaId.value = "";
        vendaQtd.value = "1";
        btnSalvarVenda.textContent = "Registrar Venda";
        btnCancelarVenda.hidden = true;
        exibirMensagem("Venda salva com sucesso!");
    } catch(err) { exibirMensagem(err.message, true); }
});

btnCancelarVenda.addEventListener("click", () => {
    vendaForm.reset();
    vendaId.value = "";
    vendaQtd.value = "1";
    btnSalvarVenda.textContent = "Registrar Venda";
    btnCancelarVenda.hidden = true;
});

// Inicialização automática ao carregar a página
carregarProdutos();
carregarClientes();