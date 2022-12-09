const token = "718c4a6f-9ccc-48d4-a8dd-abb4d0fd996f";
const basedUrl = "https://kinopoiskapiunofficial.tech/api/v2.2";
const randomPage = Math.floor(Math.random() * 5) + 1;

export const getTopFilms = async () => {
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
