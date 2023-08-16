import { Box, Divider, Grid, IconButton, List, ListItem, Tooltip } from "@mui/material";
import React from "react";
import { adminsLink } from "../data";
import { Outlet, useNavigate } from "react-router-dom";

const Dashbord = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item md={1} sx={{borderRight :'solid .5px grey' , height:'100vh' , mt:'5px'}}>
          <List>
            {adminsLink.map((x, index) => (
              <ListItem key={index}>
                <Tooltip title={x.title} placement="right-start">
                  <IconButton
                    onClick={() => {
                      navigate(`${x.link}`);
                    }}
                  >
                    {x.icone}
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
            </List>
        </Grid>
        <Grid item md={11}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashbord;
