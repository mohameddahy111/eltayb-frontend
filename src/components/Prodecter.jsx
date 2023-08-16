import React, { useEffect } from 'react';
import { Store } from '../context/StorgState';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Prodecter = ({children}) => {
  const {userInfo} =Store()
  const navigate = useNavigate()
  const {enqueueSnackbar , closeSnackbar}=useSnackbar()

  const prodectLayout = ()=>{
    closeSnackbar()
    if (!userInfo|| userInfo._isAdmin === false) {
      navigate('/')
      enqueueSnackbar(`${userInfo?userInfo.userName :'you are'}  not admin`)
  }}
  useEffect(()=>{
    prodectLayout()
  },[userInfo])
  
  return (
    <>
      {children}
    </>
  );
}

export default Prodecter
