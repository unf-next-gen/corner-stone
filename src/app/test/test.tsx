"use client"

import { TextInput } from "@mantine/core"
import { Volunteer } from "../volunteers/types"

export default function TestpAGE({ data }: {data: string}){


    return(
        <>
        <h1>Hello John</h1>
        <TextInput placeholder="add comment">

        </TextInput>
        {data}
        </>
    )
}