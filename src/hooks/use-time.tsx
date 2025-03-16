"use client";
import { useState, useEffect } from "react";

export default function useTime() {
    const [isMorning, setMorning] = useState(false);
    useEffect(() => {
        const hour = (new Date()).getHours();
        if(hour < 12) setMorning(true);
        else setMorning(false);
      }, []);
      return {
        isMorning
      }
}