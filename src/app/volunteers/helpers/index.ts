
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


export function isAvailable(day: string, timeSlot: string, data: Availability){

    return data[day as keyof Availability].includes(timeSlot) || false;
    
}

export function returnTimeActive(createdAt: string){

    const startDate = new Date(createdAt);
    const today = new Date();

    const diffMilliseconds = today.getTime() - startDate.getTime();

    const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));

    if(diffDays < 30){
        return `${diffDays} Days`
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} ${months === 1 ? 'month' : 'months'}`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
}

