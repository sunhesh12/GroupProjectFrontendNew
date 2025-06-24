# 📚 Learning Management System – Frontend

This is the frontend of the **Learning Management System (LMS)** built using **Next.js**, designed for seamless student-teacher interaction, course tracking, and academic progress monitoring.

---

## 🚀 Getting Started

Follow the steps below to set up and run the development server locally.

### ✅ Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- [PNPM](https://pnpm.io/installation)

> 💡 You can install PNPM globally using:
> ```bash
> npm install -g pnpm
> ```

---

### 📦 Install Dependencies

After cloning the project, navigate to the project directory and install required packages:

```bash
pnpm install
````

---

### 🧑‍💻 Run the Development Server

Start the Next.js development server with:

```bash
pnpm run dev
```

Open your browser and visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
├── app/                   # App directory (Next.js 13+ App Router)
│   └── ...
├── components/           # Reusable UI components (e.g., ProfilePic, InputField)
├── public/               # Static files (images, icons)
├── styles/               # CSS modules
├── utils/                # Backend API helpers, auth utils
├── README.md             # Project info
└── pnpm-lock.yaml        # PNPM lock file
```

---

## 🔐 Authentication

* Uses a session-based authentication model
* Auth helpers located in `utils/auth.ts`
* Protected routes redirect unauthenticated users to the `/auth/signin` page

---

## 🧠 Features

* ✅ User login and profile view
* ✅ Module cards with completion tracking
* ✅ Dynamic menu rendering based on user roles
* ✅ Responsive and accessible UI components
* ✅ Secure API calls with session validation

---

## 📸 Screenshots

> *You can add screenshots or demo videos here to showcase the UI/UX.*

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## ✨ Credits

Developed by the Software Engineering Team at [University of Sri Jayewardenepura](https://www.sjp.ac.lk/)

```


