import {
  create,
  TCreateCategory,
} from "@/src/store/products/server/CategoriesServer";
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
import Image from "next/image";
import { useState } from "react";

export const createCategoryForm = new ValidatableForm<TCreateCategory>({
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
  }),
});

export const CreateCategory = ({ onCreate }: { onCreate: () => unknown }) => {
  const [images, setImages] = useState<number[]>([]);
  const [error, setError] = useState("");

  return (
    <Form
      onSubmit={async (ev) => {
        ev.preventDefault();
        const result = await createCategoryForm.validate();
        if (result === true) {
          const category = createCategoryForm.getMappedObject();
          const result = await create(category);

          if (result) {
            onCreate();
          } else {
            setError("Error al crear la categoría. Intente otra vez");
          }
        }
      }}
    >
      {error}
      <ValidationInput field={createCategoryForm.getField("name")} />
      <ValidationTextarea field={createCategoryForm.getField("description")} />
      <ValidationField text="Imagen">
        <ImagesUploader
          apiEndpoint="/api/images"
          onUploaded={(ev) => {
            setImages((c) => [...c, ev]);
            createCategoryForm.getField("imageId").setValue(ev);
          }}
          maxImages={1}
          images={images.map((c) => (
            <Image
              key={c}
              alt=""
              width={170}
              height={114}
              src={`/api/images/${c}`}
            />
          ))}
        />
      </ValidationField>
      <Button type="submit">Confirmar</Button>
    </Form>
  );
};
