export interface Volunteer {
    id: string;
    created_at: string;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;

    documents: {
        url: string;
        name: string;
        size: number;
        type: string;
    } | null;

    is_processed: boolean | null; 
    address: string | null;
    address_line_two: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    roles: string[] | null;

    volunteer_availability: Availability;

}

export interface Documents{
    url: string;
    name: string;
    size: number;
    type: string;
}

export interface Availability {
  id: string;
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
}



export interface FilterAvailableData{
    
    monday: {
        morning: Boolean;
        afternoon: Boolean;
        evening: Boolean;
    };
    tuesday: {
        morning: Boolean;
        afternoon: Boolean;
        evening: Boolean;
    };
    wednesday: {
        morning: Boolean;
        afternoon: Boolean;
        evening: Boolean;
    };
    thursday: {
        morning: Boolean;
        afternoon: Boolean;
        evening: Boolean;
    };
    friday: {
        morning: Boolean;
        afternoon: Boolean;
        evening: Boolean;
    };
    saturday: {
        morning: Boolean;
        afternoon: Boolean;
        evening: Boolean;
    };
    sunday: {
        morning: Boolean;
        afternoon: Boolean;
        evening: Boolean;
    };

};

export interface FilterData{
    days: string[],
    times: string[],
    roles: string[],
}
