import { Api } from '../base/Api';
import { ApiPostMethods, IApi, ObjectApi } from '../../types/index';

export class WebLarekApi implements IApi {
  private _api: Api
  protected data: ObjectApi

  constructor(objectApi: ObjectApi, baseUrl: string, options: RequestInit = {}) {
    this.data = objectApi
    this._api = new Api(baseUrl, options)
  }

  get<T extends object>(uri: string = '/product/') {
    return this._api.get<T>(uri);
  }
  
  post<T extends object>(uri: string = '/order/', data: object, method: ApiPostMethods = 'POST') {
    return this._api.post<T>(uri, data, method)
  }

}