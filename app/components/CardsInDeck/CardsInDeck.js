import React from "react";
import CardSummary from "../CardSummary";
import PropTypes from "prop-types";
// card: { cardCode: "01DE001", amount: 2 }
const CardsInDeck = ({ deck }) => {
  const deckCards = Object.entries(deck).map(([cardCode, amount]) => ({
    cardCode,
    amount
  }));

  return (
    <div style={{ width: 300, marginRight: "5px", marginLeft: "5px" }}>
      {deckCards.map((card, index) => (
        <CardSummary key={index} card={card} />
      ))}
    </div>
  );
};

CardsInDeck.propTypes = {
  deck: PropTypes.object.isRequired
};

export default CardsInDeck;
