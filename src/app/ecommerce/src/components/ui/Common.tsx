"use client";

import { Notifications } from "common";
import { ModalsProvider } from "../ModalsProvider";
import { Header } from "./Header";

export const Common = () => {
  return (
    <>
      <Header />
      <ModalsProvider />
      <Notifications.Provider />
    </>
  );
};
