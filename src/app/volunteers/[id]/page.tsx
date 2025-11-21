"use client"

import { createClient } from "@/app/supabase/client";
import { Volunteer } from "../types";
import { useState, useEffect } from "react";
import { Skeleton } from "@mantine/core";

export default function Home({ params }: { params: Promise<{ id: string }> }) {
    const [isEditView, setViewMode] = useState(false);
    const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVolunteer() {
            const volunteerId = (await params).id;
            const supabase = createClient();

            const { data: volunteerData, error } = await supabase
                .from('Volunteer')
                .select('*')
                .eq('id', volunteerId)
                .single();

            if (error) {
                console.error('Supabase error:', error);
                setLoading(false);
                return;
            }

            if (!volunteerData) {
                console.log('No volunteer found with id:', volunteerId);
                setLoading(false);
                return;
            }

            setVolunteer(volunteerData as Volunteer);
            setLoading(false);
        }

        fetchVolunteer();
    }, [params]);

    async function updateVolunteer(formData: FormData) {
        const supabase = createClient();
        
        const updatedData = {
            fName: formData.get('fName') as string,
            lName: formData.get('lName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            availability: {
                monday: formData.get('monday') === 'on',
                tuesday: formData.get('tuesday') === 'on',
                wednesday: formData.get('wednesday') === 'on',
                thursday: formData.get('thursday') === 'on',
                friday: formData.get('friday') === 'on',
                saturday: formData.get('saturday') === 'on',
                sunday: formData.get('sunday') === 'on',
            }
        };

        const { error } = await supabase
            .from('Volunteer')
            .update(updatedData)
            .eq('id', volunteer?.id);

        if (error) {
            console.error('Update error:', error);
            alert('Failed to update volunteer');
            return;
        }

        
        setVolunteer({ ...volunteer!, ...updatedData });
        setViewMode(false); // Switch back to view mode
        alert('Volunteer updated successfully!');
    }

    if (loading) {
        return <div className="p-8">
                        <Skeleton height={40} mb="lg" />
                        <Skeleton height={40} mb="lg" />
                        <Skeleton height={40} mb="lg" />
                </div>
    }

    if (!volunteer) {
        return <div className="container mx-auto p-6">Volunteer not found</div>;
    }

    const viewMode = (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  
                    <h1 className="text-3xl font-bold">
                        {volunteer.fName} {volunteer.lName}
                    </h1>
                    <button onClick={() => setViewMode(true)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Edit
                    </button>
                </div>

                {/* Contact Information */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                    <div className="space-y-2">
                        <p><span className="font-medium">Email:</span> {volunteer.email}</p>
                        <p><span className="font-medium">Phone:</span> {volunteer.phone}</p>
                        <p><span className="font-medium">Joined:</span> {new Date(volunteer.created_at).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Availability */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Availability</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(volunteer.availability).map(([day, available]) => (
                            <div
                                key={day}
                                className={`p-3 rounded ${
                                    available 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-gray-100 text-gray-500'
                                }`}
                            >
                                <span className="font-medium capitalize">{day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
//view for editing volunteers
//preload with current values
    const editMode = (
        <div className="container mx-auto p-6">
            <form action={updateVolunteer} className="bg-white shadow-md rounded-lg p-6">
                {/* Hidden input for ID */}
                <input type="hidden" name="id" value={volunteer.id} />
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">
                        Edit Volunteer
                    </h1>
                    <div className="flex gap-2">
                        <button 
                            type="button"
                            onClick={() => setViewMode(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Apply Changes
                        </button>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">First Name:</label>
                            <input 
                                type="text"
                                name="fName"
                                defaultValue={volunteer.fName}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Last Name:</label>
                            <input 
                                type="text"
                                name="lName"
                                defaultValue={volunteer.lName}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Email:</label>
                            <input 
                                type="email"
                                name="email"
                                defaultValue={volunteer.email}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Phone:</label>
                            <input 
                                type="tel"
                                name="phone"
                                defaultValue={volunteer.phone}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <span className="font-medium">Joined:</span> {new Date(volunteer.created_at).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                {/* Availability */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Availability</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(volunteer.availability).map(([day, available]) => (
                            <label
                                key={day}
                                className="flex items-center p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50"
                            >
                                <input
                                    type="checkbox"
                                    name={day}
                                    defaultChecked={available}
                                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="font-medium capitalize">{day}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );

    return isEditView ? editMode : viewMode;
}