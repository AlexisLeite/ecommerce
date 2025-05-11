"use client";

import { AiFillHome } from "@meronex/icons/ai";
import { TwoColumns, Header, Aside, Main } from "common";
import Link from "next/link";
import { AdminAsideNavigation } from "./AdminAsideNavigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TwoColumns className="administration">
      <Header
        homeIcon={
          <Link href="/">
            <AiFillHome />
          </Link>
        }
        title="Admin panel"
      ></Header>
      <Aside>
        <AdminAsideNavigation />
      </Aside>
      <Main>{children}</Main>
    </TwoColumns>
  );
}
