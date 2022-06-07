const letterDataset = [
  { letter: "A", count: 9, score: 1 },
  { letter: "B", count: 2, score: 3 },
  { letter: "C", count: 2, score: 3 },
  { letter: "D", count: 4, score: 2 },
  { letter: "E", count: 12, score: 1 },
  { letter: "F", count: 2, score: 4 },
  { letter: "G", count: 3, score: 2 },
  { letter: "H", count: 2, score: 4 },
  { letter: "I", count: 9, score: 1 },
  { letter: "J", count: 1, score: 8 },
  { letter: "K", count: 1, score: 5 },
  { letter: "L", count: 4, score: 1 },
  { letter: "M", count: 2, score: 3 },
  { letter: "N", count: 6, score: 1 },
  { letter: "O", count: 8, score: 1 },
  { letter: "P", count: 2, score: 3 },
  { letter: "Q", count: 1, score: 10 },
  { letter: "R", count: 6, score: 1 },
  { letter: "S", count: 4, score: 1 },
  { letter: "T", count: 6, score: 1 },
  { letter: "U", count: 4, score: 1 },
  { letter: "V", count: 2, score: 4 },
  { letter: "W", count: 2, score: 4 },
  { letter: "X", count: 1, score: 8 },
  { letter: "Y", count: 2, score: 4 },
  { letter: "Z", count: 1, score: 10 },
];

const makeScoreTable = () => {
  const scoreMap = new Map();
  letterDataset.forEach((data) => {
    scoreMap.set(data.letter, data.score);
  });
  return scoreMap;
};

const scoreTable = makeScoreTable();

export const drawLetters = () => {
  // Implement this method for wave 1
  const hand = [];

  const weightedPool = [];
  letterDataset.forEach((data) => {
    weightedPool.push(...data.letter.repeat(data.count));
  });
  const randomIndices = new Set();
  while (randomIndices.size < 10) {
    randomIndices.add(Math.floor(Math.random() * weightedPool.length));
  }
  randomIndices.forEach((index) => {
    hand.push(weightedPool[index]);
  });
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
  const freqMap = new Map();
  lettersInHand.forEach((letter) => {
    freqMap.set(letter, (freqMap.get(letter) || 0) + 1);
  });

  Array.from(input).forEach((letter) => {
    freqMap.set(letter, (freqMap.get(letter) || 0) - 1);
  });

  return Array.from(freqMap.values()).every((count) => count > -1);
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
  const addScores = (total, letter) => total + scoreTable.get(letter);
  let wordScore = Array.from(word.toUpperCase()).reduce(addScores, 0);
  if (word.length >= 7) wordScore += 8;

  return wordScore;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 1
  let highestWord = null;
  let highestScore = 0;
  const makeWinner = (word, score) => ({ word, score });
  const wordScoreMap = new Map();
  words.forEach((word) => {
    wordScoreMap.set(word, scoreWord(word));
    if (wordScoreMap.get(word) > highestScore) {
      highestWord = word;
      highestScore = wordScoreMap.get(word);
    }
  });
  // return this early because this condition would break ties anyway
  if (highestWord.length === 10) {
    return makeWinner(highestWord, highestScore);
  }

  // tie breaking logic
  for (const word of words) {
    if (wordScoreMap.get(word) === highestScore && word !== highestWord) {
      if (word.length === 10 || word.length < highestWord.length) {
        return makeWinner(word, highestScore);
      }
    }
  }
  return makeWinner(highestWord, highestScore);
};
