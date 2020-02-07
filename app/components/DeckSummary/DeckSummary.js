import React from "react";
import CardSummary from "../CardSummary";
import PropTypes from "prop-types";
import { Card } from "antd";
// card: { cardCode: "01DE001", amount: 2 }
const DeckSummary = ({ deck }) => {
  const deckCards = Object.entries(deck).map(([cardCode, amount]) => ({
    cardCode,
    amount
  }));

  return (
    <Card style={{ width: 300 }} bodyStyle={{ padding: 0 }}>
      {deckCards.map((card, index) => (
        <CardSummary key={index} card={card} />
      ))}
    </Card>
  );
};

DeckSummary.propTypes = {
  deck: PropTypes.object.isRequired
};

export default DeckSummary;
