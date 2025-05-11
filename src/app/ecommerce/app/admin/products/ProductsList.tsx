"use client";

import {
  ProductsListStore,
  TProductListData,
} from "@/src/store/products/ProductsStore";
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
        <div className="table_wrapper">
          {store.error}
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
