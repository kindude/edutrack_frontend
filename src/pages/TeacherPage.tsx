import { Link } from "react-router-dom";
import Modules from "./Modules";

const TeacherPage: React.FC = () => {

    return (

        <div>

            <Link to='/teacher/calendar'>Calendar</Link>
            <Modules></Modules>
        </div>
    )

}

export default TeacherPage;