import { Link } from "react-router-dom";

export default function StudentsTest() {
    const students = [
        {id:1, name: 'js'},
        {id:2, name: 'react'},
        {id:3, name: 'python'},
        {id:4, name: 'css'},
    ];
    return (
        <ul>
            {students.map(s => (
                <li key={s.id}>
                <Link to={`/student/test/${s.id}`}>{s.name}</Link>
                </li>
            ))}
        </ul>
    )
}