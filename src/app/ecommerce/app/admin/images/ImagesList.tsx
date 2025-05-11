"use client";

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
import { FaTrash } from "@meronex/icons/fa";
import { observer } from "mobx-react-lite";
import {
  ImagesListStore,
  TImageListData,
} from "@/src/store/products/ImagesStore";

export const ImagesList = ({
  data,
}: {
  data?: TCRUDStorePagination<TImageListData>;
}) => {
  return (
    <>
      <ProductsListRender data={data} />
    </>
  );
};

const ProductsListRender = observer(
  ({ data }: { data?: TCRUDStorePagination<TImageListData> }) => {
    const store = ImagesListStore.getInstance(data);
    const { t } = useTranslation();

    return (
      <Stack>
        <div className="table_wrapper">
          {store.error}
          <Table>
            <THead>
              <Row>
                <HeaderCell>{t("Acciones")}</HeaderCell>
                <HeaderCell>{t("Id")}</HeaderCell>
                <HeaderCell>{t("Título")}</HeaderCell>
                <HeaderCell>{t("Imágen")}</HeaderCell>
              </Row>
            </THead>
            <TBody>
              {store.images.map((c) => (
                <Row key={c.id}>
                  <Cell>
                    <HStack>
                      <IconButton size="sm">
                        <FaTrash onClick={() => store.delete(c.id)} />
                      </IconButton>
                    </HStack>
                  </Cell>
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
