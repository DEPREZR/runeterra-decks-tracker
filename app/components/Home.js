// @flow
import React, { useState } from "react";
import useGet from "../hooks/useGet";
import useGetGamesResults from "../hooks/useGetGamesResults";
import { SERVER_IP } from "../constants.js";

const Home = () => {
  const [cardId, setCardId] = useState(null);
  const [idToGet, setIdToGet] = useState("01IO012T2");
  const { data: card, loading } = useGet(`card/${idToGet}`);
  const gameResults = useGetGamesResults();

  return (
    <div className="App">
      {loading ? null : (
        <React.Fragment>
          <p>{`${card.name}${
            card.flavorText ? `: ${card.flavorText}` : ""
          }`}</p>
          <p>Ref associées : {card.associatedCardRefs.toString()} </p>
        </React.Fragment>
      )}
      <form
        onSubmit={e => {
          e.preventDefault();
          setIdToGet(cardId);
        }}
      >
        <input
          type="text"
          onChange={({ target: { value } }) => {
            setCardId(value);
          }}
        />
        <button type="submit">valider</button>
        <img alt="" src={`http://${SERVER_IP}:8080/card/${idToGet}/image`} />
        {gameResults.map((gameResult, index) => (
          <p key={index}>
            DeckCode: {gameResult.deckCode} / player win:{" "}
            {gameResult.localPlayerWin ? "oui" : "non"}
          </p>
        ))}
      </form>
    </div>
  );
};

export default Home;
