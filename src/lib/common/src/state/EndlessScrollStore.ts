import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { TCRUDStoreState, Controller } from "./CRUDStore";

export class EndlessScrollStore<DataType extends { id: number }> {
  public state: TCRUDStoreState<DataType>;

  constructor(
    protected controller: Pick<
      Controller<DataType>,
      "findPaged" | "getInitialData"
    >,
  ) {
    this.state = {
      pages: {},
      currentPage: 1,
      loading: 0,
    };

    makeObservable<this, "state">(this, {
      state: observable,
      currentPage: computed,
      isLoading: computed,
      hasPrevious: computed,
      hasMore: computed,
      asyncAction: action,
    });

    if (controller.getInitialData) {
      this.state.pages[1] = controller.getInitialData!();
    } else {
      setTimeout(() => {
        this.refresh();
      }, 1000);
    }
  }

  private lastShownPage = 1;
  public get currentPage() {
    if (this.state.pages[this.state.currentPage]) {
      this.lastShownPage = this.state.currentPage;
    }
    return (
      this.state.pages[this.state.currentPage] ||
      this.state.pages[this.lastShownPage]
    );
  }

  get isLoading() {
    return this.state.loading > 0;
  }

  public get hasPrevious() {
    return this.state.currentPage > 1;
  }

  public get hasMore() {
    return (
      this.state.currentPage <
      this.state.pages[this.state.currentPage].totalPages
    );
  }

  async asyncAction<T>(cb: () => Promise<T>): Promise<T> {
    this.state.loading++;
    try {
      return await cb();
    } finally {
      runInAction(() => {
        this.state.loading--;
      });
    }
  }

  async refresh() {
    this.asyncAction(async () => {
      const page = this.state.currentPage;
      const result = await this.controller.findPaged(page);
      if (result.success) {
        this.state.pages[1].data = [
          ...this.state.pages[1].data,
          ...result.result!.data!,
        ];
        delete this.state.revalidateError;
      } else {
        this.state.revalidateError = result.error || "Error while revalidating";
      }
    });
  }

  async loadMore() {
    this.state.currentPage++;
    await this.asyncAction(async () => {
      await this.refresh();
    });
  }
}
