'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from '../supabase/server';
import { Volunteer } from './types';
import { PostgrestError } from "@supabase/supabase-js";

export async function GetVolunteers(){

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if ( !user ){
        throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
        .from('volunteers')
        .select('*') as { data: Volunteer[] | null; error: PostgrestError | null };

    
    return data; 
}

export async function GetVolunteerById(id: string): Promise<Volunteer>{

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if ( !user ){
        throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
    .from('volunteers')
    .select('*')
    .eq('id', id)
    .single() as { data: Volunteer; error: PostgrestError | null}
    
    return data;
}

export async function UpdateVolunteer(id: string, formdata: FormData){}