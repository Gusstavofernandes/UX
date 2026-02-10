function mostrarInfo(titulo, descricao) {
    const box = document.getElementById("descricao");
    const linha = document.getElementById("linha");
    const svg = document.getElementById("linhaSvg");
    const display = document.getElementById("display");

    display.innerText = titulo;

    box.innerHTML = `
        <h2>${titulo}</h2>
        <p>${descricao}</p>
    `;

    const botao = event.target;
    const btnRect = botao.getBoundingClientRect();

    const ESPACO = 70;
    const boxWidth = 260;

    const centroTela = window.innerWidth / 2;
    const centroBotao = btnRect.left + btnRect.width / 2;

    let boxX;

    // 🧠 Decide o lado automaticamente
    const ladoDireito = centroBotao > centroTela;


    if (ladoDireito) {
        boxX = btnRect.right + ESPACO;
    } else {
        boxX = btnRect.left - boxWidth - ESPACO;
    }

    const boxY = btnRect.top + window.scrollY + 10;

    box.style.left = `${boxX}px`;
    box.style.top = `${boxY}px`;

    box.classList.add("ativa");

    // LINHA DINÂMICA
    const x1 = btnRect.left + btnRect.width / 2;
    const y1 = btnRect.top + btnRect.height / 2 + window.scrollY;

    const x2 = ladoDireito ? boxX : boxX + boxWidth;
    const y2 = boxY + 30;

    svg.setAttribute("width", window.innerWidth);
    svg.setAttribute("height", window.innerHeight);

    linha.setAttribute("x1", x1);
    linha.setAttribute("y1", y1);
    linha.setAttribute("x2", x2);
    linha.setAttribute("y2", y2);
}