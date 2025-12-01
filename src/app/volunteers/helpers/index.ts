
import { FilterData, Volunteer, Availability } from "../types";


export function handleDays(filterData: FilterData, filteredVolunteers: Volunteer[]) {

    filteredVolunteers = filteredVolunteers.filter(v => {

        let doesMatch = true;

        for(const day of filterData.days) {

            const key = day.toLowerCase() as keyof Availability;

            if (v.volunteer_availability![key].length > 0) {

                continue;

            } else {
                return false;
            }

        }

        return doesMatch;
    });

    return filteredVolunteers;
}

export function handleTimes(filterData: FilterData, filteredVolunteers: Volunteer[]) {

    filteredVolunteers = filteredVolunteers.filter(v => {

        for(const day of filterData.days) {

            const key = day.toLowerCase() as keyof Availability;

            const availableTimes = v.volunteer_availability![key];

            for (const time of filterData.times) {

                if (!availableTimes.includes(time.toLowerCase())) {

                    return false;
                }
            }
        }
        return true;
    });

    return filteredVolunteers;
}

export function handleRoles(filterData: FilterData, filteredVolunteers: Volunteer[]) {

    return filteredVolunteers.filter(v => {

        const volunteerRoles = v.roles;
        
        for(const role of filterData.roles){
            
            if(!volunteerRoles?.includes(role)){
                return false;
            }
        }
        return true;
    });
}

