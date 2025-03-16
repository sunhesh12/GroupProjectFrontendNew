export interface Subtopic {
    // type(type: any): import("csstype").Property.BackgroundColor | undefined;
    id: string;
    title: string;
    description: string;
    type: "quiz" | "assignment" | "content"; 
    
    // Media field that allows only one type at a time
    media: {
      image?: { url: string; altText?: string };  // Image URL with optional alt text
      video?: { url: string; type: 'youtube' | 'vimeo' | 'embed' };  // Video URL with type
      pdf?: { url: string; size?: number };  // PDF URL with optional size field
      link?: { url: string; label: string };  // External link with label text
    };
  }
  
  export interface MainTopic {
    type:string;
    id: string;
    title: string;
    subtopics: Subtopic[];
  }
  
  export const topics: MainTopic[] = [
    {
      id: "1",
      title: "Main Topic 1",
      type:"announcement",
      subtopics: [
        {
          id: "1-1",
          title: "Subtopic 1.1",
          type: "quiz" ,
          description: "An introduction to Subtopic 1.1.",
          media: {
            image: { url: "/signInPageImage.jpg", altText: "Image for Subtopic 1.1" },
          },
        },
        {
          id: "1-2",
          title: "Subtopic 1.2",
          type: "content", 
          description: "Exploring details of Subtopic 1.2.",
          media: {
            video: { url: "https://www.youtube.com/embed/example_video_1_2", type: "youtube" },
          },
        },
      ],
    },
    {
      id: "2",
      title: "Main Topic 2",
      type:"lesson",
      subtopics: [
        {
          id: "2-1",
          title: "Subtopic 2.1",
          type: "quiz" ,
          description: "Overview of Subtopic 2.1.",
          media: {
            pdf: { url: "subtopic-2-1.pdf", size: 150 },
          },
        },
        {
          id: "2-2",
          title: "Subtopic 2.2",
          type: "quiz",
          description: "Advanced concepts in Subtopic 2.2.",
          media: {
            pdf: { url: "subtopic-2-2.pdf", size:200 },
          },
        },
      ],
    },
    {
      id: "3",
      title: "Main Topic 3",
      type:"assignment",
      subtopics: [
        {
          id: "3-1",
          title: "Subtopic 3.1",
          type:"assignment" ,
          description: "Foundations of Subtopic 3.1.",
          media: {
            image: { url: "/path/to/image.jpg", altText: "Image for Subtopic 3.1" },
          },
        },
        {
          id: "3-2",
          title: "Subtopic 3.2",
          type: "quiz",
          description: "Practical applications of Subtopic 3.2.",
          media: {
            pdf: { url: "https://example.com/subtopic-3-2.pdf", size: 200 },
          },
        },
      ],
    },
    {
      id: "4",
      title: "Main Topic 4",
      type:"lesson",
      subtopics: [
        {
          id: "4-1",
          title: "Subtopic 4.1",
          type:"assignment" ,
          description: "Basics of Subtopic 4.1.",
          media: {
            video: { url: "https://www.youtube.com/embed/example_video_4_1", type: "youtube" },
          },
        },
        {
          id: "4-2",
          title: "Subtopic 4.2",
          type:"assignment" ,
          description: "Deep dive into Subtopic 4.2.",
          media: {
            link: { url: "https://example.com/subtopic-4-2", label: "Explore Subtopic 4.2" },
          },
        },
      ],
    },
    {
      id: "5",
      title: "Main Topic 5",
      type:"announcement",
      subtopics: [
        {
          id: "5-1",
          title: "Subtopic 5.1",
          type:"assignment" ,
          description: "Introduction to Subtopic 5.1.",
          media: {
            image: { url: "/path/to/image.jpg", altText: "Image for Subtopic 5.1" },
          },
        },
        {
          id: "5-2",
          title: "Subtopic 5.2",
          type:"assignment" ,
          description: "Exploring ideas in Subtopic 5.2.",
          media: {
            pdf: { url: "https://example.com/subtopic-5-2.pdf", size: 250 },
          },
        },
      ],
    },
  ];
  