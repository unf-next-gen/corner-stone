"use client"
import { Volunteer, Availability } from "./../types";
import VolunteerFilterModal from "./FilterModal/VolunteerFilterModal";
import VolunteerTable from "./Tables/VolunteerTable";
import { useState } from "react";
import { FilterData } from "./../types";
import { filterProps } from "@mantine/core";
import { handleDays, handleTimes, handleRoles } from "../helpers";
import { IconFilter } from "@tabler/icons-react";
import { Button } from "@mantine/core";

export default function VolunteerManager({ data }: { data: Volunteer[] }){

    const [isFilterOpen, setFilterState] = useState(false);
    const [volunteers, setVolunteers] = useState<Volunteer[]>(data);
    const [initialVolunteers, setInitialVolunteers] = useState<Volunteer[]>(data);
    const [filtersNumber, setFilterNumber] = useState<number>(0)

    function resetFilter() {
        setVolunteers(initialVolunteers);
        setFilterNumber(0);
    }

    function applyFilter(filterData: FilterData) {
        
        let filterNum = 0;
       console.log("Filter DATA ", {filterData});
       
       let filteredVolunteers = [...initialVolunteers];
        
       if(filterData.days.length > 0){

        filteredVolunteers = handleDays(filterData, filteredVolunteers);
        
        filterNum += 1; 
       }
       
       if(filterData.times.length > 0){
        
        filteredVolunteers = handleTimes(filterData, filteredVolunteers);
        filterNum += 1; 
       }
       
       if(filterData.roles.length > 0){
        
        filteredVolunteers = handleRoles(filterData, filteredVolunteers);
        filterNum += 1; 
       }

       setVolunteers(filteredVolunteers);
       setFilterNumber(filterNum);
    }

    return (

        <div>
            <div className="py-4 flex-col">
                <div>
                    
                </div>
                <Button 
                    leftSection={<IconFilter size={16}/>}
                    onClick={() => setFilterState(true)}>
                    {`Filter${filtersNumber > 0 ? `(${filtersNumber})` : '' }`}
                </Button>
                

                <button className="px-4 py-2 rounded-md border transition-colors bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                    onClick={() => resetFilter()}>
                    Reset Filters
                </button>
            </div>


            <VolunteerFilterModal
                isOpen={isFilterOpen}
                onExit={() => setFilterState(false)}
                onSubmit={applyFilter} />

            <VolunteerTable data={volunteers} />
        </div>
    )
}