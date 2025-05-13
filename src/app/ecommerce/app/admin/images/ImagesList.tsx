"use client";

import {
  Cell,
  HeaderCell,
  HStack,
  IconButton,
  Pagination,
  Row,
  Square,
  Stack,
  Table,
  TBody,
  TCRUDStorePagination,
  THead,
  WhenInsideScreen,
} from "common";
import { useTranslation } from "react-i18next";
import { FaPlus, FaTrash } from "@meronex/icons/fa";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import Image from "next/image";
import { TImageListData, ImagesListStore } from "@/src/store/ImagesStore";

export const ImagesList = ({
  data,
}: {
  data?: TCRUDStorePagination<TImageListData>;
}) => {
  return (
    <>
      <ImagesListRender data={data} />
    </>
  );
};

const ImagesListRender = observer(
  ({ data }: { data?: TCRUDStorePagination<TImageListData> }) => {
    const store = ImagesListStore.getInstance(data);
    const { t } = useTranslation();

    return (
      <Stack className="main__section">
        <div style={{ position: "absolute" }}>
          <WhenInsideScreen onInside={() => store.refresh()} />
        </div>
        <div className="table_wrapper">
          {store.error}
          <Table>
            <THead>
              <Row>
                <HeaderCell width={"10%"}>{t("Acciones")}</HeaderCell>
                <HeaderCell width={"60%"}>{t("Título")}</HeaderCell>
                <HeaderCell width={"20%"}>{t("Imágen")}</HeaderCell>
                <HeaderCell width={"10%"}>{t("Id")}</HeaderCell>
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
                  <Cell>{c.title}</Cell>
                  <Cell>
                    <Square size={130}>
                      <Image
                        alt=""
                        width={130}
                        height={130}
                        src={`/api/images/${c.id}`}
                      />
                    </Square>
                  </Cell>
                  <Cell>{c.id}</Cell>
                </Row>
              ))}
            </TBody>
          </Table>
        </div>
        <HStack className="footer_section">
          <Pagination store={store} />
          <Link href="/admin/images/create">
            <IconButton>
              <FaPlus />
            </IconButton>
          </Link>
        </HStack>
      </Stack>
    );
  },
);
