import { CategoriesListStore } from "@/src/store/products/CategoriesStore";
import { TCreateCategory } from "@/src/store/products/server/CategoriesServer";
import {
  Button,
  Form,
  ImagesUploader,
  ValidatableField,
  ValidatableForm,
  ValidationField,
  ValidationInput,
  ValidationSelect,
  ValidationTextarea,
} from "common";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useEffect } from "react";

export const createCategoryForm = new ValidatableForm<
  TCreateCategory & { id?: number }
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
  imageId: new ValidatableField<number>({
    name: "imageId",
    title: "Imagen",
    value: -1,
    required: true,
  }),
  parentId: new ValidatableField<number | null, string | null>({
    name: "parentId",
    title: "Parent",
    value: null,
    storeToSubmitValueMapping(c) {
      return c !== null ? Number.parseInt(c) : c;
    },
  }),
});

export const CreateCategory = observer(
  ({
    onCreate,
  }: {
    onCreate: (
      cat: TCreateCategory & { id?: number },
    ) => Promise<true | string>;
  }) => {
    useEffect(() => {
      CategoriesListStore.getInstance().refreshAllCategories();
    }, []);

    return (
      <Form
        onSubmit={async (ev) => {
          ev.preventDefault();
          const result = await createCategoryForm.validate();
          if (result === true) {
            const category = createCategoryForm.getMappedObject();
            onCreate(category);
          }
        }}
      >
        <ValidationInput field={createCategoryForm.getField("name")} />
        <ValidationTextarea
          field={createCategoryForm.getField("description")}
        />
        <ValidationField text="Imagen">
          <ImagesUploader
            apiEndpoint="/api/images"
            onUploaded={(ev) => {
              createCategoryForm.getField("imageId").setValue(ev);
            }}
            maxImages={1}
            images={
              createCategoryForm.getField("imageId").storeValue !== -1
                ? [
                    <Image
                      alt=""
                      width={170}
                      height={114}
                      src={`/api/images/${createCategoryForm.getField("imageId").storeValue}`}
                    />,
                  ]
                : undefined
            }
          />
        </ValidationField>
        <ValidationSelect field={createCategoryForm.getField("parentId")}>
          <option></option>
          {CategoriesListStore.getInstance()
            .allCategories.filter(
              (c) => c.id !== createCategoryForm.getField("id").storeValue,
            )
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </ValidationSelect>
        <Button type="submit">Confirmar</Button>
      </Form>
    );
  },
);
