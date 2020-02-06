import { CLIENT_IP } from "constants.js";

export const getCurrentDeck = async () => {
  try {
    return await fetch(`http://${CLIENT_IP}:21337/static-decklist`, {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br"
      },
      method: "GET"
    });
  } catch (error) {
    return { error, hasError: true, status: error.status || null };
  }
};
