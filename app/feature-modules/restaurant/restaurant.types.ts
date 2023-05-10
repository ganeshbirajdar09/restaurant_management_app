export interface IRestaurant {
    name: string,
    _id?: string,
    location: string,
    status: string,
    ownerId: string,
    menu: string[],
}

export enum RestaurantStatus {
    Pending= "pending",
    Accepted= "accepted",
    Rejected= "rejected"
}