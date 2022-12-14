import React, { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Switch from "@mui/material/Switch";
import CardList from "../components/CardList";
import Card from "../components/Card";
import styles from "../styles/SearchPage.module.css";
import db from "../utils/data_bases.json";

export default function SearchPage() {
  const [values, setValues] = useState({});
  const [searchedFilms, setSearchedFilms] = useState();
  const [searchedFilm, setSearchedFilm] = useState();
  const [isSearchResEmpty, setIsSearchResEmpty] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const searchRef = useRef();
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleInputChange = (ev) => {
    setValues({ ...values, [ev.target.name]: ev.target.value });
  };
  const getSearchResult = async () => {
    try {
      const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films?${
          values.country ? `countries=${values.country}` : ""
        }${values.genre ? `&genres=${values.genre}` : ""}${
          values.order ? `&order=${values.order}` : ""
        }&type=FILM${
          values.min_rating ? `&ratingFrom=${values.min_rating}` : ""
        }${values.max_rating ? `&ratingTo=${values.max_rating}` : ""}${
          values.min_year ? `&yearFrom=${values.min_year}` : ""
        }${values.max_year ? `&yearTo=${values.max_year}` : ""}${
          values.keyword ? `&keyword=${values.keyword}` : ""
        }&page=1`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "718c4a6f-9ccc-48d4-a8dd-abb4d0fd996f",
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      const searchedFilms = res.items.filter((item) => item.nameRu);
      if (!res.items[0]) {
        setIsSearchResEmpty(true);
        setSearchedFilms(false);
      } else {
        setIsSearchResEmpty(false);
      }
      setSearchedFilms(searchedFilms);
      searchRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      return console.log(err);
    }
  };
  const getNCSearchResult = async () => {
    try {
      const responsefilms = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v1/staff/6793`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "718c4a6f-9ccc-48d4-a8dd-abb4d0fd996f",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const searchedFilm = res.films
            .filter((item) => item.nameRu)
            .sort(() => Math.random() - Math.random())
            .slice(0, 1);
          return searchedFilm;
        })
        .then((searchedFilm) => {
          const res = fetch(
            `https://kinopoiskapiunofficial.tech/api/v2.2/films/${searchedFilm[0].filmId}`,
            {
              method: "GET",
              headers: {
                "X-API-KEY": "718c4a6f-9ccc-48d4-a8dd-abb4d0fd996f",
                "Content-Type": "application/json",
              },
            }
          );
          return res;
        })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setSearchedFilm(res);
        });
      setIsSearchResEmpty(false);
      searchRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      return console.log(err);
    }
  };
  function handleSubmit(ev) {
    ev.preventDefault();
    if (checked) {
      getNCSearchResult();
    } else {
      getSearchResult();
    }
  }
  const sortByAlphabeth = (arr, param) =>
    arr.sort((a, b) => {
      if (a[param] < b[param]) {
        return -1;
      }
      if (a[param] > b[param]) {
        return 1;
      }
      return 0;
    });
  const sortedCountries = sortByAlphabeth(db.countries, "country");
  const sortedGenres = sortByAlphabeth(db.genres, "genre");

  return (
    <>
      <Head>
        <title>Поиск</title>
      </Head>
      <section className={styles.search_page}>
        <h1 className={styles.title}>Выберите фильм:</h1>
        <form className={styles.search_form} action="#" onSubmit={handleSubmit}>
          <fieldset className={styles.search_fieldset}>
            {checked ? (
              <label className={styles.search_label}>
                Тогда всё это не важно, все его фильмы хороши!
              </label>
            ) : (
              <>
                <label className={styles.search_label}>Жанр</label>
                <select
                  className={styles.search_input}
                  name="genre"
                  onChange={handleInputChange}
                >
                  <option value="">-не выбрано-</option>
                  {sortedGenres.map((option, i) => (
                    <option key={i} value={option.id}>
                      {option.genre}
                    </option>
                  ))}
                </select>
                <label className={styles.search_label}>
                  Страна производства
                </label>
                <select
                  className={styles.search_input}
                  name="country"
                  onChange={handleInputChange}
                >
                  <option value="">-не выбрано-</option>
                  {sortedCountries.map((option, i) => (
                    <option key={i} value={option.id}>
                      {option.country}
                    </option>
                  ))}
                </select>
                <label className={styles.search_label}>Рейтинг фильма</label>
                <div className={styles.search_input_wrapper}>
                  <input
                    className={styles.search_input}
                    type="number"
                    placeholder="от"
                    name="min_rating"
                    min="0"
                    max="10"
                    onChange={handleInputChange}
                  />
                  <input
                    className={styles.search_input}
                    type="number"
                    placeholder="до"
                    name="max_rating"
                    min="0"
                    max="10"
                    onChange={handleInputChange}
                  />
                </div>
                <label className={styles.search_label}>Год выхода</label>
                <div className={styles.search_input_wrapper}>
                  <input
                    className={styles.search_input}
                    type="number"
                    placeholder="от"
                    name="min_year"
                    min="1895"
                    onChange={handleInputChange}
                  />
                  <input
                    className={styles.search_input}
                    type="number"
                    placeholder="до"
                    name="max_year"
                    min="1895"
                    onChange={handleInputChange}
                  />
                </div>
                <label className={styles.search_label}>Сортировать по</label>
                <select
                  className={styles.search_input}
                  name="order"
                  onChange={handleInputChange}
                >
                  <option value="RATING">Рейтингу</option>
                  <option value="YEAR">Году</option>
                </select>
                <label className={styles.search_label}>
                  Поиск по ключевому слову
                </label>
                <input
                  className={styles.search_input}
                  type="text"
                  name="keyword"
                  placeholder="Название, тема фильма и тд."
                  onChange={handleInputChange}
                />
              </>
            )}
          </fieldset>
          <div className={styles.search_switch_wrapper}>
            <label className={styles.search_label}>
              Хотите фильм с Николасом Кейджем?
            </label>
            <Switch color="warning" checked={checked} onChange={handleChange} />
          </div>
          <button
            className={styles.search_submit_button}
            type="submit"
            ref={searchRef}
          >
            {checked ? "Поехали!" : "Найти"}
          </button>
        </form>
        {checked && (
          <div className={styles.search__img}>
            <Image
              src="/nicolas-cage-png-375_360.png"
              alt="Кейдж"
              width={80}
              height={84}
            ></Image>
          </div>
        )}
      </section>
      {searchedFilms && !checked && (
        <section className={styles.search_result} id="search_res">
          <h1 className={styles.title}>
            {isSearchResEmpty
              ? "Ничего не нашлось, попробуйте изменить запрос"
              : "Результат поиска"}
          </h1>
          <CardList randomFilms={searchedFilms} />
        </section>
      )}
      {searchedFilm && checked && (
        <section className={styles.search_result} id="search_res">
          <h1 className={styles.title}>Например вот этот:</h1>
          <Card
            year={searchedFilm.year}
            cover={searchedFilm.posterUrl}
            id={searchedFilm.kinopoiskId}
            filmName={searchedFilm.nameRu}
          />
        </section>
      )}
    </>
  );
}
