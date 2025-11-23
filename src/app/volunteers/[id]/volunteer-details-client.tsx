import { Volunteer } from "../types";

export default function VolunteerDetailsClient({ volunteer }: {volunteer: Volunteer}){


    return(
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
            
                

                
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                    <div className="space-y-2">
                        <p><span className="font-medium">Email:</span> {volunteer.email}</p>
                        <p><span className="font-medium">Phone:</span> {volunteer.phone}</p>
                        <p><span className="font-medium">Joined:</span> {new Date(volunteer.created_at).toLocaleDateString()}</p>
                    </div>
                </div>

                
                <div>
                    <h2 className="text-xl font-semibold mb-3">Availability</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(volunteer.availability).map(([day, available]) => (
                            <div
                                key={day}
                                className={`p-3 rounded ${available
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
}