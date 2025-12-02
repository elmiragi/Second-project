import { Link, NavLink } from "react-router-dom";
import "../index.css";
export default function NavMenu() {
    return (
        <nav>
            <NavLink to="/login" 
            className={({isActive}) => ( isActive ? 'active' : undefined)}>Войти
        </NavLink>
            <NavLink to="/student" 
           className={({isActive}) => ( isActive ? 'active' : undefined)}>Студент
        </NavLink>
            <NavLink to="/admin" 
            className={({isActive}) => ( isActive ? 'active' : undefined)}>Админ
        </NavLink>
        <Link to='student/test' state={{some: 'value', filtered: 'completed', a: 'xxx'}}>tests</Link>
        </nav>
    )
}