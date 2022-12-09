import Link from "next/link";
import Image from "next/image";
import { Rating } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styles from "../styles/SwiperItem.module.css";
//import useStyles from "../utils/useStyles";

function SwiperItem({ randomFilm, filmRating }) {
  //function handleOpen() {
  //  props.handleOpenFilmPage(props.randomFilm._id);
  //}
  //const classes = useStyles();
  return (
    <section className={styles.random_film}>
      <h2 className={styles.random_film__title}>Случайный фильм</h2>
      <Link className={styles.random_film__link} href="/film-page">
        <Image
          className={styles.random_film__picture}
          src={randomFilm.posterUrl}
          alt="Постер фильма"
          width={400}
          height={300}
        ></Image>
        <div className={styles.random_film__text_container}>
          <h1 className={styles.random_film__name}>{randomFilm.nameRu}</h1>
          <p className={styles.random_film__description}>
            {randomFilm.description}
          </p>
        </div>
        <div className={styles.random_film_rate_container}>
          <Rating
            name="rating"
            value={filmRating}
            precision={0.1}
            max={10}
            sx={{
              color: "#fed530",
            }}
            readOnly
            /*emptyIcon={
              <StarBorderIcon
                fontSize="inherit"
                className={classes.emptyStar}
              />
              }
            */
          />
          <p className={styles.random_film_rating}> {randomFilm.rating}</p>
        </div>
      </Link>
    </section>
  );
}

export default SwiperItem;
