'use client'
import React, { useState } from "react";
import { Button } from "@mantine/core";
import { Modal, Title, MultiSelect, Stack, } from "@mantine/core";
import { FilterData } from "../../types";

type volunteerFilterModalProps = {
  isOpen: boolean; //isOpen to display
  onExit: () => void; //callback function to exit out of modal
  onSubmit: (filterData: FilterData) => void;
}



export default function VolunteerFilterModal({ isOpen, onExit, onSubmit }: volunteerFilterModalProps) {
  const [selectedDays, setDays] = useState<string[]>([]);
  const [selectedTimes, setTimes] = useState<string[]>([]);
  const [selectedRoles, setRoles] = useState<string[]>([]);


  if (!isOpen) return null;

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const times = ['Morning', 'Afternoon', 'Evening'];

  const handleSelectDays = (day: string) => {
    setDays(prev => prev.includes(day)
      ? prev.filter(d => d !== day)
      : [...prev, day]);
  };
  const handleSelectTime = (time: string) => {
    setTimes(prev => prev.includes(time)
      ? prev.filter(d => d !== time)
      : [...prev, time]);
  };

  const roles = [
    { value: "events", label: "Event Hosting / Event Planning" },
    { value: "interviews", label: "Mock Interviews" },
    { value: "admin", label: "Administrative Support" },
    { value: "career", label: "Career Exploration" },
    { value: "training", label: "Virtual / In-Person Training" },
    { value: "mentoring", label: "Mentoring / Tutoring" },
    { value: "speakers", label: "Speakers Bureau" },
    { value: "community outreach", label: "Community Outreach" },
    { value: "clothing", label: "Community Clothing Closet" },
    { value: "data", label: "Data Collection" },
    { value: "donor outreach", label: "Donor Outreach" },
    { value: "corperate outreach", label: "Corperate Outreach" },
    { value: "donations", label: "In-Kind Donations" },
    { value: "other", label: "Others" },
  ];

  const handleSubmit = () => {
    const filterData: FilterData = {
      days: selectedDays,
      times: selectedTimes,
      roles: selectedRoles,
    };


    onSubmit(filterData);
  };


  return (
    <Modal opened={isOpen} onClose={onExit} title="Volunteer Filters" size='lg' centered>
      <Stack gap="lg">
        <Title order={3}>Available Days</Title>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {days.map(day => (
            <button key={day} onClick={() => handleSelectDays(day)}
              className={`px-4 py-2 rounded-md border transition-colors 
                                    ${selectedDays.includes(day)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}>
              {day}
            </button>
          ))}
        </div>

        <Title order={3}>Available Times</Title>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {times.map(time => (
            <button key={time} onClick={() => handleSelectTime(time)}
              className={`px-4 py-2 rounded-md border transition-colors 
                                    ${selectedTimes.includes(time)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}>
              {time}
            </button>
          ))}
        </div>
        <Title order={3}>Preferred Roles</Title>
        <div>
          <MultiSelect
            data={roles}
            placeholder="Select roles"
            searchable
            value={selectedRoles}
            onChange={setRoles}
          />
        </div>

        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <Button onClick={onExit} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Apply Filters
          </Button>
        </div>

      </Stack>
    </Modal>
  )
}