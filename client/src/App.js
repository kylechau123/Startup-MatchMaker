import { Route, Routes } from 'react-router-dom';
import { ChakraProvider, extendTheme, Heading } from '@chakra-ui/react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Startup from './pages/Startup';
import Investor from './pages/Investor';
import Notifications from './pages/Notifications';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { MultiSelectTheme } from 'chakra-multiselect';
import { useSearchParams } from 'react-router-dom';

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
});

function App() {

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (searchParams.get("logout")) {
      removeCookie("token");
      setUser("");
      setUserEmail("");
      searchParams.delete("logout");
      setSearchParams(searchParams);
    }
    const verifyCookie = async () => {
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, userdata, userEmail } = data;
      setUser(userdata);
      setUserEmail(userEmail);
      return status
        ? ""
        : (removeCookie("token"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);



  return (
    <ChakraProvider theme={theme}>
      <Header user={user} />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home user={user} userEmail={userEmail} />} />
          <Route path="/login" element={<Login user={user} />} />
          <Route path="/register" element={<Register user={user} />} />
          <Route path="/profile" element={<Profile userEmail={userEmail} />} />
          <Route path="/startup/:id" element={<Startup />} />
          <Route path="/investor/:id" element={<Investor />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<Heading as="h2" textAlign='center'>404 Page doesn't exist</Heading>} />
        </Routes>
        <ToastContainer />
      </div>
    </ChakraProvider >
  );
}

export default App;
