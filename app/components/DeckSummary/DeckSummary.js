import React from "react";
import CardsInDeck from "../CardsInDeck";
import PropTypes from "prop-types";
import { Card } from "antd";
// const gameResultMock = {
//   cardsInDeck: deckMock,
//   deckCode:
//     "CEAAEAQBAUNS6AQBAQSCOAQQAECASDAQCQNBWJRKFMXC6NBWG44TWEABAUCAOCIKBMHBKFZEE4UC2LRRGU4A",
//   winAmount: 3,
//   defeatAmount: 4
// };
const DeckSummary = ({ gameResult }) => {
  return (
    <div className="mr-3 runeterra-card-summary">
      <Card
        style={{
          backgroundColor: "rgb(49,45,83)",
          borderColor: "rgb(49,45,83)",
          borderRadius: "10px"
        }}
      >
        <div
          style={{
            height: "80vh",
            overflowY: "auto"
          }}
        >
          <CardsInDeck deck={gameResult.cardsInDeck} />
        </div>
      </Card>
      <div
        className="d-flex justify-content-between mt-3"
        style={{ color: "rgb(167,167,199)" }}
      >
        <span className="ml-3">Victoires : {gameResult.winAmount}</span>
        <span>/</span>
        <span className="mr-3">Défaites : {gameResult.defeatAmount}</span>
      </div>
    </div>
  );
};

DeckSummary.propTypes = {
  gameResult: PropTypes.object.isRequired
};

export default DeckSummary;
