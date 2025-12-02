'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from '../supabase/server';
import { Volunteer } from './types';
import { PostgrestError } from "@supabase/supabase-js";
import { signUp } from '../auth/actions';

export async function GetVolunteers(){

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if ( !user ){
        throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
  .from("volunteers")
  .select(`
    *,
    volunteer_availability (*)
  `) as { data: Volunteer[] | null; error: PostgrestError | null };
    console.log(data);
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
    .select('*, volunteer_availability (*)')
    .eq('id', id)
    .single() as { data: Volunteer; error: PostgrestError | null}
    
    return data;
}

export async function UpdateVolunteer(id: string, formdata: FormData){

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if( !user ){
        throw new Error("User not authenticated");
    }

    const originalVolunteer = await GetVolunteerById(id);

    const updatedVolunteer = {

        first_name: formdata.get('first_name'),
        last_name: formdata.get('last_name'),
        
    }
}

export async function CreateVolunteer(formData: FormData){

    //sign up user
    //get id
    //create all tables with id

    const supabase = await createClient();

    const signUpData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { data, error } = await supabase.auth.signUp(signUpData);

  if( error ){
    //do stuff
  }

  const volunteerId = data.user?.id;

  //await supabase
 // await supabase.from('volunteers').insert()

}

