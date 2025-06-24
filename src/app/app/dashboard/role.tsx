interface RoleProps {
    role: string;
}

export default function Role({role}: RoleProps) {
    if(role === "lecturer") {
        return <p>Lecture</p>
    }

    if(role === "admin") {
        return <p>Admin</p>
    }

    return <p>Student</p>
}