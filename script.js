// Dicionário de Conteúdo (Escalabilidade)
const buttonConfig = {
    power: { title: "Energia", desc: "Liga ou desliga o sistema. No modo stand-by, consome energia mínima.", icon: "🔴" },
    btn1: { title: "Atalho Rosa", desc: "Configurado para abrir o streaming de música diretamente.", icon: "🌸" },
    btn2: { title: "Atalho Roxo", desc: "Acessa a biblioteca de vídeos e gravações salvas.", icon: "🔮" },
    btn3: { title: "Atalho Amarelo", desc: "Exibe o guia de programação completo na tela.", icon: "⭐" },
    up: { title: "Subir", desc: "Navega para o item acima na lista de menus.", icon: "⬆️" },
    down: { title: "Descer", desc: "Navega para o item abaixo na lista de menus.", icon: "⬇️" },
    left: { title: "Voltar", desc: "Retorna ao menu anterior ou move a seleção para esquerda.", icon: "⬅️" },
    right: { title: "Avançar", desc: "Avança no menu ou move a seleção para direita.", icon: "➡️" },
    ok: { title: "Confirmar", desc: "Pressionar para validar a escolha ou entrar em uma pasta.", icon: "✅" },
    volPlus: { title: "Aumentar Volume", desc: "Eleva o ganho de áudio do dispositivo.", icon: "🔊" },
    volMinus: { title: "Diminuir Volume", desc: "Reduz o ganho de áudio do dispositivo.", icon: "🔉" },
    chPlus: { title: "Próximo Canal", desc: "Sintoniza a próxima frequência disponível.", icon: "📺" },
    chMinus: { title: "Canal Anterior", desc: "Retorna para a frequência sintonizada anteriormente.", icon: "📺" },
    star: { title: "Favoritos", desc: "Mostra sua lista personalizada de canais preferidos.", icon: "🌟" }
};

const overlays = document.querySelectorAll('.overlay-btn');
const infoContent = document.getElementById('info-content');
const infoCard = document.getElementById('info-card');

// Função de Áudio Feedback (Sintetizado)
function playClickSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(500, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

// Lógica de atualização
overlays.forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        const data = buttonConfig[key];

        if (data) {
            // Animação de Feedback Visual no Card
            infoContent.classList.remove('fade-in');
            void infoContent.offsetWidth; // Force Reflow

            infoContent.innerHTML = `
                <span class="icon-display">${data.icon}</span>
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
            `;
            
            infoContent.classList.add('fade-in');
            infoCard.classList.remove('empty-state');
            
            playClickSound();
        }
    });
});