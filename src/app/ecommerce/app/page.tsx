import { ProductsMain } from "../src/components/list/ProductsMain";
import { StoreProvider } from "@/src/store/products/StoreProvider";
import { refresh } from "@/src/store/products/server/refresh";

export default async function Home() {
  const page = await refresh(1, false);

  return (
    <div>
      <main>
        <StoreProvider data={page}>
          <ProductsMain />
        </StoreProvider>
      </main>
    </div>
  );
}
