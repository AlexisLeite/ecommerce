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
        disabled={store.currentPage.currentPage === 1}
        onClick={() => {
          store.gotoPage(1);
        }}
      >
        <AiFillHome />
      </IconButton>
      <IconButton
        disabled={store.currentPage.currentPage === 1}
        onClick={() => {
          store.gotoPage(Math.max(0, store.currentPage.currentPage - 1));
        }}
      >
        <FaArrowLeft />
      </IconButton>
      <div className={"current_page"}>
        {store.currentPage.currentPage} / {store.currentPage.totalPages}
      </div>
      <IconButton
        disabled={
          store.currentPage.currentPage === store.currentPage?.totalPages
        }
        onClick={() => {
          store.gotoPage(store.currentPage.currentPage + 1);
        }}
      >
        <FaArrowRight />
      </IconButton>
      <IconButton
        disabled={store.isLoading}
        onClick={() => {
          store.refresh();
        }}
      >
        <FaSync />
      </IconButton>
    </div>
  );
});
