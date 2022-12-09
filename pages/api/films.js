const token = "718c4a6f-9ccc-48d4-a8dd-abb4d0fd996f";
const basedUrl = "https://kinopoiskapiunofficial.tech/api/v2.2";

export const getFilms = async (id) => {
  try {
    const response = await fetch(`${basedUrl}/films/${id}`, {
      method: "GET",
      headers: {
        "X-API-KEY": `${token}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
