import { CategoriesListStore } from "@/src/store/CategoriesStore";
import {
  TCreateProduct,
  TProductListData,
} from "@/src/store/server/ProductsServer";
import {
  ArrayValidatableField,
  Button,
  FieldWithoutLabel,
  Form,
  ImagesUploader,
  PickedImageBox,
  PickedItemBox,
  ValidatableField,
  ValidatableForm,
  ValidationInput,
  ValidationTextarea,
} from "common";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { IconButton } from "../../../../../lib/common/src/components/form/IconButton";
import { FaPlus } from "@meronex/icons/fa";
import { pickCategories } from "@/src/components/modals/CategoriesModal";
import { Category } from "@prisma/client";

export const createProductForm = new ValidatableForm<TProductListData>({
  id: new ValidatableField({
    name: "id",
    title: "",
    required: false,
    value: undefined,
  }),
  name: new ValidatableField({
    name: "name",
    title: "Nombre",
    value: "",
    required: true,
  }),
  description: new ValidatableField({
    name: "description",
    title: "Descripción",
    value: "",
    required: true,
  }),
  images: new ArrayValidatableField<{ id: number }[]>({
    name: "images",
    title: "Imagenes",
    value: [],
  }),
  categories: new ArrayValidatableField<Pick<Category, "id" | "name">[]>({
    name: "categories",
    title: "Categorías",
    value: [],
  }),
  price: new ValidatableField<number, string>({
    name: "price",
    title: "Precio",
    value: "",
    required: true,
    storeToSubmitValueMapping(v) {
      return Number.parseFloat(v);
    },
  }),
});

export const CreateProduct = observer(
  ({
    onCreate,
  }: {
    onCreate: (cat: TCreateProduct & { id?: number }) => Promise<true | string>;
  }) => {
    useEffect(() => {
      CategoriesListStore.getInstance().refreshAllCategories();
    }, []);

    return (
      <Form
        onSubmit={async (ev) => {
          ev.preventDefault();
          onCreate;
          const result = await createProductForm.validate();
          if (result === true) {
            const product = createProductForm.getMappedObject();
            console.log(product);
            onCreate(product);
          }
        }}
      >
        <ValidationInput field={createProductForm.getField("name")} />
        <ValidationTextarea field={createProductForm.getField("description")} />
        <ValidationInput field={createProductForm.getField("price")} />
        <FieldWithoutLabel text="Imagenes">
          <ImagesUploader
            apiEndpoint="/api/images"
            onUploaded={(ev) => {
              createProductForm
                .getField<{ id: number }[]>("images")
                .storeValue.push({ id: ev });
            }}
            images={createProductForm
              .getField<{ id: number }[]>("images")
              .storeValue.map((c) => (
                <PickedImageBox
                  onClose={() => {
                    createProductForm
                      .getArrayField<{ id: number }[]>("images")
                      .filter((s) => s !== c);
                  }}
                >
                  <img
                    alt=""
                    width={170}
                    height={114}
                    src={`/api/images/${c.id}`}
                  />
                </PickedImageBox>
              ))}
          />
        </FieldWithoutLabel>
        <FieldWithoutLabel text="Categorías">
          {createProductForm
            .getField<Category[]>("categories")
            .storeValue.map((c) => (
              <PickedItemBox
                label={c.name}
                onClose={() => {
                  createProductForm
                    .getArrayField<Category[]>("categories")
                    .filter((s) => s !== c);
                }}
              />
            ))}
          <IconButton
            onClick={() => {
              pickCategories().then((res) => {
                createProductForm
                  .getArrayField("categories")
                  .storeValue.push(
                    ...res.filter(
                      (c) =>
                        !createProductForm
                          .getField<Category[]>("categories")
                          .storeValue.find((s) => s.id === c.id),
                    ),
                  );
              });
            }}
          >
            <FaPlus />
          </IconButton>
        </FieldWithoutLabel>
        <Button type="submit">Confirmar</Button>
      </Form>
    );
  },
);
