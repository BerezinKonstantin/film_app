import React, { useState, useRef } from "react";
import Head from "next/head";
import CardList from "../components/CardList";
import styles from "../styles/SearchPage.module.css";
import db from "../utils/data_bases.json";

export default function SearchPage() {
  const [values, setValues] = useState({});
  const [searchedFilms, setSearchedFilms] = useState();
  const [isSearchResEmpty, setIsSearchResEmpty] = useState(false);
  const searchRef = useRef();

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
      console.log(res);
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
  function handleSubmit(ev) {
    ev.preventDefault();
    getSearchResult();
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
        <h1 className={styles.title}>Выбери фильм:</h1>
        <form className={styles.search_form} action="#" onSubmit={handleSubmit}>
          <fieldset className={styles.search_fieldset}>
            <label className={styles.search_label}>Выбери жанр</label>
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
              Выбери страну производства
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
            <label className={styles.search_label}>Выбери рейтинг</label>
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
            <label className={styles.search_label}>
              Выбери год производства
            </label>
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
            <label className={styles.search_label}>
              Выбери как сортировать
            </label>
            <select
              className={styles.search_input}
              name="order"
              onChange={handleInputChange}
            >
              <option value="RATING">По рейтингу</option>
              <option value="YEAR">По году</option>
            </select>
            <label className={styles.search_label}>Выбери ключевое слово</label>
            <input
              className={styles.search_input}
              type="text"
              name="keyword"
              placeholder="Название, тема фильма и тд."
              onChange={handleInputChange}
            />
          </fieldset>
          <button
            className={styles.search_submit_button}
            type="submit"
            ref={searchRef}
          >
            Найти
          </button>
        </form>
      </section>
      {searchedFilms && (
        <section className={styles.search_result} id="search_res">
          <h1 className={styles.title}>
            {isSearchResEmpty
              ? "Ничего не нашлось, попробуйте изменить запрос"
              : "Результат поиска"}
          </h1>
          <CardList randomFilms={searchedFilms} />
        </section>
      )}
    </>
  );
}
