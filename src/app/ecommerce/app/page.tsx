import { ProductsMain } from "../src/components/list/ProductsMain";
import { StoreProvider } from "@/src/store/products/StoreProvider";
import { refresh } from "@/src/store/products/server/refresh";
import { LandingPage } from "./template1/LandingPage";
import { Header } from "./components/ui/Header";

export default async function Home() {
  const page = await refresh(1, false);

  return (
    <div>
      <main>
        <StoreProvider data={page}>
          {/* <ProductsMain /> */}
          <LandingPage />
        </StoreProvider>
      </main>
    </div>
  );
}
