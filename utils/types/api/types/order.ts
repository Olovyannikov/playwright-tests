export interface Order {
    id: number;
    petId: number;
    quantity: number;
    shipDate: Date | string;
    status: string;
    complete: boolean;
}

export interface UpdateOrder extends Partial<Omit<Order, 'id'>> {}
