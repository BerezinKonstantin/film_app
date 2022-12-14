import CardList from "./CardList";
import Link from "next/link";
import styles from "../styles/Main.module.css";

export default function Main({ filmArrays }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Не знаете что посмотреть?</h1>
      <h2 className={styles.subtitle}>Что-нибудь из Топ-250:</h2>
      <CardList randomFilms={filmArrays.randomTopFilms} />
      <h2 className={styles.subtitle}>Что-нибудь из популярного сейчас:</h2>
      <CardList randomFilms={filmArrays.randomPopularFilms} />
      <h2 className={styles.subtitle}>
        Что-нибудь из хороших старых фильмов :
      </h2>
      <CardList randomFilms={filmArrays.randomClassicFilms} />
      <h2 className={styles.subtitle}>
        Ничего не подходит? Тогда вам поможет{" "}
        <Link className={styles.link} href={`/search_page`}>
          {" "}
          Поиск{" "}
        </Link>
      </h2>
    </main>
  );
}
