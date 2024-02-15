import '../styles/App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './Login';
import RegisterPage from './Register';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Profile from './Profile';
import Modules from './Modules';
import AdminPage from './AdminPage';
import ModuleDetails from './ModuleDetails';
import AddOrEditModule from './AddOrEditModule';
import TeacherPage from './TeacherPage';
import MarkingCalendar from './Calendar';
import Performance from './Performance';
import isLoggedIn from '../utils/checkToken';
import AllModules from './AllModules';
import Home from './Home';
import EnrollUser from './EnrollUser';
import UpdateProfile from './UpdateProfile';
import AddOrEditPost from './AddOrEditPost';
import News from './News';
import Forbidden from './Forbidden';



function App() {

  const gridTemplateColumns = isLoggedIn() ? '1fr 20fr' : '1fr';
  return (
      <div>
      <Router>
        <Header />

        <div className='content' style={{ gridTemplateColumns }}>
          {isLoggedIn() &&
            <Navbar />
          }

          <div className={isLoggedIn() ? 'pl-10 pt-10 col-start-2' : '' }>
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={!isLoggedIn() ? <LoginPage /> : <Forbidden message='You are already logged in' />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path='/modules' element={<Modules />}></Route>
              <Route path='/admin' element={<AdminPage />}></Route>
              <Route path='/teacher' element={<TeacherPage />}></Route>
              <Route path='/modules/:id' element={<ModuleDetails />} />
              <Route path='/admin/new-module' element={<AddOrEditModule isEdit={false} />} />
              <Route path='/teacher/calendar' element={<MarkingCalendar />} />
              <Route path='/performance' element={<Performance />} />
              <Route path='/admin/modules' element={<AllModules />} />
              <Route path='/admin/enroll-user' element={<EnrollUser />} />
              <Route path='/profile/update/:userId' element={<UpdateProfile />} />
              <Route path='/module/:id/posts/new' element={<AddOrEditPost />} />
              <Route path='/news' element={<News />} />
              <Route path='/' element={<Home />} />
            </Routes>

          </div>
          
        </div>
        
      </Router>
      <Footer/>
      </div>

    
  );
}

export default App;
