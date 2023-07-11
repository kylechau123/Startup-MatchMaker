import { Route, Routes } from 'react-router-dom';
import { ChakraProvider, extendTheme, Heading } from '@chakra-ui/react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Startup from './pages/Startup';
import Investor from './pages/Investor';
import Notifications from './pages/Notifications';
import Connect from './pages/Connect';
import Fund from './pages/Fund';
import MyInvestments from './pages/MyInvestments';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { MultiSelectTheme } from 'chakra-multiselect';
import { useSearchParams } from 'react-router-dom';
import socketIO from "socket.io-client";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
  })
});

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
});

const socket = socketIO("http://localhost:4000");

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
    <ApolloProvider client={client}>
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
            <Route path="/connect/:id" element={<Connect socket={socket} user={user} userEmail={userEmail} />} />
            <Route path="/fund/:id" element={<Fund user={user} userEmail={userEmail} />} />
            <Route path="/myinvestments" element={<MyInvestments />} />
            <Route path="*" element={<Heading as="h2" textAlign='center'>404 Page doesn't exist</Heading>} />
          </Routes>
          <ToastContainer />
        </div>
        <Footer />
      </ChakraProvider >
    </ApolloProvider>
  );
}

export default App;
