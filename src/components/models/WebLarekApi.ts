import { IApi, ObjectApi, PostData } from "../../types";

export class WebLarekApi {
  constructor(private api: IApi) {
  }

  getProducts(): Promise<ObjectApi> {
    return this.api.get<ObjectApi>('/product');
  }

  postProducts(data: PostData): Promise<ObjectApi> {
    return this.api.post<ObjectApi>('/order', data);
  }
}