import { VerticalNavigation } from "@/src/components/ui/VerticalNavigation";
import { ListItem } from "common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export const AdminAsideNavigation = () => {
  const { t } = useTranslation();
  const path = usePathname();

  return (
    <VerticalNavigation>
      <ListItem>
        <Link
          className={path.endsWith("/admin") ? "active_tab" : ""}
          href="/admin"
        >
          {t("Inicio")}
        </Link>
      </ListItem>
      <ListItem>
        <Link
          className={path.includes("/categories") ? "active_tab" : ""}
          href="/admin/categories"
        >
          {t("Categorias")}
        </Link>
      </ListItem>
      <ListItem>
        <Link
          className={path.includes("/products") ? "active_tab" : ""}
          href="/admin/products"
        >
          {t("Productos")}
        </Link>
      </ListItem>
      <ListItem>
        <Link
          className={path.includes("/images") ? "active_tab" : ""}
          href="/admin/images"
        >
          {t("Imágenes")}
        </Link>
      </ListItem>
      <ListItem>
        <Link
          className={path.includes("/batch") ? "active_tab" : ""}
          href="/admin/batch"
        >
          {t("Batch")}
        </Link>
      </ListItem>
    </VerticalNavigation>
  );
};
