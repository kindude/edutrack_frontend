import '../../styles/Navbar.css';
import '../../assets/navbar_icons/profile.png';
import '../../assets/navbar_icons/modules.png';
import '../../assets/navbar_icons/performance.png';
import '../../assets/navbar_icons/edutrack.png';
import '../../assets/navbar_icons/news.png';

import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
    return (
        <nav className='bg-gray-200 h-screen col-span-1 '>
            <div className="item">
                <img className="icon" src={require('../../assets/navbar_icons/edutrack.png')} />
                <div className="text">EduTrack</div>
            </div>
            <hr/>
            <div className="item">
                <img className="icon" src={require('../../assets/navbar_icons/profile.png')} />
                <div className="text"><a href='/profile'>Profile</a></div>
            </div>
            <div className="item">
                <img className="icon" src={require('../../assets/navbar_icons/modules.png')} />
                <div className="text"><a href='/modules'>Modules</a></div>
            </div>
            
            <div className="item">
                <img className="icon" src={require('../../assets/navbar_icons/performance.png')} />
                <div className="text"><Link to='/performance'>Performance</Link></div>
            </div>
            <div className="item">
                <img className="icon" src={require('../../assets/navbar_icons/news.png')}/>
                <div className="text"><Link to='/news'>News</Link></div>
            </div>

        </nav>
    );
}

export default Navbar;