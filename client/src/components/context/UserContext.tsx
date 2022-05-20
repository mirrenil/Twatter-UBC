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
  fetchLoggedInUser: Function;
}

export const UserContext = createContext<IUserContextValue>({
  isLoggedIn: false,
  setIsLoggedIn: () => false,
  logIn: () => '',
  signOut: () => '',
  currentUser: undefined,
  fetchLoggedInUser: () => undefined,
});

const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const fetchLoggedInUser = async () => {
    try {
      let response = await makeReq(`/login`, 'GET');

      if (!response.username) {
        setIsLoggedIn(false);
      } else {
        setCurrentUser(response.username);
        setIsLoggedIn(true);
      }
    } catch (err) {
      return;
    }
  };

  const logIn = async (username: string, password: string) => {
    const user = { username, password };
    let response = await makeReq('/login', 'POST', user);
    fetchLoggedInUser();
    navigate('/');
  };

  const signOut = async () => {
    let response = await makeReq('/logout', 'DELETE');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        logIn,
        signOut,
        fetchLoggedInUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export function useUserContext() {
  return useContext(UserContext);
}
export default UserProvider;
