import { Autocomplete, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Store } from "../../context/StorgState";

const SearchAuto = ({data , setSearch ,title , element}) => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const {mobileDevice}=Store()

  const userFilter = () => {
    const list = [];
    if (data?.length > 0) {
      data?.map((x, index) => {
        return list.push(x[element]);
      });
    }
    setList(list);
  };
  const filter = () => {
    const user = data?.filter((x) => x[element] === value);
    setSearch(user);
  };
  useEffect(() => {
    if (value === null && data) {
      setSearch(data);
    } else {
      filter();
    }
  }, [value]);
  useEffect(() => {
    userFilter();
  }, [data]);

  return (
    <Box my={3}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={list}
        sx={{ width:!mobileDevice ?300 :250 }}
        renderInput={(params) => (
          <TextField  {...params} label={title}/>
        )}
        size="small"
      />
    </Box>
  );
};

export default SearchAuto;
