import { BaseModal, MDRender, TModalSize } from "common";
import { TFunction } from "i18next";
import { ReactNode } from "react";

export class BatchInstructionsModal extends BaseModal {
  protected getModalSize(): TModalSize {
    return "md";
  }

  protected getBehavior(): { closeOnOverlayClick: boolean } {
    return { closeOnOverlayClick: true };
  }

  protected getModalContent(
    _t: TFunction<"translation", undefined>,
  ): ReactNode {
    return (
      <MDRender
        ref={(el) =>
          el
            ?.querySelectorAll("a")
            .forEach((c) => (c.download = c.href.split("/").at(-1)!))
        }
        onClickCapture={(ev) => {
          if (ev.target instanceof HTMLElement && ev.target.closest("a")) {
            ev.stopPropagation();
          }
        }}
      >
        {`
## Instrucciones para la carga batch de contenido

Para subir contenido a tu portal de eCommerce, sigue estos pasos:

1. **Prepara un archivo ZIP**
   - Incluye una carpeta \`images\` con las imágenes como hijas directas.
   - En la raíz del ZIP, coloca el archivo \`definition.xls\`.  
     Descarga el documento base [aquí](/samples/batch/definition.xls).
   - Puedes descargar un zip con ejemplos [aquí](/samples/batch/sample-batch.zip).

2. **Estructura de \`definition.xls\`**
   - **Hoja _Categorías_**  
     Debe contener, como mínimo, las siguientes columnas:  
     - \`Nombre\`: Nombre de la categoría  
     - \`Descripción\`: Descripción de la categoría  
     - \`Imagen\`: Nombre de archivo de la imagen asociada (debe estar en el zip)
     - \`Padre\`: Nombre de la categoría padre (opcional, debe ser idéntico)
   - **Hoja _Productos_**  
     Debe contener, como mínimo, las siguientes columnas:  
     - \`id\`: Identificador único del producto  
     - \`nombre\`: Nombre del producto  
     - \`descripcion\`: Descripción detallada  
     - \`precio\`: Precio (formato numérico)  
     - \`imagenes\`: Lista separada por comas de nombres de archivo de imágenes  
     - \`categorias\`: Lista separada por comas de IDs de categorías

3. **Carga en el portal**
   - Ve a **Carga Batch** en el panel de administración.
   - Selecciona el archivo ZIP y haz clic en **Subir**.

4. **Proceso de importación**
   - **Imágenes**: Se darán de alta todas las imágenes del ZIP.  
   - **Categorías**: Se crearán las categorías y se vincularán a sus imágenes y categorías padre (si aplica).  
   - **Productos**: Se crearán los productos, se asociarán sus imágenes y se asignarán a sus categorías.

5. **Transacción atómica**
   - Si ocurre cualquier error durante el proceso, **no se guardará ningún registro**.  
     El sistema revertirá todos los cambios para garantizar consistencia.

 `}
      </MDRender>
    );
  }
  protected getModalTitle(_t: TFunction<"translation", undefined>): string {
    return "Instrucciones para subir en batch";
  }
}
