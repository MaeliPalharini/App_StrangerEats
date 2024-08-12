document.addEventListener('DOMContentLoaded', function() {
    const audio = document.querySelector('.stranger-audio');
    const playButton = document.querySelector('.play-button');
    let isPlaying = false;
    audio.volume = 1.0;

    audio.addEventListener('loadeddata', function() {
        playButton.disabled = false;
    });

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

    // Seleção de Itens
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
            botaoFinalizar.innerText = 'Fechar pedido';
            botaoFinalizar.addEventListener('click', mostrarConfirmacaoPedido);
        } else {
            botaoFinalizar.disabled = true;
            botaoFinalizar.classList.remove('habilitado');
            botaoFinalizar.innerText = 'Selecione os 3 itens para fechar o pedido';
        }
    }

    function mostrarConfirmacaoPedido() {
        const resumoPedido = document.querySelector('.resumo-pedido');
        const totalPedido = document.querySelector('.total-pedido');
        const confirmacaoPedido = document.querySelector('.confirmacao-pedido-oculto');
        const overlay = document.querySelector('.overlay');

        resumoPedido.innerHTML = '';
        let total = 0;

        ['pratos', 'bebidas', 'sobremesas'].forEach(categoria => {
            const itemSelecionado = document.querySelector(`.item[data-categoria="${categoria}"].selecionado`);
            const nome = itemSelecionado.querySelector('.nome').innerText;
            const preco = parseFloat(itemSelecionado.querySelector('.preco').innerText.replace('R$', ''));
            total += preco;

            const li = document.createElement('li');
            li.innerText = `${nome} - R$ ${preco.toFixed(2)}`;
            resumoPedido.appendChild(li);
        });

        totalPedido.innerText = `R$ ${total.toFixed(2)}`;
        overlay.classList.remove('oculto');  // Mostra a sobreposição
        confirmacaoPedido.classList.remove('oculto');

        document.querySelector('.confirmar-pedido').addEventListener('click', function() {
            alert('Pedido confirmado!');
            overlay.classList.add('oculto');  // Esconde a sobreposição
            confirmacaoPedido.classList.add('oculto');
        });

        document.querySelector('.cancelar-pedido').addEventListener('click', function() {
            overlay.classList.add('oculto');  // Esconde a sobreposição
            confirmacaoPedido.classList.add('oculto');
        });
    }
});
