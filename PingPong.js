//variáveis da bolinha
let xbolinha = 300;
let ybolinha = 200;
let diametro = 20;
let raio = diametro / 2;
let trilhaSonora;
let ponto;
let rebate;

function preload() {
  // Carrega os arquivos de áudio antes de iniciar o jogo
  trilhaSonora = loadSound('trilha.mp3'); 
  rebate = loadSound('raquetada.mp3');
  ponto = loadSound('ponto.mp3');
}

//velocidade da bolinha
let velocidadeXbolinha = 5;
let velocidadeYbolinha = 5;

//variáveis da raquete 
let xRaquete = 5;
let yRaquete = 150;
let raquetelargura = 10;
let raquetealtura = 90;

//variáveis do oponente
let xRaqueteoponente = 585;
let yRaqueteoponente = 150;

let colidiu = false;

//placar
let placarJogador = 0;
let placarOponente = 0;

function setup() {
  createCanvas(600, 400);
  
  // Inicie a reprodução da trilha sonora em loop (para que ela toque continuamente)
  trilhaSonora.loop();

}

function draw() {
  background("rgb(8,60,8)");
  
  // Desenha a linha branca no centro da tela
  stroke(255);
  line(width / 2, 0, width / 2, height);
  
  // Desenha a bola no centro da tela
  fill(255);
  circle(width / 2, height / 2, diametro);
  
  mostrarbolinha();
  movimentabolinha();
  colisaoborda();
  mostrarRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  mostrarRaquete(xRaqueteoponente, yRaqueteoponente);
  movimentaroponente();
  colisaoraquete();
  mostrarPlacar();
}

//mostrar bolinha
function mostrarbolinha() {
  circle(xbolinha, ybolinha, diametro);
}

// mostrar raquete
function mostrarRaquete(x, y) {
  rect(x, y, raquetelargura, raquetealtura);
}

// movimento da bolinha
function movimentabolinha() {
  xbolinha += velocidadeXbolinha;
  ybolinha += velocidadeYbolinha;
}

//colisao borda
function colisaoborda() {
  if (xbolinha + raio > width || xbolinha - raio < 0) {
    velocidadeXbolinha *= -1;
  }
  if (ybolinha + raio > height || ybolinha - raio < 0) {
    velocidadeYbolinha *= -1;
  }
}

// movimentos raquete
function movimentoRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

//colisao raquete
function colisaoraquete() {
  if (
    xbolinha - raio < xRaquete + raquetelargura &&
    ybolinha - raio < yRaquete + raquetealtura &&
    ybolinha + raio > yRaquete
  ) {
    velocidadeXbolinha *= -1;
    rebate.play(); // Reproduz o efeito sonoro de ponto quando um ponto é marcado
  }
  if (
    xbolinha + raio > xRaqueteoponente &&
    ybolinha - raio < yRaqueteoponente + raquetealtura &&
    ybolinha + raio > yRaqueteoponente
  ) {
    velocidadeXbolinha *= -1;
    rebate.play(); // Reproduz o efeito sonoro de ponto quando um ponto é marcado
  }

  // atualizar placar quando a bolinha colidir com as bordas laterais
  if (xbolinha - raio < 0) {
    placarOponente++;
    ponto.play();  
  }
  if (xbolinha + raio > width) {
    placarJogador++;
    ponto.play();
  }
}

// movimento oponente
let velocidadeYoponente = 3; // Velocidade vertical constante do oponente

// Movimento do oponente
function movimentaroponente() {
  // Atualiza a posição vertical da raquete do oponente
  yRaqueteoponente += velocidadeYoponente;

  // Verifica se o oponente alcançou a extremidade superior ou inferior do canvas
  if (yRaqueteoponente <= 0 || yRaqueteoponente + raquetealtura >= height) {
    velocidadeYoponente *= -1; // Inverte a direção do movimento
  }
}

// mostrar placar
function mostrarPlacar() {
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("Jogador: " + placarJogador, width / 2 - 100, 30);
  text("Oponente: " + placarOponente, width /2+100, 30);
}
