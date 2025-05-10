import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { toJS } from "mobx";
import { FaPen, FaTrash } from "@meronex/icons/all";
import "./ListCRUDItems.scss";
import { CRUDStore } from "../../state/CRUDStore";
import { Sort } from "../../util/sort/Sort";
import { Button } from "../form/Button";
import { IconButton } from "../form/IconButton";
import { HStack } from "../layout/HStack";

export const ListCRUDItems = observer(
  ({
    onCreate,
    store,
    ...props
  }: {
    editionMode?: boolean;
    store: CRUDStore<any>;
    onCreate: () => void;
    onDelete: (el: any) => void;
    onUpdate: (el: any) => void;
  }) => {
    const { t } = useTranslation();

    const funcs = toJS(store.state.data).sort(
      Sort.String.AscMapped((f) => t(f.title!)),
    );

    return (
      <ul className={"crud_list__root"}>
        <Button variant={"ghost"} onClick={() => onCreate()}>
          {t("new_crud_item")}
        </Button>
        {funcs.map((current) => (
          <li key={current.id} className="crud_list__child">
            <FnRenderer {...props} element={current} />
          </li>
        ))}
      </ul>
    );
  },
);

const FnRenderer = observer(
  ({
    editionMode,
    element,
    onUpdate,
    onDelete,
  }: {
    editionMode?: boolean;
    element: any;
    onDelete: (el: any) => void;
    onUpdate: (el: any) => void;
  }) => {
    const { t } = useTranslation();
    const title = t(element.title!);

    const label = editionMode ? (
      title
    ) : (
      <span className="crud_list__label">
        {title}
        <HStack>
          <IconButton
            variant={"ghost"}
            type={"button"}
            onClick={() => {
              onUpdate(element);
            }}
            size={"sm"}
          >
            <FaPen />
          </IconButton>
          <IconButton
            variant={"ghost"}
            type={"button"}
            onClick={() => {
              onDelete(element);
            }}
            size={"sm"}
          >
            <FaTrash />
          </IconButton>
        </HStack>
      </span>
    );

    return <div className="curd_item">{label}</div>;
  },
);
