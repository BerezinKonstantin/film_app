import { token, basedUrl } from "./constants";

export const getTopFilms = async () => {
  const randomPage = Math.floor(Math.random() * 13) + 1;
  try {
    const response = await fetch(
      `${basedUrl}/films/top?type=TOP_250_BEST_FILMS&page=${randomPage}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
export const getPopularFilms = async () => {
  const randomPage = Math.floor(Math.random() * 35) + 1;
  try {
    const response = await fetch(
      `${basedUrl}/films/top?type=TOP_100_POPULAR_FILMS&page=${randomPage}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
export const getClassicFilms = async () => {
  const randomPage = Math.floor(Math.random() * 5) + 1;
  try {
    const response = await fetch(
      `${basedUrl}/films?order=RATING&type=FILM&ratingFrom=7&ratingTo=10&yearFrom=1970&yearTo=1999&page=${randomPage}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
