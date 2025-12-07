import { IApi, ObjectApi } from "../../types";

export class WebLarekApi {
  constructor(private api: IApi) {
  }

  getProducts(): Promise<ObjectApi> {
    return this.api.get<ObjectApi>('/product');
  }

  postProducts(data: ObjectApi): Promise<ObjectApi> {
    return this.api.post<ObjectApi>('/order', data);
  }
}