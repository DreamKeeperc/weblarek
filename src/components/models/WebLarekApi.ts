import { IApi, ObjectApi, OrderResponse, PostData} from "../../types";

export class WebLarekApi {
  constructor(private api: IApi) {
  }

  getProducts(): Promise<ObjectApi> {
    return this.api.get<ObjectApi>('/product');
  }

  postProducts(data: PostData): Promise<OrderResponse> { 
    return this.api.post<OrderResponse>('/order', data); 
  } 
}