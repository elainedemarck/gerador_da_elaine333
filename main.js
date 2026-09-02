const numeroSenha = document.querySelector('#tamanho-texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const palavrasGamer = [
    'Shadow', 'Viper', 'Cyber', 'Dragon', 'Phoenix', 'Ghost',
    'Valkyrie', 'Neon', 'Slayer', 'Hunter', 'Blade', 'Apex',
    'Titan', 'Rogue', 'Kratos', 'Spectre', 'Storm', 'Venom'
];

const numerosLeet = { 'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7' };
const tagsClan = ['xX_', '_Xx', '[', ']', '#', '!', '_', '||'];

const btnMais = document.querySelector('#btn-mais');
const btnMenos = document.querySelector('#btn-menos');
const btnGerar = document.querySelector('#btn-gerar');
const campoSenha = document.querySelector('#campo-senha');
const checkboxes = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');

btnMenos.onclick = () => {
    if (tamanhoSenha > 6) tamanhoSenha--;
    numeroSenha.textContent = tamanhoSenha;
};

btnMais.onclick = () => {
    if (tamanhoSenha < 25) tamanhoSenha++;
    numeroSenha.textContent = tamanhoSenha;
};

btnGerar.onclick = jogar;

function jogar() {
    let p1 = palavrasGamer[Math.floor(Math.random() * palavrasGamer.length)];
    let p2 = palavrasGamer[Math.floor(Math.random() * palavrasGamer.length)];
    let nick = p1 + p2;

    if (!checkboxes[0].checked && checkboxes[1].checked) {
        nick = nick.toLowerCase();
    } else if (checkboxes[0].checked && !checkboxes[1].checked) {
        nick = nick.toUpperCase();
    }

    if (checkboxes[2].checked) {
        nick = nick.split('').map(c => (numerosLeet[c.toLowerCase()] && Math.random() > 0.3) ? numerosLeet[c.toLowerCase()] : c).join('');
    }

    if (checkboxes[3].checked) {
        const t1 = tagsClan[Math.floor(Math.random() * tagsClan.length)];
        const t2 = tagsClan[Math.floor(Math.random() * tagsClan.length)];
        nick = `${t1}${nick}${t2}`;
    }

    if (nick.length > tamanhoSenha) {
        nick = nick.slice(0, tamanhoSenha);
    } else {
        while (nick.length < tamanhoSenha) {
            nick += Math.floor(Math.random() * 10);
        }
    }

    campoSenha.value = nick;
    avaliarRaridade(nick);
}

function avaliarRaridade(nick) {
    let pontos = nick.length * 5;
    if (checkboxes[2].checked) pontos += 20;
    if (checkboxes[3].checked) pontos += 20;

    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (pontos >= 90) {
        forcaSenha.classList.add('forte');
        valorEntropia.textContent = `🏆 INCRÍVEL! Nick LENDÁRIO desbloqueado! (${pontos} Pontos)`;
    } else if (pontos >= 60) {
        forcaSenha.classList.add('media');
        valorEntropia.textContent = `⚡ Muito bom! Nick RARO obtido. (${pontos} Pontos)`;
    } else {
        forcaSenha.classList.add('fraca');
        valorEntropia.textContent = `🎲 Nick COMUM. Aumente o tamanho ou ative opções! (${pontos} Pontos)`;
    }
}