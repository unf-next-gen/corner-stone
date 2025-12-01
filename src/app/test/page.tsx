import TestpAGE from "./test";
import { createClient } from "../supabase/client";
import { Volunteer } from "../volunteers/types";

export default async function Test() {


    async function Timeout() {

        await new Promise(r => {
            setTimeout(r, 3000);
        })

        return "test";
}

return (
    <TestpAGE data={await Timeout()}></TestpAGE>
)
}