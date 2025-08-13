
// Calculadora Inteligente - Operações básicas e avançadas
const display = document.getElementById('display');
const resultado = document.getElementById('resultado');
let valorAtual = '';
let valorAnterior = '';
let operacao = '';
let resetarDisplay = false;

function atualizarDisplay(valor) {
    display.textContent = valor.replace('.', ',');
}

function calcular() {
    let a = parseFloat(valorAnterior.replace(',', '.'));
    let b = parseFloat(valorAtual.replace(',', '.'));
    let res = 0;
    switch (operacao) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '×': res = a * b; break;
        case '÷': res = b !== 0 ? a / b : 'Erro'; break;
        case '%': res = a * (b/100); break;
        default: res = b;
    }
    return res;
}

function limparTudo() {
    valorAtual = '';
    valorAnterior = '';
    operacao = '';
    resetarDisplay = false;
    atualizarDisplay('0');
    resultado.textContent = '';
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const acao = btn.getAttribute('data-action');
        if (!isNaN(acao)) { // Número
            if (resetarDisplay) {
                valorAtual = '';
                resetarDisplay = false;
            }
            if (valorAtual.length < 12) {
                valorAtual += acao;
                atualizarDisplay(valorAtual);
            }
        } else if (acao === 'dot') {
            if (resetarDisplay) {
                valorAtual = '';
                resetarDisplay = false;
            }
            if (!valorAtual.includes(',')) {
                valorAtual = valorAtual ? valorAtual + ',' : '0,';
                atualizarDisplay(valorAtual);
            }
        } else if (acao === 'clear') {
            limparTudo();
        } else if (acao === 'back') {
            valorAtual = valorAtual.slice(0, -1);
            atualizarDisplay(valorAtual || '0');
        } else if (["add","subtract","multiply","divide","percent"].includes(acao)) {
            if (valorAtual === '' && valorAnterior === '') return;
            if (operacao && valorAtual !== '') {
                let res = calcular();
                if (res === 'Erro') {
                    atualizarDisplay('Erro');
                    resultado.textContent = 'Divisão por zero!';
                    limparTudo();
                    return;
                }
                valorAnterior = res.toString().replace('.', ',');
                atualizarDisplay(valorAnterior);
                valorAtual = '';
            } else if (valorAtual !== '') {
                valorAnterior = valorAtual;
                valorAtual = '';
            }
            operacao = acao === 'add' ? '+' : acao === 'subtract' ? '-' : acao === 'multiply' ? '×' : acao === 'divide' ? '÷' : '%';
            resetarDisplay = false;
        } else if (acao === 'equals') {
            if (!operacao || valorAtual === '') return;
            let res = calcular();
            if (res === 'Erro') {
                atualizarDisplay('Erro');
                resultado.textContent = 'Divisão por zero!';
                limparTudo();
                return;
            }
            atualizarDisplay(res.toString().replace('.', ','));
            resultado.textContent = '';
            valorAtual = res.toString().replace('.', ',');
            valorAnterior = '';
            operacao = '';
            resetarDisplay = true;
        }
    });
});

limparTudo();

