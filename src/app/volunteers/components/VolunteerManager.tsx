"use client"
import { Volunteer } from "./../types";
import VolunteerFilterModal from "./FilterModal/VolunteerFilterModal";
import VolunteerTable from "./Tables/VolunteerTable";
import { useState } from "react";

export default function VolunteerManager({ data }: { data: Volunteer[] }){

    const [isFilterOpen, setFilterState] = useState(false);
    const [volunteers, setVolunteers] = useState<Volunteer[]>(data);
    const [initialVolunteers, setInitialVolunteers] = useState<Volunteer[]>(data);


    function resetFilter() {
        //console.log(initialVolunteers);
        setVolunteers(initialVolunteers);
    }

    function applyFilter(filterData: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;

    }) {

        let filterDay: string | null = null;
        const days: string[] = [];


        for (const day in filterData) {

            const key = day as keyof typeof filterData;
            if (filterData[key]) {

                filterDay = day;
                //console.log(typeof(filterDay));
                console.log('Im pushing ' + { filterDay });
                days.push(filterDay);

                //console.log(filterDay);

            } else {
                console.log('Im not pushing ' + { filterDay });
            }
        }
        console.log(days);

        const filteredData = volunteers?.filter(volunteer => {
            let isAvailable = false;



            for (const day of days) {

                console.log(day);

                const ofDay = day as keyof typeof volunteer.availability;

                isAvailable = volunteer.availability[ofDay];

            }

            return isAvailable;
            // const ofDay = filterDay as keyof typeof volunteer.availability;
            // return volunteer.availability[ofDay];
        })
        //console.log("Filterdata");
        //console.log(filterData);
        //console.log(filteredData);

        setVolunteers(filteredData!);

    }

    return (

        <div>
            <div className="py-4 flex-col">
                <div>
                    
                </div>
                <button className="px-4 py-2 rounded-md border transition-colors bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                    onClick={() => setFilterState(true)}>
                    Apply Filters
                </button>
                

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