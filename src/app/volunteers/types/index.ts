export interface Volunteer {
    id: number;
    created_at: Date;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;

    documents: {
        url: string;
        name: string;
        size: number;
        type: string;
    }

    is_processed: boolean; 
    
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