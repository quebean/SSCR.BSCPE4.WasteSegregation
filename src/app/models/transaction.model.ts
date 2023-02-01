export interface Transaction {
    _id?: string,
    tagId: string,
    metal: number,
    plastic: number,
    paper: number,
    createdAt?: Date,
    updatedAt?: Date
}