document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('stranger-audio');
    const playButton = document.getElementById('play-button');
    let isPlaying = false;

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
});


// Seleção de itens
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
        const categorias = ['pratos', 'bebidas', 'sobremesas']; // IDs ou categorias que você definiu
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





