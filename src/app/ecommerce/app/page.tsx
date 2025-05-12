import { refresh as r } from "@/src/store/products/server/CategoriesServer";
import { refresh } from "@/src/store/products/server/ProductsServer";
import { LandingPage } from "./template1/LandingPage";

export default async function Home() {
  const data = await refresh();
  const data2 = await r();

  return (
    <div>
      <main>
        <LandingPage data2={data2} data={data} />
      </main>
    </div>
  );
}
