export interface Volunteer {
    id: number;
    created_at: Date;
    fName: string;
    lName: string;
    phone: string;
    email: string;
    availability: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    };
}