import { getCurrentDeck, getGameResult } from "../../gameApiHelpers";
import { useState, useEffect } from "react";

const useGetGamesResults = () => {
  const [result, setResult] = useState({
    lastGameId: -1,
    lastDeck: null,
    results: []
  });

  const callback = async () => {
    const [responseDeck, responseGameResult] = await Promise.all([
      getCurrentDeck(),
      getGameResult()
    ]);

    let dataGameResult = { GameID: -1, LocalPlayerWon: false };
    let dataDeck = { DeckCode: null, CardsInDeck: null };
    if (!responseGameResult.hasError) {
      dataGameResult = await responseGameResult.json();
    }
    if (!responseDeck.hasError) {
      dataDeck = await responseDeck.json();
    }

    await setResult(previousResult => {
      if (
        dataGameResult.GameID !== previousResult.lastGameId &&
        dataGameResult.GameID !== -1
      ) {
        return {
          ...previousResult,
          lastGameId: dataGameResult.GameID,
          results: [
            ...previousResult.results,
            {
              deck: previousResult.lastDeck,
              localPlayerWin: dataGameResult.LocalPlayerWon
            }
          ]
        };
      } else {
        if (dataDeck.DeckCode !== null) {
          return {
            ...previousResult,
            lastDeck: dataDeck
          };
        }
        return { ...previousResult };
      }
    });

    callback();
  };

  useEffect(
    () => {
      callback();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return result.results;
};

export default useGetGamesResults;
