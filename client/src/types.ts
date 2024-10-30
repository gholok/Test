export type CarValues = {
    Mark: string;
    Model: string;
}

export type CarKey = {
    id_Car: number;
}

export type Car = CarKey & CarValues;