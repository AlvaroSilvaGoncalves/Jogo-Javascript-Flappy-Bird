
console.log('[AlvaroGonss] Clone Flappy Bird');

let frames = 0;

const somHit = new Audio();
somHit.src = "/efeitos/hit.wav";

const sprites = new Image();
sprites.src = '/img/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// Estrutura do plano de fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,

    altura: 204,
    x: 0,
    y: canvas.height - 204,

    desenha(){
        contexto.fillStyle = '#70c5ce';  // Estilo de cor do fundo 
        contexto.fillRect(0, 0, canvas.width, canvas.height);  // Desenha no canvas

        // cria a primeira parte do fundo
        contexto.drawImage(  // Passa as cordenadas da imagem
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // Inicio do sprites na imagem do jogo
            planoDeFundo.largura, planoDeFundo.altura, // Tamnho do recorte inicio da imagem, largura e altura da imagem que sera renderizada
            planoDeFundo.x, planoDeFundo.y, // Posiçao de altura e largura que sera renderizada dentro do canva 
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte fim da imagem, largura e altura da imagem que sera renderizada
        )


        // Cria a segunda parte do fundo
        contexto.drawImage(  // Passa as cordenadas da imagem
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // Inicio do sprites na imagem do jogo
            planoDeFundo.largura, planoDeFundo.altura, // Tamnho do recorte inicio da imagem, largura e altura da imagem que sera renderizada
            planoDeFundo.x, planoDeFundo.y, // Posiçao de altura e largura que sera renderizada dentro do canva 
            (planoDeFundo.largura + planoDeFundo.largura), planoDeFundo.altura, // Tamanho do recorte fim da imagem, largura e altura da imagem que sera renderizada
        )


        // Cria a terceira parte do fundo
        contexto.drawImage(  // Passa as cordenadas da imagem
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // Inicio do sprites na imagem do jogo
            planoDeFundo.largura, planoDeFundo.altura, // Tamnho do recorte inicio da imagem, largura e altura da imagem que sera renderizada
            planoDeFundo.x, planoDeFundo.y, // Posiçao de altura e largura que sera renderizada dentro do canva 
            (planoDeFundo.largura + planoDeFundo.largura + planoDeFundo.largura), planoDeFundo.altura, // Tamanho do recorte fim da imagem, largura e altura da imagem que sera renderizada
        )
    }
}


// Estrutura do chao
function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
    
        altura: 112,
        x: 0,
        y: canvas.height - 112,

        // Realiza a movimentaçao infina do chao
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = 15;

            const movimentacao = chao.x - movimentoDoChao;
            chao.x = movimentacao % repeteEm;
        },
    
        desenha(){
            // Cria a primeira parte do chao
            contexto.drawImage( // Passa as cordenadas da imagem
                sprites, // imagem
                chao.spriteX, chao.spriteY, // Inicio do sprites na imagem do jogo
                chao.largura, chao.altura, // Tamnho do recorte inicio da imagem, largura e altura da imagem que sera renderizada
                chao.x, chao.y, // Posiçao de altura e largura que sera renderizada dentro do canva 
                chao.largura, chao.altura, // Tamanho do recorte fim da imagem, largura e altura da imagem que sera renderizada 
            )
    
    
            // Cria a segunda parte do chao
            contexto.drawImage( // Passa as cordenadas da imagem
            sprites, // imagem
            chao.spriteX, chao.spriteY, // Inicio do sprites na imagem do jogo
            chao.largura, chao.altura, // Tamnho do recorte inicio da imagem, largura e altura da imagem que sera renderizada
            (chao.x + chao.largura), chao.y, // Posiçao de altura e largura que sera renderizada dentro do canva duplicado
            chao.largura, chao.altura, // Tamanho do recorte fim da imagem, largura e altura da imagem que sera renderizada 
        )
    
    
            // Cria a terceira parte do chao
            contexto.drawImage( // Passa as cordenadas da imagem
            sprites, // imagem
            chao.spriteX, chao.spriteY, // Inicio do sprites na imagem do jogo
            chao.largura, chao.altura, // Tamnho do recorte inicio da imagem, largura e altura da imagem que sera renderizada
            (chao.x + chao.largura + chao.largura), chao.y, // Posiçao de altura e largura que sera renderizada dentro do canva duplicado
            chao.largura, chao.altura, // Tamanho do recorte fim da imagem, largura e altura da imagem que sera renderizada 
        )
        },
    };
    return chao;
    
}

// Estrutura Tela game over
const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2 ) - 226 / 2,
    y: 50,

    desenha() {
        contexto.drawImage (
            sprites,
            mensagemGameOver.sX, mensagemGameOver.sY,
            mensagemGameOver.w, mensagemGameOver.h,
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.w, mensagemGameOver.h
        );
    }
}


// Estrutura coliçao
function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y
    
    if(flappyBirdY >= chaoY) {
        return true
    }

    return false
}

// Estrutura do player
function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
    
        altura: 24,
        x: 10,
        y: 50,
    
        velocidade: 0,
        gravidade: 0.25,
        pulo: 4,
    
        // Efeito da gravidade sobre o player / Coliçao
        atualiza() {
    
            if(fazColisao(flappyBird, globais.chao)){
                somHit.play();

                mudaParaTela(Telas.gameOver);
                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade; 
        },
        
        // Altera a sprite do player para gera o movimento dele
        movimentos: [
            {spriteX: 0, spriteY: 0, },  // Asa para cima
            {spriteX: 0, spriteY: 26, },  //Asa no meio

            {spriteX: 0, spriteY: 52, },  // Ara para baixo
            {spriteX: 0, spriteY: 26, },  //Asa no meio
        ],
        // Atualizaçao do frema do jogo para mudar a sprite do player
        frameAtual: 0,
        atualizaOframeAtual() {
            const intervaloDeFrames = 10;
            const passouIntervalo = frames % intervaloDeFrames == 0;  // Faz com que a condiçao para bater as asas fique mais lenta, assim da um feito menos acelerado nos sprites de bater asa

            if(passouIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;

                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            } 
        },

        // Desenha o player e as mudanças dos sprites para dar movimento
        desenha(){
            this.atualizaOframeAtual();
            const { spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual];

            contexto.drawImage( // Passa as cordenadas da imagem
                sprites, // imagem
                spriteX, spriteY,  // Inicio do sprites na imagem do jogo
                flappyBird.largura, flappyBird.altura, // Tamnho do recorte inicio da imagem, largura e altura da imagem que sera renderizada
                flappyBird.x, flappyBird.y, // Posiçao de altura e largura que sera renderizada dentro do canva 
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte fim da imagem, largura e altura da imagem que sera renderizada 
            );
        },
    
        // Realizaçao do pulo do player
        pula() {
            flappyBird.velocidade = - flappyBird.pulo
        },
    };
    
    return flappyBird;
}

// Tela de inicio do jogo
const telaInicio = {
    sX: 134,
    sY: 0,
    w: 174,

    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    desenha(){
        contexto.drawImage(
            sprites,
            telaInicio.sX, telaInicio.sY,
            telaInicio.w, telaInicio.h,
            telaInicio.x, telaInicio.y,
            telaInicio.w, telaInicio.h
        )
    }
}

//  Estrutara dos canos obstaculos

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,

        desenha(){
            canos.pares.forEach(function(par){

                const espacamentoEntreCanos = 120;
                const yRandom = par.y;
    
                // Canos do ceu
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
    
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
    
                // Canos do chao
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
    
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                // Cria o incio do obstaculo dos canos
                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }

            })
        },
        // Verifica a coliçao do cano com o flaapy bird
        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;  // Cria o ponto de coliçao com o top do copor do player
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;  // Cria o ponto de coliçao com o fim do corpo do player
  
            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {

                if(cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }

                if(peDoFlappy >= par.canoChao.y) {
                    return true;
                }

            }
            return false;
        },

        // cria uma lista de canos que serao desenhados
        pares: [],

        atualiza() {
            // Gera os pares canos na tela a cada 100 frames
            const passou100Frames = frames % 100 === 0;
            if(passou100Frames){

                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });
            }

            // Movimenta os pares de canos
            canos.pares.forEach(function(par){
               par.x = par.x - 2; 

               if(canos.temColisaoComOFlappyBird(par)) {
                   somHit.play();
                   mudaParaTela(Telas.gameOver);
               }

               if ((par.x + canos.largura) <= 0) {
                canos.pares.shift();  // Remove o primeiro elemento de Array, assim nao fica criando canos infinitamente enchendo a memoria 
               }
            });

        },
    }

    return canos;
}

// Estrutura do placar do jogo 
function criaPlacar(){
    const placar = {
        pontuacao: 0,
        
        desenha() {
            contexto.fillStyle = "white";
            contexto.font = "20px Macondo";

            contexto.textAlign = "left";
            contexto.fillText (`Placar ${placar.pontuacao}`, 10, 30);
        },

        atualiza() {
            const intervaloDeFrames = 30;
            const passouIntervalo = frames % intervaloDeFrames === 0;

            if (passouIntervalo) {
                placar.pontuacao = placar.pontuacao + 1;
            }
        }
    }

    return placar;
}

// Telas

const globais = {};

let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },

        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            
            globais.chao.desenha();
            telaInicio.desenha();
        },

        click(){
            mudaParaTela(Telas.JOGO);
        },

        atualiza(){
            globais.chao.atualiza();
        }
    }
};

Telas.JOGO = {
    inicializa () {
        globais.placar = criaPlacar();
    },
    desenha() {
        planoDeFundo.desenha(); // Desenha o fundo do jogo
        globais.canos.desenha();  // Desenha os canos na tela

        globais.chao.desenha(); // Desenha o chao do mundo
        globais.flappyBird.desenha();  // Desenha o player

        globais.placar.desenha();  // Desenha o placar na tela 
    },

    click(){
        globais.flappyBird.pula();
    },

    atualiza() {
        globais.flappyBird.atualiza();  // Realiza a movimentaçao do player
        globais.canos.atualiza();  // Realiza a movimentaçao dos canos
        globais.chao.atualiza();  // Realiza movimentaçao do chao

        globais.placar.atualiza();  // Atualiza o placar do jogo na tela 
    }
}

Telas.gameOver = {
    desenha() {
        mensagemGameOver.desenha();
    },

    atualiza () {

    },

    click() {
        mudaParaTela(Telas.INICIO)
    }
}

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;  // Atualiza os frames do jogo
    requestAnimationFrame(loop);  // Gera os frames do jogo
}

window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();