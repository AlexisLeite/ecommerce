import { Product } from "@prisma/client";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { refresh, TPage } from "./server/refresh";
import { removeProduct } from "./server/removeProduct";

export class ProductsStore {
  private loading = 0;
  private page: TPage<Product> = {
    currentPage: 1,
    data: [],
    pages: 1,
  };

  constructor(data: TPage<Product>) {
    this.page = data;
    makeAutoObservable(this);
  }

  public get currentPage() {
    return this.page.currentPage;
  }

  public get isLoading() {
    return this.loading > 0;
  }

  public get hasMore() {
    return this.page.currentPage < this.page.pages;
  }

  public get hasPrevious() {
    return this.page.currentPage > 1;
  }

  public get products() {
    return this.page.data;
  }

  public async next() {
    this.loading++;
  }

  public async previous() {
    this.loading--;
  }

  public async refresh() {
    this.asyncFn(async () => {
      const page = await refresh(this.page.currentPage);
      runInAction(() => {
        this.page = page;
      });
    });
  }

  public async remove(product: Product) {
    this.asyncFn(async () => {
      await removeProduct(toJS(product));
      this.refresh();
    });
  }

  private async asyncFn<T>(fn: () => Promise<T>): Promise<T> {
    this.loading++;
    try {
      return await fn();
    } finally {
      runInAction(() => {
        this.loading--;
      });
    }
  }
}
