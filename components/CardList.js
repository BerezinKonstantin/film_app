import Card from "./Card";
import styles from "../styles/CardList.module.css";
export default function CardList({ randomFilms }) {
  return (
    <ul className={styles.card_list}>
      {randomFilms.map((film, i) => (
        <Card
          film={film}
          year={film.year}
          cover={film.cover}
          key={film._id}
          _id={film._id}
          filmName={film.film_name}
          //handleOpenFilmPage={props.handleOpenFilmPage}
        />
      ))}
    </ul>
  );
}
