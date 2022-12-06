// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
export async function getStaticProps(context) {
  const response = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=2&order=RATING&type=FILM&ratingFrom=6&ratingTo=10&yearFrom=1990&yearTo=2022&page=1`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": "718c4a6f-9ccc-48d4-a8dd-abb4d0fd996f",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
  if (!response) {
    return {
      notFound: true,
    };
  }
  const randomFilms = response.items
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return {
    props: { randomFilms },
  };
}
