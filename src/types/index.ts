export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'cash' | 'card' | '';
export type ObjectApi = {
    total: number,
    items: IProduct[]
}
export type validationErrors = {
    email?: string;
    phone?: string;
    address?: string;
    payment?: string;
}

export type validationResult = {
    isValid: boolean;
    data?: IBuyer;
    errors?: validationErrors;
}

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}