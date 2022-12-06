import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Card.module.css";
export default function Card({ film, year, cover, _id, filmName }) {
  return (
    <div className={styles.card}>
      <Link className={styles.random_film__link} href="/film-page">
        <Image
          className={styles.card__img}
          src={cover}
          alt="Постер фильма"
          width={200}
          height={300}
        ></Image>
        <p className={styles.card__film_name}>{filmName}</p>
        <p className={styles.card__film_year}>{year}</p>
      </Link>
    </div>
  );
}
