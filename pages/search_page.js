import React, { useState } from "react";
import Head from "next/head";
import CardList from "../components/CardList";
import styles from "../styles/Home.module.css";
import db from "../utils/data_bases.json";

export default function SearchPage() {
  const [values, setValues] = useState({});
  const [searchedFilms, setSearchedFilms] = useState();
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
      const searchedFilms = res.items
        .filter((item) => item.nameRu)
        .sort(() => Math.random() - Math.random());
      setSearchedFilms(searchedFilms);
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
      <section className={styles.film_page}>
        <h1>Выбери фильм:</h1>
        <form action="#" onSubmit={handleSubmit}>
          <fieldset className="popup__fieldset">
            <span className="popup__input-label">Выбери жанр</span>
            <select
              className="custom-select"
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
            <span className="popup__input-label">
              Выбери страну производства
            </span>
            <select
              className="custom-select"
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
            <span className="popup__input-label">Выбери рейтинг</span>
            <input
              type="number"
              placeholder="min"
              name="min_rating"
              min="0"
              max="10"
              onChange={handleInputChange}
            />
            <input
              type="number"
              placeholder="max"
              name="max_rating"
              min="0"
              max="10"
              onChange={handleInputChange}
            />
            <span className="popup__input-label">Выбери год производства</span>
            <input
              type="number"
              placeholder="min"
              name="min_year"
              min="1895"
              onChange={handleInputChange}
            />
            <input
              type="number"
              placeholder="max"
              name="max_year"
              min="1895"
              onChange={handleInputChange}
            />
            <span className="popup__input-label">Выбери сортировку</span>
            <select
              className="custom-select"
              name="order"
              onChange={handleInputChange}
            >
              {/*id={id} onChange={onChange}*/}
              <option value="RATING">По рейтингу</option>
              <option value="YEAR">По году</option>
            </select>
            <span className="popup__input-label">Выбери ключевое слово</span>
            <input
              className="popup__input"
              type="text"
              name="keyword"
              placeholder="Название, тема фильма и тд."
              onChange={handleInputChange}
            />
            {/*<input
              className="popup__input popup__input_email"
              type="email"
              name="email"
              onChange={props.onChange}
              value={props.values.email || ""}
              autoComplete="email"
              required
              placeholder="Введите почту"
              pattern="([\w.%+-]+)@([\w-]+\.)+([\w]{2,})"
            />*/}
          </fieldset>
          <button
            className="popup__link-button"
            type="submit"
            //disabled={!props.isValid}
            //onClick={props.onButtonClick}
          >
            Найти
          </button>
        </form>
      </section>
      {searchedFilms && <CardList randomFilms={searchedFilms} />}
    </>
  );
}
