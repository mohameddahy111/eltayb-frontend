import { Box, Divider, Grid, IconButton, List, ListItem, Tooltip } from "@mui/material";
import React from "react";
import { adminsLink } from "../data";
import { Outlet, useNavigate } from "react-router-dom";

const Dashbord = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item md={1} xs={2} sx={{mt:'5px' ,boxShadow :'0px 0px 1px grey' ,height:'100vh' }}>
          <List >
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
        <Grid item md={11} xs={10}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashbord;
