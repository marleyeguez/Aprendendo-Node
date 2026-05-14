// 1 passo: Criação do servidor
// 2 passo: Exibir rota e método requirido
// 3 passo: Atribuir o metodo GET
// 4 passo: Atribuir o metodo POST
// 5 passo: Atribuir o metodo PUT
// 6 passo: Atribuir o metodo DELETE
// 7 passo: Ajuste para o consumo da API

// Importando o módulo http nativo do Node.js
const http = require('http');
// Importando o módulo url nativo do Node.js
const url = require('url');

// Simulando um banco de daos com um array de objetos em JavaScript
let pedidos = [
{
    id: 1,
    cliente: "Fernanda",
    produto: "Tenis",
    status: "pendente"
}
]

// Criação do servidor "server"
const server = http.createServer((req,res) => {
    // Definindo a resposta do servidor como uma aplicação JSON
    res.setHeader('Content-Type', 'application/JSON');

    // Leitura da URL
    const urlCompleta = url.parse(req.url, true);

    // Recebendo os dados de rota e método através da URL
    const rota = urlCompleta.pathname;
    const metodo = req.method;

    // Liberação do CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if(metodo === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    };


    // Criação do método GET
    // Com a condição para que a URL tenha /pedidos e o mesmo seja o GET
    //  para que uma resposta especifica
    if(rota === "/pedidos" && metodo === "GET" ) {
        // Resposta que será exibida para o usuario
        res.end(JSON.stringify({
            mensagem: "Lista de Pedidos",
            dados: pedidos
        }));
        return; // Finaliza a requisição
    };

    // Criação do método POST
    if(rota === "/pedidos" && metodo === "POST") {
        // Variavel body que irá armazenar todas as partes de conteúdo enviados pela
        // requisição
        let body = ''

        // .on = ação
        // Ao disparo da requisição, ação referente ao armazenamento dentro do body ira acontecer.
        req.on('data', parte => {
            body += parte; //Acumulo das partes na variavel body
        });

        // .on = ação
        // No disparo da função, após o armazenamento das partes no body,
        // damos inicio a ação final para processamento
        req.on('end', () => {
            // novoPedido irá armazenar o conteúdo de body traduzido para um objeto JavaScript
            const novoPedido = JSON.parse(body);

            // Incluindo o novoPedido no nosso array de pedidos
            pedidos.push(novoPedido);

            res.statusCode = 201; // Criado com sucesso

            res.end(JSON.stringify({
                mensagem: "Pedido cadastrado com sucesso",
                pedido: novoPedido
            }));
        });
        return; // Encerra a requisição
    };

    // Criação do metodo PUT
    if (rota === "/pedidos" && metodo === "PUT") {
        let body = ''; // Variavel que armazena os pedaços da requisição
        // Ação que será disparada com a requisiçaõ para armazenar as partes da requisição dentro da variável body
 
        req.on('data', parte => {
            body += parte;
        });
 
        req.on('end', () => {
            // A variavel dados receberá a tradução do body em objeto Javascript
            const dados = JSON.parse(body);
            let encontrado = false; // facilitará o servidor a encontrar o id correspondente
 
            // pedidos esta recebendo o mapeamento do array pedidos
            // pedido (no singular) = cada objeto do array
            pedidos = pedidos.map(pedido => {
                // Comparação de ID para ser possivel substituir
                if (pedido.id === dados.id) {
                    encontrado = true; // Quando localizado, vira true
                    // Retronara todos os dados de pedidos que não foram alterados + status de cada um deles
 
                    return {
                        ...pedido,
                        status: dados.status
                    };
                };
                return pedido;
            });
 
            // Caso o pedidos não seja encontrado (exemplo: buscar o id 5 , que não existe), será retornado o statusCode 404 e uma mensagem de pedido não encontrado
            if (!encontrado) {
                res.statusCode = 404;
                res.end(JSON.stringify({mensagem: "Pedido não encontrado"}));
                return;
            };
            // Resposta final para o usuário, com o pedido localizado e atualizado via requisição PUT
            res.end(JSON.stringify({
                mensagem: "Pedido atualizado com sucesso",
                dados: pedidos
            }));
        });
        return;
    };

    // Criação do método DELETE
    if(rota === "/pedidos" && metodo === "DELETE") {
        let body = ''; // variável que armazena os pedaços da requisição
        // ação que será disparada com a requisição para armazenar as partes da requisição dentro da variável body
        req.on('data', parte => {
            body += parte;
        });
 
        req.on('end', () => {
            // dados receberá o body traduzido para objeto em JavaScript
            const dados = JSON.parse(body);
 
            // Medirá o tamanho do array antes de o deletar-mos
            const tamanhoAntes = pedidos.length;
 
            // Manterá todos os pedidos que NÃO tem o id informado e removerá os que tem o ID igual ao enviado pela requisição.
            pedidos = pedidos.filter(pedido => pedido.id !== dados.id);
 
            // Fará a comparação de tamanho do array, se os tamanhos estiverem identidos, o pedido não foi localizado para que seja apagado.
            if(pedidos.length === tamanhoAntes) {
                res.statusCode = 404;
                res.end(JSON.stringify({ mensagem: "Pedido não encontrado"}));
                return;
            };
 
            // Reposta final que exibe o pedido removido com sucesso e exibe o array atualizado
            res.end(JSON.stringify({
                mensagem: "Pedido removido",
                dados: pedidos
            }));
        });
        return;
    };



    res.statusCode = 404; // Not found = Não encontrado
    // Resposta para o usuario caso ele busque uma rota inexistente
    res.end(JSON.stringify({
        mensagem: 'Página não encontrada'
    }));
});

const PORT = process.env.PORT || 3000
// Definição da porta onde o servidor rodará
server.listen(PORT, () => {
    console.log(`Server its running on the door ${PORT}`)
});