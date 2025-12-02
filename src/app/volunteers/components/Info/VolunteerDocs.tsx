import { Volunteer } from "../../types";
import { Documents } from "../../types";
import Link from "next/link";

export default function VolunteerDocs({ data }: {data: Documents[]}){

    if(!data){
        return (<div>No documents to show</div>)
    }
    return(
        <>
        {data.map((d) => (
            <Link key={d.id} href={d.url}>{d.file_name}</Link>
        ))}
        </>
    );
}