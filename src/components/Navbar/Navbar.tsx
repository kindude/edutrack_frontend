import '../../styles/Navbar.css';
import '../../assets/navbar_icons/ic_launcher_adaptive_fore.png';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
    return (
        <nav className='bg-gray-200 h-screen col-span-1 '>
            <div className="item">
                <img className="icon" src={require('../../assets/navbar_icons/ic_launcher_adaptive_fore.png')} />
                <div className="text">EduTrack</div>
            </div>
            <hr/>
            <div className="item">
                <img className="icon" src={require('../../assets/navbar_icons/ic_launcher_adaptive_fore.png')} />
                <div className="text"><a href='/profile'>Profile</a></div>
            </div>
            <div className="item">
                <img className="icon" src={require('../../assets/navbar_icons/ic_launcher_adaptive_fore.png')} />
                <div className="text"><a href='/modules'>Modules</a></div>
            </div>
            
            <div className="item">
                <img className="icon" src={require('../../assets/navbar_icons/ic_launcher_adaptive_fore.png')} />
                <div className="text"><Link to='/performance'>Performance</Link></div>
            </div>
            <div className="item">
                <img className="icon" src={require('../../assets/navbar_icons/ic_launcher_adaptive_fore.png')}/>
                <div className="text">Docs</div>
            </div>

        </nav>
    );
}

export default Navbar;