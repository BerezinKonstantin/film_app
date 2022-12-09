import Head from "next/head";
import Main from "../components/Main";
import { getTopFilms, getPopularFilms, getClassicFilms } from "./api/main";

export const getServerSideProps = async (context) => {
  const topFilms = await getTopFilms();
  const popularFilms = await getPopularFilms();
  const classicFilms = await getClassicFilms();
  if (!topFilms || !popularFilms || !classicFilms) {
    return {
      notFound: true,
    };
  }
  const getRandomFilms = (films) => {
    if (films.films) {
      return films.films.sort(() => Math.random() - Math.random()).slice(0, 3);
    }
    if (films.items) {
      return films.items
        .filter((item) => item.nameRu)
        .sort(() => Math.random() - Math.random())
        .slice(0, 3);
    }
  };
  const randomTopFilms = getRandomFilms(topFilms);
  const randomPopularFilms = getRandomFilms(popularFilms);
  const randomClassicFilms = getRandomFilms(classicFilms);

  return {
    props: {
      filmArrays: { randomTopFilms, randomPopularFilms, randomClassicFilms },
    },
  };
};

function HomePage({ filmArrays }) {
  return (
    <>
      <Head>
        <title>Главная</title>
      </Head>
      <Main filmArrays={filmArrays} />
    </>
  );
}
export default HomePage;
