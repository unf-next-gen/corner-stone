"use client"
import { Volunteer} from "./../types";
import VolunteerFilterModal from "./FilterModal/VolunteerFilterModal";
import VolunteerTable from "./Tables/VolunteerTable";
import { useState } from "react";
import { FilterData } from "./../types";
import { handleDays, handleTimes, handleRoles } from "../helpers";
import { IconFilter } from "@tabler/icons-react";
import { Button, Stack, Flex } from "@mantine/core";

export default function VolunteerManager({ data }: { data: Volunteer[] }){

    const [isFilterOpen, setFilterState] = useState(false);
    const [volunteers, setVolunteers] = useState<Volunteer[]>(data);
    const [filtersNumber, setFilterNumber] = useState<number>(0)
    const initialVolunteers = data;

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

        <Stack>
            <Flex
            gap="md"
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap">
                
                <Button
                
                    leftSection={<IconFilter size={16}/>}
                    onClick={() => setFilterState(true)}>
                    {`Filter${filtersNumber > 0 ? `(${filtersNumber})` : '' }`}
                </Button>
                

                <Button 
                    onClick={() => resetFilter()}>
                    Reset Filters
                </Button>
            </Flex>


            <VolunteerFilterModal
                isOpen={isFilterOpen}
                onExit={() => setFilterState(false)}
                onSubmit={applyFilter} />

            <VolunteerTable data={volunteers} />
        </Stack>
    )
}