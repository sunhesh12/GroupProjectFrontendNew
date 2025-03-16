export interface Subtopic {
    id: string;
    title: string;
    description?: string;
    media: {
      video?: { url: string; type: "youtube" | "vimeo" };
      pdf?: { url: string };
      link?: { url: string; label: string };
    };
  }
  
  export interface MainTopic {
    id: string; // Unique identifier for main topic
    title: string;
    subtopics: Subtopic[];
  }
  
  export interface Module {
    id: string; // Unique identifier for module
    title: string;
    mainTopics: MainTopic[];
  }
  
  export const modules: Module[] = [
    // Module 1: Introduction to Programming
    {
      id: "module101",
      title: "Introduction to Programming",
      mainTopics: [
        {
          id: "mainTopic1",
          title: "Basics of Java",
          subtopics: [
            {
              id: "sub1",
              title: "Introduction to Variables",
              media: { video: { url: "https://youtube.com/example", type: "youtube" } },
            },
            {
              id: "sub2",
              title: "Control Structures",
              media: { pdf: { url: "/control-structures.pdf" } },
            },
          ],
        },
        {
          id: "mainTopic2",
          title: "Object-Oriented Programming",
          subtopics: [
            {
              id: "sub3",
              title: "Classes and Objects",
              media: { video: { url: "https://vimeo.com/example", type: "vimeo" } },
            },
            {
              id: "sub4",
              title: "Inheritance and Polymorphism",
              media: { link: { url: "/inheritance-guide", label: "Read More" } },
            },
          ],
        },
      ],
    },
  
    // Module 2: Data Structures
    {
      id: "module102",
      title: "Data Structures",
      mainTopics: [
        {
          id: "mainTopic3",
          title: "Introduction to Arrays",
          subtopics: [
            {
              id: "sub5",
              title: "Working with Arrays",
              media: { video: { url: "https://youtube.com/example2", type: "youtube" } },
            },
            {
              id: "sub6",
              title: "Multidimensional Arrays",
              media: { pdf: { url: "/multidimensional-arrays.pdf" } },
            },
          ],
        },
        {
          id: "mainTopic4",
          title: "Linked Lists",
          subtopics: [
            {
              id: "sub7",
              title: "Singly Linked Lists",
              media: { video: { url: "https://youtube.com/linked-lists", type: "youtube" } },
            },
            {
              id: "sub8",
              title: "Doubly Linked Lists",
              media: { link: { url: "/doubly-linked-list-guide", label: "Learn Doubly Linked Lists" } },
            },
          ],
        },
      ],
    },
  
    // Module 3: Web Development
    {
      id: "module103",
      title: "Web Development",
      mainTopics: [
        {
          id: "mainTopic5",
          title: "HTML and CSS Basics",
          subtopics: [
            {
              id: "sub9",
              title: "HTML Syntax and Structure",
              media: { video: { url: "https://youtube.com/html-intro", type: "youtube" } },
            },
            {
              id: "sub10",
              title: "CSS for Styling",
              media: { pdf: { url: "/css-styling.pdf" } },
            },
          ],
        },
        {
          id: "mainTopic6",
          title: "JavaScript Fundamentals",
          subtopics: [
            {
              id: "sub11",
              title: "JavaScript Basics",
              media: { video: { url: "https://youtube.com/js-basics", type: "youtube" } },
            },
            {
              id: "sub12",
              title: "DOM Manipulation",
              media: { link: { url: "/dom-guide", label: "Learn DOM Manipulation" } },
            },
          ],
        },
      ],
    },
  
    // Module 4: Databases
    {
      id: "module104",
      title: "Databases",
      mainTopics: [
        {
          id: "mainTopic7",
          title: "Relational Databases",
          subtopics: [
            {
              id: "sub13",
              title: "Introduction to SQL",
              media: { pdf: { url: "/sql-introduction.pdf" } },
            },
            {
              id: "sub14",
              title: "Normalization",
              media: { video: { url: "https://youtube.com/normalization", type: "youtube" } },
            },
          ],
        },
        {
          id: "mainTopic8",
          title: "NoSQL Databases",
          subtopics: [
            {
              id: "sub15",
              title: "Introduction to NoSQL",
              media: { video: { url: "https://youtube.com/nosql-intro", type: "youtube" } },
            },
            {
              id: "sub16",
              title: "MongoDB Basics",
              media: { pdf: { url: "/mongodb-basics.pdf" } },
            },
          ],
        },
      ],
    },
  
    // Module 5: Software Engineering Principles
    {
      id: "module105",
      title: "Software Engineering Principles",
      mainTopics: [
        {
          id: "mainTopic9",
          title: "Software Development Life Cycle (SDLC)",
          subtopics: [
            {
              id: "sub17",
              title: "Overview of SDLC",
              media: { video: { url: "https://youtube.com/sdlc-overview", type: "youtube" } },
            },
            {
              id: "sub18",
              title: "Agile Development",
              media: { link: { url: "/agile-methodologies", label: "Learn Agile" } },
            },
          ],
        },
        {
          id: "mainTopic10",
          title: "Design Patterns",
          subtopics: [
            {
              id: "sub19",
              title: "Singleton Pattern",
              media: { video: { url: "https://youtube.com/singleton", type: "youtube" } },
            },
            {
              id: "sub20",
              title: "Factory Pattern",
              media: { pdf: { url: "/factory-pattern.pdf" } },
            },
          ],
        },
      ],
    },
  ];
  