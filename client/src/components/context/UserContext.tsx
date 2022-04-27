import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { makeReq } from '../../helper';

interface IUserContextValue {
 isLoggedIn: boolean,
 logIn: (username: string, password: string) => void;
//  signUp: (username: string, email: string, password: string) => void;
}

export const UserContext = createContext<IUserContextValue>({
  isLoggedIn: false,
  logIn: () => "",
  // signUp: () => "",
});

export function useUserContext() {
  return useContext(UserContext);
}

const UserProvider: FC = (props) => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        let response = makeReq('/login', 'GET');
        console.log(response);
      } catch (err) {
        console.log(err);
        return;
      }
    };
    getLoggedInUser();
  }, []);

/*   const logIn = async (username, password) => {
      const user = { username, password };
      let response = await makeReq("/login", "POST", user);
      console.log(response);
      return response;
  }
 */
  /*  const signUp = async (username, email, password) => {
     console.log(username, email, password);
    const newUser = { username, email, password };
    let response = await makeReq("users/register", "POST", newUser);
    console.log(response);
    setTimeout(() => {
      setNewUser(true);
      navigate('/startpage');
    }, 1000);
  } */

  return <UserContext.Provider value={{ isLoggedIn, logIn }}></UserContext.Provider>;
};
