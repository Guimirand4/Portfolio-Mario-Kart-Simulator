const player1 = {
  NOME: 'Mario',
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0
};

const player2 = {
    NOME: 'Luigi',
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
}

const player3 = {
    NOME: 'Peach',
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 2,
    PONTOS: 0
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBloc() {
let random = Math.random();
let result

switch (true) {
  case (random < 0.33):
    result = 'RETA';
    break;
  case (random < 0.66):
    result = 'CURVA';
    break;
  default:
    result = 'CONFRONTO';
}
    return result;
};

async function playRaceEngine(character1, character2) {
  for(let round = 0; round <= 5; round++) {

    console.log(`🏁 Rodada ${round}`);

    //sortear bloco
    let block = await getRandomBloc();
    console.log(`Bloco sorteado: ${block}`);
  }
};

(async function main() {
    console.log(`🏁🚨Corrida entre ${player1.NOME} e ${player2.NOME} começando...`);
    await playRaceEngine(player1, player2);
})();