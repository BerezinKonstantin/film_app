import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";

export default function Header() {
  const navigation = [
    { id: 1, title: "Главная", path: "/" },
    { id: 2, title: "Поиск", path: "/search_page" },
  ];
  const { pathname } = useRouter();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Film Fill</h1>
      <nav className={styles.nav}>
        {navigation.map(({ id, title, path }) => (
          <Link
            key={id}
            href={path}
            className={
              pathname === path
                ? `${styles.link + " " + styles.active}`
                : styles.link
            }
          >
            {title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
