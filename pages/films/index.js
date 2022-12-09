import Head from "next/head";
import Image from "next/image";
import { Rating } from "@mui/material";
import db from "../../db/films_db.json";
import styles from "../../styles/FilmPage.module.css";

const randomFilm = db.films
  .sort(() => Math.random() - Math.random())
  .slice(0, 1)[0];

function FilmPage() {
  return (
    <>
      <Head>
        <title>{randomFilm.nameRu}</title>
      </Head>
      <section className={styles.film_page}>
        <div className={styles.film_page__info}>
          <div className={styles.film_page__wrapper}>
            <div className={styles.film_page__cover}>
              <Image
                src={randomFilm.posterUrl}
                alt="Постер фильма"
                fill
              ></Image>
            </div>
            <div className={styles.film_page__wrapper_col}>
              <h2 className={styles.film_page__title}>{randomFilm.nameRu}</h2>
              <div className={styles.film_page__rate_container}>
                <Rating
                  name="rating"
                  value={randomFilm.ratingKinopoisk}
                  precision={0.1}
                  max={10}
                  sx={{
                    color: "#fed530",
                  }}
                  readOnly
                />
                <p className={styles.film_page__rating}>
                  {randomFilm.ratingKinopoisk}
                </p>
              </div>
            </div>
          </div>
          <p className={(styles.film_page__dscr, styles.film_page__text)}>
            {randomFilm.description}
          </p>
          <p className={(styles.film_page__year, styles.film_page__text)}>
            {randomFilm.year}
          </p>
          <p className={(styles.film_page__genre, styles.film_page__text)}>
            Жанр
          </p>
        </div>
      </section>
    </>
  );
}
export default FilmPage;
