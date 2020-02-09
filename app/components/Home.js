// @flow
import React from "react";
import useGetGamesResults from "../hooks/useGetGamesResults";
import DeckSummary from "./DeckSummary";
import { Card } from "antd";

const Home = () => {
  const gameResults = [
    {
      localPlayerWin: true,
      deck: {
        DeckCode: "ADECKCODE",
        CardsInDeck: {
          "01SI004": 3,
          "01SI021": 3,
          "01IO003": 3,
          "01IO026": 3,
          "01IO049": 3,
          "01IO009": 2,
          "01IO044": 2,
          "01IO057": 2,
          "01SI022": 2,
          "01SI023": 2,
          "01SI034": 2,
          "01SI035": 2,
          "01SI042": 2,
          "01SI043": 2,
          "01SI048": 2,
          "01SI049": 2,
          "01SI009": 1,
          "01SI033": 1,
          "01SI040": 1
        }
      }
    }
  ];

  return (
    <div className="App">
      <div className="d-flex">
        {gameResults.map((gameResult, index) => (
          <Card key={index}>
            <DeckSummary deck={gameResult.deck.CardsInDeck} />
            <p>Victoire : {gameResult.localPlayerWin ? "oui" : "non"}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
