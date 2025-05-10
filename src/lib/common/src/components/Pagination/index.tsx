import { observer } from "mobx-react-lite";
import {
  AiFillHome,
  FaArrowLeft,
  FaArrowRight,
  FaSync,
} from "@meronex/icons/all";
import "./Pagination.scss";
import { CRUDStore } from "../../state/CRUDStore";
import { IconButton } from "../form/IconButton";

export const Pagination = observer(({ store }: { store: CRUDStore<any> }) => {
  return (
    <div className={"pagination"}>
      <IconButton
        disabled={store.state.loading > 0 || store.state.page === 0}
        onClick={() => {
          store.gotoPage(0);
        }}
      >
        <AiFillHome />
      </IconButton>
      <IconButton
        disabled={store.state.loading > 0 || store.state.page === 0}
        onClick={() => {
          store.gotoPage(Math.max(0, store.state.page - 1));
        }}
      >
        <FaArrowLeft />
      </IconButton>
      <div className={"current_page"}>{store.state.page + 1}</div>
      <IconButton
        disabled={store.state.loading > 0}
        onClick={() => {
          store.gotoPage(store.state.page + 1);
        }}
      >
        <FaArrowRight />
      </IconButton>
      <IconButton
        disabled={store.state.loading > 0}
        onClick={() => {
          store.refresh();
        }}
      >
        <FaSync />
      </IconButton>
    </div>
  );
});
