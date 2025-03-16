// Define the Course type
export interface Course {
    id: number;
    name: string;
    semester: string;
    imageUrl: string;
    completion: number;
    link: string;
    enrollmentKey?: string;  // Optional enrollment key for each course
    isEnrolled: boolean;  // Track enrollment status
  }
  
  // Define the courses data with more courses and enrollment keys
  export const courses1: Course[] = [
    {
      id: 1,
      name: "CSE1011 - Introduction to Software Engineering",
      semester: "Semester 03",
      imageUrl: "/courseCart.jpeg",
      completion: 20,
      link: "/student/course",
      enrollmentKey: "software123",
      isEnrolled: false,
    },
    {
      id: 2,
      name: "CSE1022 - Data Structures and Algorithms",
      semester: "Semester 02",
      imageUrl: "/courseCart.jpeg",
      completion: 50,
      link: "/student/course",
      enrollmentKey: "data456",
      isEnrolled: false,
    },
    {
      id: 3,
      name: "CSE1033 - Database Management Systems",
      semester: "Semester 01",
      imageUrl: "/courseCart.jpeg",
      completion: 75,
      link: "/student/course",
      enrollmentKey: "db789",
      isEnrolled: true,  // Already enrolled
    },
    {
      id: 4,
      name: "CSE1044 - Operating Systems",
      semester: "Semester 04",
      imageUrl: "/courseCart.jpeg",
      completion: 10,
      link: "/student/course",
      enrollmentKey: "os101",
      isEnrolled: false,
    },
    {
      id: 5,
      name: "CSE1055 - Software Project Management",
      semester: "Semester 05",
      imageUrl: "/courseCart.jpeg",
      completion: 40,
      link: "/student/course",
      enrollmentKey: "project202",
      isEnrolled: false,
    },
    {
      id: 6,
      name: "CSE1066 - Artificial Intelligence",
      semester: "Semester 06",
      imageUrl: "/courseCart.jpeg",
      completion: 60,
      link: "/student/course",
      enrollmentKey: "ai303",
      isEnrolled: true,  // Already enrolled
    },
    {
      id: 7,
      name: "CSE1077 - Computer Networks",
      semester: "Semester 07",
      imageUrl: "/courseCart.jpeg",
      completion: 30,
      link: "/student/course",
      enrollmentKey: "network404",
      isEnrolled: false,
    },
    {
      id: 8,
      name: "CSE1088 - Machine Learning",
      semester: "Semester 08",
      imageUrl: "/courseCart.jpeg",
      completion: 90,
      link: "/student/course",
      enrollmentKey: "ml505",
      isEnrolled: false,
    },
    {
      id: 9,
      name: "CSE1099 - Cloud Computing",
      semester: "Semester 09",
      imageUrl: "/courseCart.jpeg",
      completion: 50,
      link: "/student/course",
      enrollmentKey: "cloud606",
      isEnrolled: true,  // Already enrolled
    },
    {
      id: 10,
      name: "CSE1101 - Web Development",
      semester: "Semester 04",
      imageUrl: "/courseCart.jpeg",
      completion: 80,
      link: "/student/course",
      enrollmentKey: "web707",
      isEnrolled: false,
    },
  ];
  