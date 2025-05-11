import { VerticalNavigation } from "@/src/components/ui/VerticalNavigation";
import { ListItem } from "common";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const AdminAsideNavigation = () => {
  const { t } = useTranslation();

  return (
    <VerticalNavigation>
      <ListItem>
        <Link href="/admin">{t("Inicio")}</Link>
      </ListItem>
      <ListItem>
        <Link href="/admin/products">{t("Productos")}</Link>
      </ListItem>
      <ListItem>
        <Link href="/admin/images">{t("Imágenes")}</Link>
      </ListItem>
    </VerticalNavigation>
  );
};
