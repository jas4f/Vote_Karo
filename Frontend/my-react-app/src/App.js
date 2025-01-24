 import './App.css';
import Signup from './components/signup';
import Home from './components/home';
import Login from './components/login';
import { BrowserRouter ,  Route,Navigate, Routes,useLocation } from "react-router-dom";
import Votecenter from './components/profile';
import Navbar from './components/Navbar';
import VoteSuccessfully from './components/VoteStatus';
import ManageCandiate from './components/UpdateCandidate';
import AddCandidate from './components/AddCandidate';
import Result from './components/LiveResult';
 function Layout({ children }) {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/signup'];
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      {children}
    </div>
  );
}

function App() {
   
  const isLoggedIn = !!localStorage.getItem('token');
   
  return (
   
      <BrowserRouter>
        <Layout >
        <Routes>
        <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!isLoggedIn ? <Login  /> : <Navigate to="/" />} />
          <Route path='/profile' element={<Votecenter  />} />
          <Route path='/addCandidate' element={<AddCandidate  />} />
          <Route path='/result' element={<Result  />} />
        <Route path='/:id' element={<ManageCandiate  />} />
        <Route path='/VoteSuccessfully/:id' element={<VoteSuccessfully />} />
          <Route path="/" element={isLoggedIn ? <Home  /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
       </Routes>
       </Layout>
    </BrowserRouter>
  );
}

export default App;
