import { observer } from "mobx-react-lite";
import {
  AiFillHome,
  FaArrowLeft,
  FaArrowRight,
  FaSync,
} from "@meronex/icons/all";
import { CRUDStore } from "../../state/CRUDStore";
import { IconButton } from "../form/IconButton";

export const Pagination = observer(({ store }: { store: CRUDStore<any> }) => {
  return (
    <div className={"pagination"}>
      <IconButton
        disabled={store.state.loading > 0 || store.state.currentPage === 1}
        onClick={() => {
          store.gotoPage(1);
        }}
      >
        <AiFillHome />
      </IconButton>
      <IconButton
        disabled={store.state.loading > 0 || store.state.currentPage === 1}
        onClick={() => {
          store.gotoPage(Math.max(0, store.state.currentPage - 1));
        }}
      >
        <FaArrowLeft />
      </IconButton>
      <div className={"current_page"}>{store.state.currentPage}</div>
      <IconButton
        disabled={
          store.state.loading > 0 ||
          store.state.currentPage === store.state.totalPages
        }
        onClick={() => {
          store.gotoPage(store.state.currentPage + 1);
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
