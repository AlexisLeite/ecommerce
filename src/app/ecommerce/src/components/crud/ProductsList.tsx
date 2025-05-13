"use client";

import { ProductsListStore, TProductListData } from "@/src/store/ProductsStore";
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
  TCRUDStorePagination,
  THead,
  WhenInsideScreen,
} from "common";
import { useTranslation } from "react-i18next";
import { FaEdit, FaTrash } from "@meronex/icons/fa";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

export const ProductsList = ({
  data,
}: {
  data?: TCRUDStorePagination<TProductListData>;
}) => {
  return (
    <>
      <ProductsListRender data={data} />
    </>
  );
};

const ProductsListRender = observer(
  ({ data }: { data?: TCRUDStorePagination<TProductListData> }) => {
    const store = ProductsListStore.getInstance(data);
    const { t } = useTranslation();
    const router = useRouter();

    return (
      <Stack>
        <div style={{ position: "absolute" }}>
          <WhenInsideScreen onInside={() => store.refresh()} />
        </div>
        <div className="table_wrapper">
          {store.error}
          <Table>
            <THead>
              <Row>
                <HeaderCell width="10%">{t("Acciones")}</HeaderCell>
                <HeaderCell width="20%">{t("Nombre")}</HeaderCell>
                <HeaderCell width="50%">{t("Descripción")}</HeaderCell>
                <HeaderCell width="10%">{t("Precio")}</HeaderCell>
                <HeaderCell width="10%">{t("Stock")}</HeaderCell>
              </Row>
            </THead>
            <TBody>
              {store.products.map((c) => (
                <Row key={c.id}>
                  <Cell>
                    <HStack>
                      <IconButton size="sm">
                        <FaEdit
                          onClick={() =>
                            router.push(`/admin/products/edit/${c.id}`)
                          }
                        />
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
  },
);
