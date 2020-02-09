// @flow
import React from "react";
import useGetGamesResults from "../hooks/useGetGamesResults";
import DeckSummary from "./DeckSummary";
import { Card } from "antd";

const Home = () => {
  const gameResults = useGetGamesResults();

  return (
    <div className="App">
      <div className="d-flex">
        {gameResults.map((gameResult, index) => (
          <Card key={index}>
            <DeckSummary deck={gameResult.deck.CardsInDeck} />
            <p>
              Victoires : {gameResult.winAmount} / Défaites :{" "}
              {gameResult.defeatAmount}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
