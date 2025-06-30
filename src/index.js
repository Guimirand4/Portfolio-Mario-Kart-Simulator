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
};

const player3 = {
    NOME: 'Peach',
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 2,
    PONTOS: 0
};

const player4 = {
    NOME: 'Bowser',
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0
};

const player5 = {
    NOME: 'Yoshi',
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0
};

const player6 = {
  NOME: 'Donkey Kong',
  VELOCIDADE: 2,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0
};

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const players = [player1, player2, player3, player4, player5, player6];

function escolherPersonagem(msg) {
  return new Promise((resolve) => {
    console.log("Escolha um personagem:");
    players.forEach((p, i) => {
      console.log(`${i + 1}. ${p.NOME}`);
    });
    readline.question(msg, (choice) => {
      const index = parseInt(choice) - 1;
      if (index >= 0 && index < players.length) {
        resolve(players[index]);
      } else {
        console.log("Escolha inválida.");
        resolve(escolherPersonagem(msg));
      }
    });
  });
}


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
  console.log(`${characterName} rolou um dado de ${block} e obteve ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
  for(let round = 1; round <= 5; round++) {

    console.log(`🏁 Rodada ${round}`);

    //sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco sorteado: ${block}`);
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
  
if (block === "CONFRONTO") {
  let powerResult1 = diceResult1 + character1.PODER;
  let powerResult2 = diceResult2 + character2.PODER;

  console.log(`${character1.NOME} confrontou ${character2.NOME}!`);
  await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
  await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

if (powerResult1 > powerResult2) {
  console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto 🐢. \n`);
  if (character2.PONTOS > 0) {
    character2.PONTOS--;
  }
}

if (powerResult2 > powerResult1) {
  console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto 🐢. \n`);
  if (character1.PONTOS > 0) {
    character1.PONTOS--;
  }
}

  if (powerResult1 === powerResult2) {
    console.log("Confronto empatado! Nenhum ponto foi perdido.\n");
  }
}

if (TotalTestSkill1 > TotalTestSkill2) {
  console.log(`${character1.NOME} marcou um ponto!\n`);
  character1.PONTOS++;
} else if (TotalTestSkill2 > TotalTestSkill1) {
  console.log(`${character2.NOME} marcou um ponto!\n`);
  character2.PONTOS++;
}
  }
};

async function declareWinner(character1, character2) {
  console.log("Resultados finais:");
  console.log(`${character1.NOME} - Pontos: ${character1.PONTOS}`);
  console.log(`${character2.NOME} - Pontos: ${character2.PONTOS}`);

  if(character1.PONTOS > character2.PONTOS) {
    console.log(`${character1.NOME} é o grande vencedor! 🏆`);
  } else if(character2.PONTOS > character1.PONTOS) {
    console.log(`${character2.NOME} é o grande vencedor! 🏆`);
  }
};

(async function main() {
  const jogador = await escolherPersonagem("Digite o número do SEU personagem: ");
  let oponente;

  // garantir que o oponente não seja o mesmo personagem
  while (true) {
    oponente = await escolherPersonagem("Digite o número do OPONENTE: ");
    if (oponente.NOME !== jogador.NOME) break;
    console.log("Você não pode escolher o mesmo personagem como oponente!");
  }

  console.log(`\n🏁🚨 Corrida entre ${jogador.NOME} e ${oponente.NOME} começando...\n`);
  await playRaceEngine(jogador, oponente);
  await declareWinner(jogador, oponente);
  readline.close();
})();
