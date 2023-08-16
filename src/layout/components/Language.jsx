import { Box, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { json } from 'react-router-dom';

const Language = () => {
  const {i18n}=useTranslation()
  const ListLanguages = [
    {
      name :'En', value :'enUS'
    },
    {
      name :'ع', value :'arEG'
    },
  ]
  const changeLang =(lang)=>{
    i18n.changeLanguage(lang)
    localStorage.setItem('i18nextLn' ,JSON.stringify(lang))

  }
  return (
    <Box m={1}>
    <Select value={i18n.language} size='small' onChange={(e)=>changeLang(e.target.value)} >
      {ListLanguages.map((x, index)=>(
        <MenuItem key={index } value={x.value}>{x.name}</MenuItem>
      ))}
    </Select>
      
    </Box>
  );
}

export default Language;
