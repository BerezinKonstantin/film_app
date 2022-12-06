import db from "../db/films_db.json";
import CardList from "./CardList";
import styles from "../styles/Main.module.css";
const randomFilms = db.data
  .sort(() => Math.random() - Math.random())
  .slice(0, 3);

export default function Main() {
  return (
    <main className={styles.main}>
      <h1>Main</h1>
      <CardList randomFilms={randomFilms} />
    </main>
  );
}
