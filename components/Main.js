import db from "../db/films_db.json";
import CardList from "./CardList";
//import SwiperItem from "./SwiperItem";
import styles from "../styles/Main.module.css";

const randomFilms = db.films
  .sort(() => Math.random() - Math.random())
  .slice(0, 3);

export default function Main() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Main</h1>
      <h2 className={styles.subtitle}>Most rated</h2>
      <CardList randomFilms={randomFilms} />
      <h2 className={styles.subtitle}>Top new</h2>
      <h2 className={styles.subtitle}>Old but good</h2>
    </main>
  );
}
