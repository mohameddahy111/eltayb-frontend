import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {Block, Delete, HowToReg} from '@mui/icons-material'
import SearchAuto from "../../layout/components/SearchAuto";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    await axios.get("/all_users").then((res) => {
      setUsers(res.data.users);
      console.log(res.data.users);
    });
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Box pt={2}>
      <Container>
        <SearchAuto SearchAuto={}/>
        <Paper elevation={4} sx={{ padding: "10px" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography>Name </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>Email </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>Status </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>Phone </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>Blocked </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>Action </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((x, index) => (
                  <TableRow>
                    <TableCell align="center">
                      <Typography>{x.userName} </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{x.userEmail} </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {x._isActive ? (
                        <Typography color={"green"}>Active </Typography>
                      ) : (
                        <Typography color={"red"}>Not Active </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{x.userPhone} </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {x._isBlocked ? (<Button startIcon={<HowToReg/>}>unBlocked </Button>) :((<Button startIcon={<Block/>}>Blocked </Button>))}
                    </TableCell>

                    <TableCell align="center">
                      <Button variant='contained' color='error' startIcon={<Delete/>}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Users;
