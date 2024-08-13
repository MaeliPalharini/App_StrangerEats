// Musiquinha para o climax das compras
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.querySelector('#stranger-audio');
    const playButton = document.querySelector('.play-button');
    let isPlaying = false;
    audio.volume = 1.0;

    audio.addEventListener('loadeddata', function() {
        playButton.disabled = false;
    });

    audio.loop = true;

    playButton.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = '<img src="assets/pause.png" alt="Pause">';
        } else {
            audio.play();
            playButton.innerHTML = '<img src="assets/play.png" alt="Play">';
        }
        isPlaying = !isPlaying;
    });

    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', function() {
            const categoria = this.getAttribute('data-categoria');
            document.querySelectorAll(`.item[data-categoria="${categoria}"]`).forEach(el => {
                el.classList.remove('selecionado');
            });
            this.classList.add('selecionado');
            verificarItensSelecionados();
        });
    });

    function verificarItensSelecionados() {
        const categorias = ['pratos', 'bebidas', 'sobremesas'];
        let todasSelecionadas = true;

        categorias.forEach(categoria => {
            const selecionado = document.querySelector(`.item[data-categoria="${categoria}"].selecionado`);
            if (!selecionado) {
                todasSelecionadas = false;
            }
        });

        const botaoFinalizar = document.querySelector('.botao-finalizar');
        if (todasSelecionadas) {
            botaoFinalizar.disabled = false;
            botaoFinalizar.classList.add('habilitado');
            botaoFinalizar.innerHTML = '<span>Fechar pedido</span>';
        } else {
            botaoFinalizar.disabled = true;
            botaoFinalizar.classList.remove('habilitado');
            botaoFinalizar.innerHTML = '<span>Selecione os 3 itens <br> para fechar o pedido</span>';
        }
    }

    function mostrarConfirmacaoPedido() {
        const resumoPedido = document.querySelector('.resumo-pedido');
        const totalPedido = document.querySelector('.total-pedido');
        const confirmacaoPedido = document.querySelector('.confirmacao-pedido');
        const overlay = document.querySelector('.overlay');

        resumoPedido.innerHTML = '';
        let total = 0;

        ['pratos', 'bebidas', 'sobremesas'].forEach(categoria => {
            const itemSelecionado = document.querySelector(`.item[data-categoria="${categoria}"].selecionado`);
            if (itemSelecionado) {
                const nome = itemSelecionado.querySelector('.nome').innerText;
                const preco = parseFloat(itemSelecionado.querySelector('.preco').innerText.replace('R$', ''));
                total += preco;

                const li = document.createElement('li');
                li.innerText = `${nome} - R$ ${preco.toFixed(2)}`;
                resumoPedido.appendChild(li);
            }
        });

        totalPedido.innerText = `R$ ${total.toFixed(2)}`;
        overlay.classList.remove('oculto');  // Mostra a sobreposição
        confirmacaoPedido.classList.remove('oculto');

        document.querySelector('.confirmar-pedido').addEventListener('click', function () {
            // Solicita o nome e endereço do usuário
            const nomeUsuario = prompt("Por favor, insira seu nome:");
            const enderecoUsuario = prompt("Por favor, insira seu endereço:");

            if (nomeUsuario && enderecoUsuario) {
                // Exibe a mensagem de agradecimento
                alert("Pedido confirmado!");

                // Mostra a interface de finalização do pedido e envia mensagem pelo WhatsApp
                confirmacaoPedido.classList.add('oculto')
                mostrarAgradecimento(nomeUsuario, enderecoUsuario);
            } else {
                alert("Por favor, preencha todas as informações para finalizar o pedido.");
            }
        });

        document.querySelector('.cancelar-pedido').addEventListener('click', function () {
            overlay.classList.add('oculto');  // Esconde a sobreposição
            confirmacaoPedido.classList.add('oculto');
        });
    }

    function mostrarAgradecimento(nomeUsuario, enderecoUsuario) {
        const overlay = document.querySelector('.overlay');
        const finalizacaoPedido = document.querySelector('.finalizacao-pedido');
        const itensSelecionados = document.querySelectorAll('.item.selecionado');

        // Exibe a interface de finalização do pedido
        finalizacaoPedido.style.display = 'flex';
        overlay.classList.remove('oculto');

        // Mensagem para o WhatsApp
        const pratos = document.querySelector('.item[data-categoria="pratos"].selecionado .nome').innerText;
        const bebidas = document.querySelector('.item[data-categoria="bebidas"].selecionado .nome').innerText;
        const sobremesas = document.querySelector('.item[data-categoria="sobremesas"].selecionado .nome').innerText;
        const total = parseFloat(document.querySelector('.total-pedido').innerText.replace('R$', '')).toFixed(2);

        let mensagem = `Olá, gostaria de fazer o pedido:\n\n`;
        mensagem += `- Prato: ${pratos}\n`;
        mensagem += `- Bebida: ${bebidas}\n`;
        mensagem += `- Sobremesa: ${sobremesas}\n\n`;
        mensagem += `Total: R$ ${total}\n\n`;
        mensagem += `Nome: ${nomeUsuario}\n`;
        mensagem += `Endereço: ${enderecoUsuario}`;

        const mensagemCodificada = encodeURIComponent(mensagem);

        const numeroRestaurante = '5511950534906';

        const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroRestaurante}&text=${mensagemCodificada}`;

        // Abre o WhatsApp em uma nova aba
        window.open(urlWhatsApp, '_blank');

        // Adiciona evento ao botão "Ainda tem fome?"
        document.querySelector('.botao-retorno').addEventListener('click', function() {
            finalizacaoPedido.style.display = 'none';
            overlay.classList.add('oculto');
            itensSelecionados.forEach((item)=>{
                item.classList.remove('selecionado')
            });
            verificarItensSelecionados()
        });
    }

    const botaoFinalizar = document.querySelector('.botao-finalizar');
    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', mostrarConfirmacaoPedido);
    }
});
