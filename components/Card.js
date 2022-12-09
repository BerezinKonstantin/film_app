import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Card.module.css";
export default function Card({ film, year, cover, id, filmName }) {
  return (
    <Link className={styles.card__link} href={`/films/${id}`}>
      <div className={styles.card}>
        <div className={styles.card__img}>
          <Image src={cover} alt="Постер фильма" fill></Image>
        </div>
        <p className={styles.card__film_name}>{filmName}</p>
        <p className={styles.card__film_year}>{year}</p>
      </div>
    </Link>
  );
}
