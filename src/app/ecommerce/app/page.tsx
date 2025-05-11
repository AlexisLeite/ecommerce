import { refresh } from "@/src/store/products/server/ProductsServer";
import { LandingPage } from "./template1/LandingPage";
import { Header } from "../src/components/ui/Header";

export default async function Home() {
  const data = await refresh();

  return (
    <div>
      <Header />
      <main>
        <LandingPage data={data} />
      </main>
    </div>
  );
}
