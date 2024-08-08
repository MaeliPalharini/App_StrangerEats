document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('stranger-audio');
    const playButton = document.getElementById('play-button');
    let isPlaying = false;

    playButton.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = '<img src="assets/play-icon.png" alt="Play">';
        } else {
            audio.play();
            playButton.innerHTML = '<img src="assets/pause-icon.png" alt="Pause">';
        }
        isPlaying = !isPlaying;
    });
});
