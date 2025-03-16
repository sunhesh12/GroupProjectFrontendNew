"use client";
import useTime from "@/hooks/use-time";

interface GreetingProps {
    name: string;
}

export default function Greeting({name}: GreetingProps) {
    const {isMorning} = useTime();
    return (
        <h1>{isMorning ? `Good morning ${name}` : `Good evening ${name}`}</h1>
    )
}