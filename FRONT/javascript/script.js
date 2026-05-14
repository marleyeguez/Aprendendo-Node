// Função responsavel por buscar os pedidos na API e exibir na tela
function listarPedidos() {
    // Buscando no HTML o elemento onde a lista será exibida
    const lista = document.getElementById('lista');

    // Limpa a lista antes de exibir os pedidos
    lista.innerHTML = "Carregando pedidos...";
      
   // Faz uma requisição para a API com a url dela publicada (ou local) 
    fetch(xxxxxxx) 
    // Converte a resposta da API para JSON
    .then(res = res.json())

    .then(resultado => {
        // Limpando a lista para preencher com os pedidos
        lista.innerHTML=""

        // Percorrendo o array de pedidos recebidos da API
        resultado.dados.forEach(pedido => {
            // Cria um item de lista para cada pedido
            const item = document.createElement("li");
            // Define como o texto será exivido na tela
            item.textContent = `${pedido.id} - ${pedido.cliente} | ${pedido.produto} | ${pedido.status}`;

            // Adiciona o item criado dentro da lista no HTML
            lista.appendChild(item);
        });
    })
    // Caso o front não consiga acessar a API para trazer os dados
    .catch(() => {
        lista.innerHTML = "Erro ao carregar pedidos"
    });
};

// Criar pedido (POST)
// Função responsavel por cadastrar um novo pedido

function cadastrarPedido() {
    // Pega os valores digitados nos inputs do HTML e depois limpa
    const cliente = document.getElementById('cliente').value;
    const produto = document.getElementById('produto').value;

    // Envia uma requisição POST para a API
    fetch(xxxxxxxx, {
    method: "POST",
    // Informa que os dados enviados estão no formato JSON
    headers: {
        'Content-Type': "application/JSON"
    },
    // Converte o objeto JavaScript em JSON para enviar no body
    body: JSON.stringify({
        id: Date.now(), // Incluir 
        cliente: cliente,
        produto: produto,
        status: "pendente"
    })
    })
    // Converte a resposta da API para JSON
    .then(() => {
        // Limpa os inputs após o envio do cadastro
        document.getElementById("cliente"),value = "";
        document.getElementById("cliente").value = "";
        
        // Atualizando a lista na tela
        listarPedidos();
    })
    // Alerta o usuario caso não seja possivel realizar o cadastro do pedido
    .catch(() => {
        alert("Erro ao cadastrar pedido")
    });
}

// Atualizar Pedido (PUT)
// Função responsavel por atualizar os status de um pedido
function atualizarPedido() {
    // Pega o id informado e o força a ser um numero
    const id = Number(document.getElementById("idAtualizar").value);
    // Pega o novo status do pedido digitado no input
    const status = document.getElementById("statusAtualizar").value;

    fetch(xxxxxxxx, {
        method: "PUT",
        header: {
            'Content-Type': 'application/JSON'
        },
        // Envia o ID e novo status do pedido
        body: JSON.stringify({
            id: id,
            status: status
        })
    })
    .then(res => res.json())

    // Depois que atualizar, buscará a lista novamente
    .them(() => {
        // Limpando os campos após o envio
        document.getElementById("idAtualizar").value = "";
        document.getElementById("statusAtualizar").value = ""
        // Reexive a lista atualizada
        listarPedidos()
    })
    // Alerta caso não seja possivel atualizar o pedido
    .catch(() => {
        alert("Erro ao atualizar")
    });
}

    // Removendo pedido
    // Função responsavel por cancelar um pedido
    function removerPedido() {
        // Pega o ID digitado
        const id = Number(document.getElementById("idRemover").value);

        fetch(xxxxxxx, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/JSON'
            },
            // Envia apenas o id do pedido que será removido
            body: JSON.stringify({
                id:id
            })
        })
        .then((res => res.json()))
        .then(() => {
            document.getElementById("idRemover").value = "";
            listarPedidos()
        })
        .catch(() => {
            alert("Erro ao cancelar o pedido");
        })
    }
    // Chama a função assim que a pagina carregar.
    //  Assim os pedidos já aparecem automaticamente na tela
    listarPedidos();