import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/404.module.css";

const Error = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <>
      <Head>
        <title>Ошибка 404</title>
      </Head>
      <section className={styles.error_page}>
        <h1 className={styles.error_title}>404</h1>
        <Image
          className={styles.error_picture}
          src="/404.jpg"
          alt="Ошибка"
          priority
          width={400}
          height={300}
        ></Image>
        <p className={styles.error_text}>
          Чувак, ты думал что-то здесь будет? О, нет, такой страницы не
          существует. Сейчаc отправлю тебя на главную.
        </p>
      </section>
    </>
  );
};
export default Error;
