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
    volunteer_documents: Documents[];

}



export interface Documents{
    id: string;
    uploaded_at: string;
    volunteer_id: string;
    file_name: string;
    file_size: number;
    document_type: string;
    document_status: string;
    url: string;
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

export interface FilterData{
    days: string[],
    times: string[],
    roles: string[],
}
