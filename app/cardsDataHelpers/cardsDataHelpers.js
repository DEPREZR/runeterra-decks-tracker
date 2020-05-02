const cardsDataSet1 = require("../assets/datadragon-set1-lite-fr_fr/fr_fr/data/set1-fr_fr.json");
const cardsDataSet2 = require("../assets/datadragon-set1-lite-fr_fr/fr_fr/data/set2-fr_fr.json");

const cardsData = [...cardsDataSet1, ...cardsDataSet2];

export const retrieveCardData = cardCode => {
  return cardsData.find(card => card.cardCode === cardCode);
};
