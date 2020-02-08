const cardsData = require("../assets/datadragon-set1-lite-fr_fr/fr_fr/data/set1-fr_fr.json");

export const retrieveCardData = cardCode => {
  return cardsData.find(card => card.cardCode === cardCode);
};
