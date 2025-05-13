"use client";

import {
  Cell,
  Drawer,
  HeaderCell,
  HStack,
  IconButton,
  ModalsController,
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
import { FaEdit, FaTrash, FaPlus } from "@meronex/icons/fa";
import { observer } from "mobx-react-lite";
import { CategoriesListStore } from "@/src/store/products/CategoriesStore";
import { UploadedImage } from "@/src/components/ui/UploadedImage";
import {
  CreateCategory,
  createCategoryForm,
} from "@/src/components/crud/CreateCategory";
import { Category } from "@prisma/client";
import {
  create,
  update,
  TUpdateCategory,
  TCategoryListData,
} from "@/src/store/products/server/CategoriesServer";
import { parseServerResponse } from "@/src/store/products/server/processServerResponse";

function categoryEdition(category?: Category) {
  const store = CategoriesListStore.getInstance();

  const drawer = new Drawer({
    content: (
      <div className="create_category_drawer">
        <CreateCategory
          onCreate={async (category) => {
            try {
              if (category.id) {
                await parseServerResponse(
                  update(category as TUpdateCategory),
                  () => {
                    throw "";
                  },
                );
              } else {
                await parseServerResponse(create(category), () => {
                  throw "";
                });
              }

              drawer.close();
              store.refresh();
            } catch (e) {
              console.error(e);
              return "Error al crear la categoría. Intente otra vez";
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
  createCategoryForm.reset();
  if (category) {
    createCategoryForm.update(category);
  }

  ModalsController.instance.append(drawer);
}

export const CategoriesList = ({
  data,
}: {
  data?: TCRUDStorePagination<TCategoryListData>;
}) => {
  return (
    <>
      <CategoriesListRender data={data} />
    </>
  );
};

const CategoriesListRender = observer(
  ({ data }: { data?: TCRUDStorePagination<TCategoryListData> }) => {
    const store = CategoriesListStore.getInstance(data);
    const { t } = useTranslation();

    return (
      <Stack>
        <div style={{ position: "absolute" }}>
          <WhenInsideScreen onInside={() => store.refresh()} />
        </div>
        <div className="table_wrapper categories_list">
          {store.error}
          <Table>
            <THead>
              <Row>
                <HeaderCell width="10%">{t("Acciones")}</HeaderCell>
                <HeaderCell width="10%">{t("Imagen")}</HeaderCell>
                <HeaderCell width="20%">{t("Nombre")}</HeaderCell>
                <HeaderCell width="50%">{t("Descripción")}</HeaderCell>
                <HeaderCell width="50%">{t("Padre")}</HeaderCell>
              </Row>
            </THead>
            <TBody>
              {store.categories.map((c) => (
                <Row key={c.id}>
                  <Cell>
                    <HStack>
                      <IconButton size="sm" onClick={() => categoryEdition(c)}>
                        <FaEdit />
                      </IconButton>
                      <IconButton size="sm" onClick={() => store.delete(c.id)}>
                        <FaTrash />
                      </IconButton>
                    </HStack>
                  </Cell>
                  <Cell>
                    <UploadedImage
                      className="category_image"
                      imageId={c.imageId}
                      alt={c.description}
                      width={150}
                      height={150}
                    />
                  </Cell>
                  <Cell>{c.name}</Cell>
                  <Cell>{c.description}</Cell>
                  <Cell>{c.parent?.name}</Cell>
                </Row>
              ))}
            </TBody>
          </Table>
        </div>
        <HStack className="footer_section">
          <Pagination store={store} />
          <IconButton onClick={() => categoryEdition()}>
            <FaPlus />
          </IconButton>
        </HStack>
      </Stack>
    );
  },
);
