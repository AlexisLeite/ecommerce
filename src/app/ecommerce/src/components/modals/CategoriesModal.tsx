import { CategoriesListStore } from "@/src/store/CategoriesStore";
import { Category } from "@prisma/client";
import { Cell, GenericRetrieverModal, HeaderCell } from "common";
import { TFunction } from "i18next";
import { ReactNode } from "react";

export class CategoriesRetrieverModal extends GenericRetrieverModal<Category> {
  protected getColumns(t: TFunction<"translation", undefined>): ReactNode {
    return <HeaderCell>{t("Nombre")}</HeaderCell>;
  }
  protected getRowCells(
    _t: TFunction<"translation", undefined>,
    element: Category,
  ): ReactNode {
    return <Cell>{element.name}</Cell>;
  }
  protected getModalTitle(t: TFunction<"translation", undefined>): string {
    return t("Categorías");
  }
}

export async function pickCategories(): Promise<Category[]> {
  const store = new CategoriesListStore();
  const modal = new CategoriesRetrieverModal(store);
  return modal.open();
}
