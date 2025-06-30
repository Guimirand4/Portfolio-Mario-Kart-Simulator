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

async function getRandomBlock() {
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
}

async function logRollResult(characterName, block, diceResult, attribute){
  console.log(`${characterName} rolou um dado de ${block} e obteve ${diceResult}`);
}

async function playRaceEngine(character1, character2) {
  for(let round = 0; round <= 5; round++) {

    console.log(`🏁 Rodada ${round}`);

    //sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco sorteado: ${block}`);
  }

  //rolar dados
  let diceResult1 = await rollDice();
  let diceResult2 = await rollDice();

  //teste de habilidade
  let TotalTestSkill1 = 0;
  let TotalTestSkill2 = 0;

  if(block === "RETA"){
    TotalTestSkill1 = diceResult1 + character1.VELOCIDADE;
    TotalTestSkill2 = diceResult2 + character2.VELOCIDADE;
    
    await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
    await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
    
  }
  if(block === "CURVA"){
    TotalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
    TotalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

    await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
    await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
  }
  if(block === "CONFRONTO"){
    let powerResult1 = diceResult1 + character1.PODER;
    let powerResult2 = diceResult2 + character2.PODER;

  }
};

(async function main() {
    console.log(`🏁🚨Corrida entre ${player1.NOME} e ${player2.NOME} começando...`);
    await playRaceEngine(player1, player2);
})();