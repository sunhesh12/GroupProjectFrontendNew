export const cartData = [
  {
    src: "/login.ico",
    headerText: "Create a study group",
    cartText: "Collaborate with your friends by making study groups to share resources",
    Link: "#",
  },
  {
    src: "/login.ico",
    headerText: "Explore courses",
    cartText: "View the list of courses that need to be studied within the semester",
    Link: "#",
  },
  {
    src: "/login.ico",
    headerText: "Complete an assignment",
    cartText: "Organize your semester by setting new tasks in the calendar",
    Link: "#",
  },
  {
    src: "/login.ico",
    headerText: "Set the semester plan",
    cartText: "Organize your semester by setting new tasks in the calendar",
    Link: "#",
  },
];

export const tasks = [
  // Tasks for student01
  {
    studentNumber: "student01",
    title: "Submit Assignment",
    time: "9:00 A.M.",
    imageSrc: "/task.gif",
    link: "#",
  },
  {
    studentNumber: "student01",
    title: "Attend Workshop",
    time: "11:00 A.M.",
    imageSrc: "/task.gif",
    link: "#",
  },
  {
    studentNumber: "student01",
    title: "Complete Project",
    time: "2:00 P.M.",
    imageSrc: "/task.gif",
    link: "#",
  },

  // Tasks for student02
  {
    studentNumber: "student02",
    title: "Prepare Presentation",
    time: "10:00 A.M.",
    imageSrc: "/task.gif",
    link: "#",
  },
  {
    studentNumber: "student02",
    title: "Weekly Review",
    time: "12:00 P.M.",
    imageSrc: "/task.gif",
    link: "#",
  },
  {
    studentNumber: "student02",
    title: "Submit Lab Report",
    time: "4:00 P.M.",
    imageSrc: "/task.gif",
    link: "#",
  },

  // Tasks for student03
  {
    studentNumber: "student03",
    title: "Group Meeting",
    time: "3:00 P.M.",
    imageSrc: "/task.gif",
    link: "#",
  },
  {
    studentNumber: "student03",
    title: "Research Analysis",
    time: "5:00 P.M.",
    imageSrc: "/task.gif",
    link: "#",
  },
  {
    studentNumber: "student03",
    title: "Submit Assignment",
    time: "7:00 P.M.",
    imageSrc: "/task.gif",
    link: "#",
  },

  // Tasks for student04
  {
    studentNumber: "student04",
    title: "Project Discussion",
    time: "8:30 A.M.",
    imageSrc: "/task.gif",
    link: "#",
  },
  {
    studentNumber: "student04",
    title: "Complete Quiz",
    time: "10:30 A.M.",
    imageSrc: "/task.gif",
    link: "#",
  },
  {
    studentNumber: "student04",
    title: "Review Notes",
    time: "3:30 P.M.",
    imageSrc: "/task.gif",
    link: "#",
  },

  // Tasks for student05
  {
    studentNumber: "student05",
    title: "Update Resume",
    time: "9:00 A.M.",
    imageSrc: "/task.gif",
    link: "#",
  },
  {
    studentNumber: "student05",
    title: "Submit Application",
    time: "11:30 A.M.",
    imageSrc: "/task.gif",
    link: "#",
  },
  {
    studentNumber: "student05",
    title: "Read New Research Paper",
    time: "5:30 P.M.",
    imageSrc: "/task.gif",
    link: "#",
  },
];


export const academicPerformance = [
  { GPA: "3.5", improveGpaLink: "#", examResultLink: "#" },
];

// Main Dashboard Function
export function studentDasboarddb() {
  return {
    cartData: cartData,
    tasks: tasks,
    Academic_Perfonce: academicPerformance,
  };
}

// Interface for Course Data
export interface Course {
  id: number;
  name: string;
  semester: string;
  imageUrl: string;
  completion: number;
  link: string;
}

export const courses: Course[] = [
  {
    id: 1,
    name: "CSE1011 - Introduction to Software Engineering",
    semester: "Semester 03",
    imageUrl: "/courseCart.jpeg",
    completion: 20,
    link: "#",
  },
  {
    id: 2,
    name: "CSE1022 - Data Structures and Algorithms",
    semester: "Semester 02",
    imageUrl: "/courseCart.jpeg",
    completion: 50,
    link: "#",
  },
  {
    id: 3,
    name: "CSE1033 - Database Management Systems",
    semester: "Semester 01",
    imageUrl: "/courseCart.jpeg",
    completion: 75,
    link: "#",
  },
  {
    id: 4,
    name: "CSE1044 - Operating Systems",
    semester: "Semester 04",
    imageUrl: "/courseCart.jpeg",
    completion: 10,
    link: "#",
  },
  {
    id: 5,
    name: "CSE1055 - Software Project Management",
    semester: "Semester 05",
    imageUrl: "/courseCart.jpeg",
    completion: 40,
    link: "#",
  },
];
