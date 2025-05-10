import styles from "./styles/page.module.css";
import { ProductsMain } from "./list/ProductsMain";
import { StoreProvider } from "@/src/store/products/StoreProvider";
import { refresh } from "@/src/store/products/server/refresh";
import { LandingPage } from "./template1/LandingPage";
import { Header } from "./components/ui/Header";

export default async function Home() {
  const page = await refresh(1, false);

  return (
    <div
      className={styles.page}
      style={{ display: "contents", background: "white" }}
    >
      <Header />
      <main className={styles.main}>
        <StoreProvider data={page}>
          {/* <ProductsMain /> */}
          <LandingPage />
        </StoreProvider>
      </main>
    </div>
  );
}
