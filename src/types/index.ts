export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'cash' | 'card' | '';

export type PostData = IBuyer & {
    total: number,
    items: string[];
}

export type OrderResponse = {
    total: number,
    id: string;
}

export type ObjectApi = {
    total: number,
    items: IProduct[];
}

export type Errors = {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string
}

export interface IApi {
    get<T extends object>(url: string): Promise<T>;
    post<T extends object>(url: string, data: object, method?: ApiPostMethods): Promise<T>;
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

export interface ICardActions {
    onClick?: () => void; 
    onDelete?: () => void;
    onBuy?: () => void;
    onOrder?: ()=> void;
}