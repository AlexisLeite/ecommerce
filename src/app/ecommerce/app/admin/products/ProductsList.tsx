"use client";

import { ProductsListStore } from "@/src/store/products/ProductsStore";
import {
  Cell,
  HeaderCell,
  HStack,
  IconButton,
  Pagination,
  Row,
  Stack,
  Table,
  TBody,
  THead,
} from "common";
import { useTranslation } from "react-i18next";
import { FaEdit, FaTrash } from "@meronex/icons/fa";
import { observer } from "mobx-react-lite";

export const ProductsList = () => <ProductsListRender />;

const ProductsListRender = observer(() => {
  const store = ProductsListStore.instance;

  const { t } = useTranslation();

  return (
    <Stack>
      <div className="table_wrapper">
        {store.state.revalidateError}
        <Table>
          <THead>
            <Row>
              <HeaderCell>{t("Acciones")}</HeaderCell>
              <HeaderCell>{t("Nombre")}</HeaderCell>
              <HeaderCell>{t("Descripción")}</HeaderCell>
              <HeaderCell>{t("Precio")}</HeaderCell>
              <HeaderCell>{t("Stock")}</HeaderCell>
            </Row>
          </THead>
          <TBody>
            {store.products.map((c) => (
              <Row key={c.id}>
                <Cell>
                  <HStack>
                    <IconButton size="sm">
                      <FaEdit />
                    </IconButton>
                    <IconButton size="sm">
                      <FaTrash onClick={() => store.delete(c.id)} />
                    </IconButton>
                  </HStack>
                </Cell>
                <Cell>{c.name}</Cell>
                <Cell>{c.description}</Cell>
                <Cell>{c.price}</Cell>
                <Cell>Not implemented</Cell>
              </Row>
            ))}
          </TBody>
        </Table>
      </div>
      <Pagination store={store} />
    </Stack>
  );
});
