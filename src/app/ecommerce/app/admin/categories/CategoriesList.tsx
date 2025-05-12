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
import { useRouter } from "next/navigation";
import {
  CategoriesListStore,
  TCategoryListData,
} from "@/src/store/products/CategoriesStore";
import { UploadedImage } from "@/src/components/ui/UploadedImage";
import {
  CreateCategory,
  createCategoryForm,
} from "@/src/components/crud/CreateCategory";

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
    const router = useRouter();

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
              </Row>
            </THead>
            <TBody>
              {store.categories.map((c) => (
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
                </Row>
              ))}
            </TBody>
          </Table>
        </div>
        <HStack className="footer_section">
          <Pagination store={store} />
          <IconButton
            onClick={() => {
              const drawer = new Drawer({
                content: (
                  <div className="create_category_drawer">
                    <CreateCategory
                      onCreate={() => {
                        drawer.close();
                        store.refresh();
                      }}
                    />
                  </div>
                ),
                title: "First drawer",
                onClose: () => {
                  createCategoryForm.reset();
                },
              });
              ModalsController.instance.append(drawer);
            }}
          >
            <FaPlus />
          </IconButton>
        </HStack>
      </Stack>
    );
  },
);
