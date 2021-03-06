import React from "react";
import CardsInDeck from "../CardsInDeck";
import PropTypes from "prop-types";
import { Card, Progress, Button } from "antd";
// const gameResultMock = {
//   cardsInDeck: deckMock,
//   deckCode:
//     "CEAAEAQBAUNS6AQBAQSCOAQQAECASDAQCQNBWJRKFMXC6NBWG44TWEABAUCAOCIKBMHBKFZEE4UC2LRRGU4A",
//   winAmount: 3,
//   defeatAmount: 4
// };

const getWinrate = gameResult => {
  const totalGames = gameResult.winAmount + gameResult.defeatAmount;

  if (!totalGames) return undefined;

  return Math.round((gameResult.winAmount / totalGames) * 100);
};

const getWinrateColor = winrate => {
  if (!winrate) return "grey";
  if (winrate < 45) return "red";
  if (winrate < 55) return "yellow";

  return "green";
};

const DeckSummary = ({ gameResult, removeGameResult }) => {
  const winrate = getWinrate(gameResult);

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
            height: "60vh",
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
        <div className="mt-3">
          <Progress
            width={100}
            status="normal"
            type="circle"
            strokeColor={{ "0%": getWinrateColor(winrate) }}
            percent={winrate || 0}
          />
        </div>
        <span className="mr-3">Défaites : {gameResult.defeatAmount}</span>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Button
          type="primary"
          style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
          onClick={e => {
            e.preventDefault();
            removeGameResult(gameResult.deckCode);
          }}
        >
          Supprimer ces données
        </Button>
      </div>
    </div>
  );
};

DeckSummary.propTypes = {
  gameResult: PropTypes.object.isRequired,
  removeGameResult: PropTypes.func.isRequired
};

export default DeckSummary;
