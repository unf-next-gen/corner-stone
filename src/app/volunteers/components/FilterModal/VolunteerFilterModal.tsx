'use client'
import React, { useState } from "react";
import { Button } from "@mantine/core";

type FilterData = {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
};

type volunteerFilterModalProps = {
    isOpen: boolean; //isOpen to display
    onExit: () => void; //callback function to exit out of modal
    onSubmit: (filterData: FilterData) => void;
}


export default function VolunteerFilterModal({ isOpen, onExit, onSubmit }: volunteerFilterModalProps) {
    const [selectedDays, setDays] = useState<string[]>([]);

    if (!isOpen) return null;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    // Removed unused times variable

    const handleSelect = (day: string) => {
        setDays(prev => prev.includes(day)
            ? prev.filter(d => d !== day)
            : [...prev, day]);
    };

     const handleSubmit = () => {
        const filterData: FilterData = {
            monday: selectedDays.includes('Monday'),
            tuesday: selectedDays.includes('Tuesday'),
            wednesday: selectedDays.includes('Wednesday'),
            thursday: selectedDays.includes('Thursday'),
            friday: selectedDays.includes('Friday'),
            saturday: selectedDays.includes('Saturday'),
            sunday: selectedDays.includes('Sunday'),
        };
        onSubmit(filterData);
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-lg shadow-md max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* <Button onClick={onExit}> x </Button> */}
                <div className="p-6 space-y-6">
                    {/* main content */}
                    <div>
                        <h3 className="text-lg font-medium mb-3">Days of the Week</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {days.map(day => (
                                <button key={day} onClick={() => handleSelect(day)}
                                    className={`px-4 py-2 rounded-md border transition-colors 
                                    ${selectedDays.includes(day)
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}>
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between p-6 border-t bg-gray-50">
                     <Button onClick={onExit} variant="outline">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                            Apply Filters
                        </Button>
                </div>
            </div>

            {/* <Button onClick={() => onSubmit(filterData)}> Submit</Button> */}


        </div>
    )
}