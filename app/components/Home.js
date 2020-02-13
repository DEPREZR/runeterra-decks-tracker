// @flow
import React from "react";
// import useGetGamesResults from "../hooks/useGetGamesResults";
import DeckSummary from "./DeckSummary";
import { gameResultsMock } from "../mocks";

const Home = () => {
  // const gameResults = useGetGamesResults();

  return (
    <div
      style={{
        overflowX: "scroll",
        height: "100vh",
        backgroundColor: "rgb(42,35,73)"
      }}
      className="p-4 d-flex align-items-center"
    >
      <div className="d-flex">
        {gameResultsMock.map((gameResult, index) => (
          <DeckSummary key={index} gameResult={gameResult} />
        ))}
      </div>
    </div>
  );
};

export default Home;
