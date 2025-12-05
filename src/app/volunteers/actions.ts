'use server'

import { createClient } from '../supabase/server';
import { Volunteer } from './types';
import { PostgrestError } from "@supabase/supabase-js";

//todo
//add error handling
export async function GetVolunteers() {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("volunteers")
    .select(`
    *,
    volunteer_availability (*)
  `) as { data: Volunteer[] | null; error: PostgrestError | null };

  if (error) {

    throw new Error("Failed to fetch volunteers");
  }
  return data;
}


//todo
//add error handling
//add fetch for events

export async function GetVolunteerById(id: string): Promise<Volunteer> {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from('volunteers')
    .select('*, volunteer_availability (*), volunteer_documents (*)')
    .eq('id', id)
    .single() as { data: Volunteer; error: PostgrestError | null }

  if (error) {
    throw new Error("Failed to fetch volunteer");
  }

  console.log(data);
  return data;
}

//todo - createUpdate volunteer
//form handling
//error handling
//change history handling




