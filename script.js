var cartela = [];
var numerosSorteados = [];

function gerarCartela() {
  cartela = [];
  while (cartela.length < 25) {
    var numero = obterNumeroAleatorio();
    if (cartela.includes(numero) === false && numero !== 0) {
      cartela.push(numero);
    }
  }
  exibirCartela();
}

function exibirCartela() {
  var numerosCartela = document.querySelectorAll('.numero');
  for (var i = 0; i < numerosCartela.length; i++) {
    numerosCartela[i].textContent = cartela[i];
  }
}

function marcarNumeroSorteado(numero) {
  var numerosCartela = document.querySelectorAll('.numero');
  for (var i = 0; i < numerosCartela.length; i++) {
    if (numerosCartela[i].textContent === numero.toString()) {
      numerosCartela[i].classList.add('marcado');
    }
  }
}

function sortearNumero() {
  var numeroSorteado = obterNumeroAleatorio();
  while (numerosSorteados.includes(numeroSorteado)) {
    numeroSorteado = obterNumeroAleatorio();
  }
  numerosSorteados.push(numeroSorteado);
  exibirNumerosSorteados();
  marcarNumeroSorteado(numeroSorteado);
  verificarVencedor();
}

function obterNumeroAleatorio() {
  return Math.floor(Math.random() * 75) + 1;
}

function exibirNumerosSorteados() {
  var numeroSorteadoDiv = document.getElementById('numerosorteado');
  var ultimoNumeroSorteadoDiv = document.getElementById('ultimoNumeroSorteado');

  if (numerosSorteados.length > 0) {
    var ultimoIndice = numerosSorteados.length - 1;
    var ultimoNumeroSorteado = numerosSorteados[ultimoIndice];
    numeroSorteadoDiv.textContent = ultimoNumeroSorteado;

    if (numerosSorteados.length > 1) {
      var penultimoIndice = numerosSorteados.length - 2;
      var penultimoNumeroSorteado = numerosSorteados[penultimoIndice];
      ultimoNumeroSorteadoDiv.textContent = penultimoNumeroSorteado;
    } else {
      ultimoNumeroSorteadoDiv.textContent = '';
    }
  } else {
    numeroSorteadoDiv.textContent = '';
    ultimoNumeroSorteadoDiv.textContent = '';
  }
}

function verificarVencedor() {
  var numerosCartela = document.querySelectorAll('.numero');
  var vencedor = true;
  for (var i = 0; i < numerosCartela.length; i++) {
    var numero = parseInt(numerosCartela[i].textContent);
    if (numerosSorteados.includes(numero) === false) {
      vencedor = false;
      break;
    }
  }
  if (vencedor === true) {
    alert('Cartela completa!');
  }
}

function resetarBingo() {
  cartela = [];
  numerosSorteados = [];
  exibirCartela();
  exibirNumerosSorteados();

  var numerosCartela = document.querySelectorAll('.numero');
  numerosCartela.forEach(function(numeroCartela) {
    numeroCartela.classList.remove('marcado');
  });
}

(() => {
  const startBtn = document.querySelector('#start');
  function start() {
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.start();
    recognition.onresult = function(event) {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const content = event.results[i][0].transcript.trim();
          palavraacomparar = "apagar";
          if (content.toUpperCase() === palavraacomparar.toUpperCase()) {
            gerarCartela()
          }
        }
      }
    };
  };
  startBtn.addEventListener('click', () => start());
})();

document.getElementById('gerarCartelaBtn').addEventListener('click', gerarCartela);

document.getElementById('sortearNumeroBtn').addEventListener('click', sortearNumero);

document.getElementById('resetarBingoBtn').addEventListener('click', resetarBingo);