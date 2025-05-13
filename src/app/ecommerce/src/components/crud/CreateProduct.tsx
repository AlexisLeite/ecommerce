import { CategoriesListStore } from "@/src/store/CategoriesStore";
import { TCreateProduct } from "@/src/store/server/ProductsServer";
import {
  Button,
  Form,
  ImagesUploader,
  ValidatableField,
  ValidatableForm,
  ValidationField,
  ValidationInput,
  ValidationTextarea,
} from "common";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const createProductForm = new ValidatableForm<
  TCreateProduct & { id?: number }
>({
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
  images: new ValidatableField<number[]>({
    name: "images",
    title: "Imagenes",
    value: [],
  }),
  categories: new ValidatableField<number[]>({
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
        <ValidationField text="Imagenes">
          <ImagesUploader
            apiEndpoint="/api/images"
            onUploaded={(ev) => {
              createProductForm.getField("images").storeValue.push(ev);
            }}
            images={createProductForm
              .getField("images")
              .storeValue.map((c: number) => (
                <img alt="" width={170} height={114} src={`/api/images/${c}`} />
              ))}
          />
        </ValidationField>
        <Button type="submit">Confirmar</Button>
      </Form>
    );
  },
);
