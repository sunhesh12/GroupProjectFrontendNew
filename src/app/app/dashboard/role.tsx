interface RoleProps {
    role: string;
}

export default function Role({role}: RoleProps) {
    if(role === "lecturer") {
        return <h1>Student</h1>
    }

    if(role === "admin") {
        return <h1>Admin</h1>
    }

    return <h1>Student</h1>
}