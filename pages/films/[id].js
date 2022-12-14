import Head from "next/head";
import Image from "next/image";
import { Rating } from "@mui/material";
import styles from "../../styles/FilmPage.module.css";

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": "718c4a6f-9ccc-48d4-a8dd-abb4d0fd996f",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
  if (!res) {
    return {
      notFound: true,
    };
  }
  return {
    props: { film: res },
  };
};

function FilmPage({ film }) {
  return (
    <>
      <Head>
        <title>{film.nameRu}</title>
      </Head>
      <section className={styles.film_page}>
        <Image
          className={styles.film_page__big_picture}
          src="/kinoteatr.jpg"
          alt="Кинотеатр"
          priority
          fill
        ></Image>
        <div className={styles.film_page__wrapper}>
          <div className={styles.film_page__cover}>
            <Image
              src={film.posterUrl}
              alt="Постер фильма"
              width={222}
              height={320}
              priority
            ></Image>
          </div>
          <div className={styles.film_page__wrapper_col}>
            <h2 className={styles.film_page__title}>{film.nameRu}</h2>
            <div className={styles.film_page__rate_container}>
              <Rating
                name="rating"
                value={film.ratingKinopoisk}
                precision={0.1}
                max={10}
                sx={{
                  color: "orange",
                }}
                readOnly
              />
              <p className={styles.film_page__rating}>{film.ratingKinopoisk}</p>
            </div>
          </div>
        </div>
        <p className={styles.film_page__text}>{film.description}</p>
        <p className={styles.film_page__text}>{film.year}</p>
        {film.genres.map((genre, i) => (
          <p className={styles.film_page__genre} key={i}>
            {genre.genre}
          </p>
        ))}
        <p className={styles.film_page__text}>{film.countries[0].country}</p>
      </section>
    </>
  );
}
export default FilmPage;
