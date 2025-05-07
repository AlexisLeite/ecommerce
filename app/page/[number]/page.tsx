import { ProductsMain } from "@/app/list/ProductsMain";
import styles from "../../page.module.css";
import { StoreProvider } from "@/src/store/products/StoreProvider";
import { refresh } from "@/src/store/products/server/refresh";

export default async function Home({
  params,
}: {
  params: Promise<{ number: number }>;
}) {
  const page = await refresh((await params).number, false);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <StoreProvider data={page}>
          <ProductsMain />
        </StoreProvider>
      </main>
    </div>
  );
}
