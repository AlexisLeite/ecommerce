"use client";

import { ProductsListStore } from "@/src/store/ProductsStore";
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
  Drawer,
  ModalsController,
} from "common";
import { useTranslation } from "react-i18next";
import { FaEdit, FaTrash, FaPlus } from "@meronex/icons/fa";
import { observer } from "mobx-react-lite";
import { createCategoryForm } from "@/src/components/crud/CreateCategory";
import {
  create,
  TProductListData,
  TUpdateProduct,
  update,
} from "@/src/store/server/ProductsServer";
import { parseServerResponse } from "@/src/store/server/processServerResponse";
import { CreateProduct, createProductForm } from "./CreateProduct";
import FallbackImage from "../ui/FallbackImage";

function productEdition(product?: TProductListData) {
  const store = ProductsListStore.getInstance();

  const drawer = new Drawer({
    content: (
      <div className="create_product_drawer">
        <CreateProduct
          onCreate={async (product) => {
            try {
              if (product.id) {
                await parseServerResponse(
                  update(product as TUpdateProduct),
                  () => {
                    throw "";
                  },
                );
              } else {
                await parseServerResponse(create(product), () => {
                  throw "";
                });
              }

              drawer.close();
              store.refresh();
            } catch (e) {
              console.error(e);
              return String(e);
            }
            return true;
          }}
        />
      </div>
    ),
    title: "First drawer",
    onClose: () => {
      createCategoryForm.reset();
    },
  });

  ModalsController.instance.modals.values().forEach((c) => {
    if (c instanceof Drawer) {
      c.close();
    }
  });

  createProductForm.reset();
  if (product) {
    createProductForm.update(product);
  }

  ModalsController.instance.append(drawer);
}

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
                <HeaderCell width="10%">{t("Imagen")}</HeaderCell>
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
                      <IconButton size="sm" onClick={() => productEdition(c)}>
                        <FaEdit />
                      </IconButton>
                      <IconButton size="sm" onClick={() => store.delete(c.id)}>
                        <FaTrash />
                      </IconButton>
                    </HStack>
                  </Cell>
                  <Cell>
                    <FallbackImage
                      alt=""
                      width="70"
                      height="50"
                      src={`/api/images/${c.images[0]?.id}`}
                      fallbackSrc="/no-product.jpg"
                    />
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
        <HStack className="footer_section">
          <Pagination store={store} />
          <IconButton onClick={() => productEdition()}>
            <FaPlus />
          </IconButton>
        </HStack>
      </Stack>
    );
  },
);
