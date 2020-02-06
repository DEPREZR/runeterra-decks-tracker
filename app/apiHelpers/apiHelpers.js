import { API_BASE_URL } from "constants.js";

export const get = async ({ url, body }) => {
  try {
    return await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br"
      },
      method: "GET",
      body: JSON.stringify(body)
    });
  } catch (error) {
    return { error, hasError: true, status: error.status || null };
  }
};
