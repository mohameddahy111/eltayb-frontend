import { useMediaQuery } from "@mui/material";
import { createContext, useContext, useState } from "react";

const StorgState = createContext();
export const StorgStateProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
  );
  const [userToken, setUserToken] = useState(
    localStorage.userToken ? JSON.parse(localStorage.userToken) : null
  );

  const [search, setSearch] = useState([]);
  const [productSearch, setProductSearch] = useState([]);
  const [homeSearch, setHomeSearch] = useState([]);
  const mobileDevice = useMediaQuery('(max-width: 768px)');

  return (
    <StorgState.Provider
      value={{
        userInfo,
        setUserInfo,
        userToken,
        setUserToken,
        search,
        setSearch,
        productSearch, setProductSearch,mobileDevice,homeSearch, setHomeSearch
        // getUser
      }}
    >
      {children}
    </StorgState.Provider>
  );
};
export const Store = () => {
  return useContext(StorgState);
};
