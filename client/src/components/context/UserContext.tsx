import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeReq } from '../../helper';

interface ICurrentUser {
  username: string;
  password: string;
}
interface IUserContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn;
  logIn;
  signOut;
  currentUser: ICurrentUser | any;
}

export const UserContext = createContext<IUserContextValue>({
  isLoggedIn: false,
  setIsLoggedIn: () => false,
  logIn: () => '',
  signOut: () => '',
  currentUser: {
    username: '',
  },
});

const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', currentUser);
    } else {
      console.log('no found users');
    }
  }, [currentUser]);

  useEffect(() => {
    console.log(currentUser)
 

    const fetchLoggedInUser = async () => {
      //console.log('in fetchuser')
      try {
      let response = await makeReq(`/login`, 'GET')
      console.log(response)
        console.log(response.username)
        setCurrentUser(response.username);
      } catch(err) {
        
        console.log(err)
        return;
      }
    }
    fetchLoggedInUser();
  }, )

  useEffect(() => {
    const found = localStorage.getItem('user');
    if (found) {
      setCurrentUser(found);
      setIsLoggedIn(true);
    } else {
      console.log('not found');
    }
  }, [window.onload]);

  const logIn = async (username: string, password: string) => {
    const user = { username, password };
    let response = await makeReq('/login', 'POST', user);
    alert(response)
    navigate('/')
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  const signOut = async () => {
    let response = await makeReq('/logout', 'DELETE');
    localStorage.removeItem('user');
    setIsLoggedIn(false);

    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, currentUser, logIn, signOut }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export function useUserContext() {
  return useContext(UserContext);
}
export default UserProvider;
