import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

const SearchAuto = (options) => {
  return (
    //TODO: option arry from name of productes
    <>
     <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: '500px'  }}
      renderInput={(params) => <TextField {...params} label="Search" size='small' />}
    />
      
    </>
  );
}

export default SearchAuto;
