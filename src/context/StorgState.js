import axios from "axios";
import { useSnackbar } from "notistack";
import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";


const StorgState = createContext();
export const StorgStateProvider = ({ children }) => {
  // const navigate = useNavigate()
  const {enqueueSnackbar ,closeSnackbar}=useSnackbar()
  const [userInfo, setUserInfo] = useState(
    localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
  );
  const [userToken, setUserToken] = useState(
    localStorage.userToken ? JSON.parse(localStorage.userToken) : null
  );

  // const getUser = async (token) => {
  //   closeSnackbar()
  //   await axios
  //     .get("/find_user", { headers: { authorization: "Bearer "+ token  } })
  //     .then((res) => {
  //    if (res.data.error) {
  //     enqueueSnackbar(`${res.data.error.message}` ,{variant:'error'})
  //    } else {
  //      setUserInfo(res.data);
  //      localStorage.setItem("userInfo" , JSON.stringify(res.data))
  //      enqueueSnackbar(`Wellcome ${res.data.userName}` ,{variant:'success'})
  //      if (res.data._isAdmin === true) {
  //       navigate('/admin')
  //      } else {
  //       navigate('/')
  //      }

      
  //    }
  //     });
  // };
// useEffect(()=>{
//   if (userToken !== null) {
    
//     getUser()
//   }
// } ,[userToken ])
  return (
    <StorgState.Provider
      value={{
        userInfo,
        setUserInfo,
        userToken,
        setUserToken,
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
