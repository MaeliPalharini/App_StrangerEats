document.addEventListener('DOMContentLoaded', function() {
    // Controle de Áudio
    const audio = document.getElementById('stranger-audio');
    const playButton = document.getElementById('play-button');
    let isPlaying = false;
    audio.volume = 1.0;

    audio.addEventListener('loadeddata', function() {
        playButton.disabled = false;
    });

    playButton.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = '<img src="assets/play.png" alt="Play">';
        } else {
            audio.play();
            playButton.innerHTML = '<img src="assets/pause.png" alt="Pause">';
        }
        isPlaying = !isPlaying;
    });

    // Seleção de Itens
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', function() {
            const categoria = this.getAttribute('data-categoria');

            // Remove a classe 'selecionado' de todos os itens da mesma categoria
            document.querySelectorAll(`.item[data-categoria="${categoria}"]`).forEach(el => {
                el.classList.remove('selecionado');
            });

            // Adiciona a classe 'selecionado' ao item clicado
            this.classList.add('selecionado');

            // Verifica se todos os itens necessários foram selecionados
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
        } else {
            botaoFinalizar.disabled = true;
            botaoFinalizar.classList.remove('habilitado');
        }
    }
});
