import React, {
  createContext,
  createFactory,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { makeReq } from '../../helper';

// interface IUserContextValue {
//     username: string,
//     password: string,
//     email: string,
//     admin: boolean,
//     isLoggedIn: boolean,
//     authorize: () => void
// }

export const UserContext = createContext({
  isLoggedIn: false,
});

export function useUserContext() {
  return useContext(UserContext);
}

const UserProvider: FC = (props) => {
  const [user, setUser] = useState();
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

  const logIn = async (email: string, password: string) => {
      const user = { email, password };
      let response = await makeReq("/login", "POST", user);
      console.log(response);
  }

  return <UserContext.Provider value={{ isLoggedIn }}></UserContext.Provider>;
};
