import { refresh } from "@/src/store/products/server/ProductsServer";
import { LandingPage } from "./template1/LandingPage";

export default async function Home() {
  const data = await refresh();

  return (
    <div>
      <main>
        <LandingPage data={data} />
      </main>
    </div>
  );
}
