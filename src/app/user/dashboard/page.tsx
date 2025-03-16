"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie

//component files
import GreetingMessage from "@/components/dashboard/GreetingMessage";
import Notifications from "@/components/dashboard/Notifications";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import SemesterWork from "@/components/dashboard/SemesterWork";
import FrequentlyAccessedCourses from "@/components/dashboard/FrequentlyAccessedCourses";
import AcademicPerfomance from "@/components/dashboard/academicPerfomance";

//database utill files
import { studentDasboarddb } from "@/utils/studentDasboarddb";
import {studentNotifications} from "@/utils/studentNotifications"

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<
    { heading: string; text: string; link: string }[]
  >([]);
  const [cartData, setCartData] = useState<
    { src: string; headerText: string; cartText: string; Link: string }[]
  >([]);
  const [tasks, setTasks] = useState<
    {
      studentNumber: string | undefined; title: string; time: string; imageSrc: string; link: string 
}[]
  >([]);
  const [Academic_Perfonce, setAcademic_Perfonce] = useState<{
    GPA: string;
    improveGpaLink: string;
    examResultLink: string;
  } | null>(null);

  useEffect(() => {
    const data = studentDasboarddb(); // Fetch data from db
    const notifications = studentNotifications();


    const usernameFromCookie = Cookies.get("username"); // Get username from cookie

    setUserName(usernameFromCookie || null); // Set to null if cookie is undefined

    // Filter notifications based on studentNumber from cookie
    const filteredNotifications = notifications.notifications.filter(
      (notification) => notification.studentNumber === usernameFromCookie
    );

    const filteredTasks = data.tasks.filter(
      (task) => task.studentNumber === usernameFromCookie
    );

    setNotifications(filteredNotifications);
    setCartData(data.cartData);
    setTasks(filteredTasks);
    setAcademic_Perfonce(data.Academic_Perfonce[0] || null); // Use only the first record
  }, []);

  return (
    <div>
      <GreetingMessage userName={userName} />
      <Notifications notifications={notifications} />
      <ContinueLearning cartData={cartData} />
      <SemesterWork tasks={tasks} />
      <FrequentlyAccessedCourses />
      {Academic_Perfonce && (
        <AcademicPerfomance
          GPA={Academic_Perfonce.GPA} // Use uppercase here
          improveGpaLink={Academic_Perfonce.improveGpaLink}
          examResultLink={Academic_Perfonce.examResultLink}
        />
      )}
    </div>
  );
}
