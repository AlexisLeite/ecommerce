import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export type TCRUDOperation<Result> = {
  success: boolean;
  result?: Result;
  error?: string;
};

export type TCRUDStorePagination<T> = {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRegisters: number;
};

export interface Controller<DataType> {
  delete(id: number): Promise<TCRUDOperation<void>>;
  findPaged: (
    page: number,
  ) => Promise<TCRUDOperation<TCRUDStorePagination<DataType>>>;
  getInitialData?: () => TCRUDStorePagination<DataType>;
  save(inst: DataType): Promise<TCRUDOperation<DataType>>;
}

export type TCRUDStoreState<DataType> = {
  currentPage: number;
  loading: number;
  pages: Record<number, TCRUDStorePagination<DataType>>;
  revalidateError?: string;
};

export class CRUDStore<DataType extends { id: number }> {
  public state: TCRUDStoreState<DataType>;

  constructor(protected controller: Controller<DataType>) {
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
      gotoPage: action,
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

  async upsert(inst: Omit<DataType, "id">) {
    await this.asyncAction(async () => {
      await this.controller.save(inst as DataType);
      await this.refresh();
    });
  }

  async delete(id: number) {
    await this.asyncAction(async () => {
      const result = await this.controller.delete(id);
      if (result.success) {
        await this.refresh();
      } else {
        this.state.revalidateError = result.error;
      }
    });
  }

  async refresh() {
    this.asyncAction(async () => {
      const page = this.state.currentPage;
      const result = await this.controller.findPaged(page);
      if (result.success) {
        this.state.pages[page] = result.result!;
        delete this.state.revalidateError;
      } else {
        this.state.revalidateError = result.error || "Error while revalidating";
      }
    });
  }

  async gotoPage(page: number) {
    this.state.currentPage = page;
    await this.asyncAction(async () => {
      await this.refresh();
    });
  }

  public next() {
    this.gotoPage(this.state.currentPage + 1);
  }

  public previous() {
    this.gotoPage(this.state.currentPage - 1);
  }
}
