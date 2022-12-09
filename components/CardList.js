import Card from "./Card";
import styles from "../styles/CardList.module.css";

export default function CardList({ randomFilms }) {
  return (
    <ul className={styles.card_list}>
      {randomFilms.map((film, i) => (
        <Card
          film={film}
          year={film.year}
          cover={film.posterUrlPreview}
          key={i}
          id={film.kinopoiskId || film.filmId}
          filmName={film.nameRu}
          //handleOpenFilmPage={props.handleOpenFilmPage}
        />
      ))}
    </ul>
  );
}
