import React, { useEffect } from "react";
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
import {
  Block,
  Delete,
  DriveFileRenameOutlineOutlined,
  HowToReg,
} from "@mui/icons-material";
import SearchAuto from "../../layout/components/SearchAuto";
import { Store } from "../../context/StorgState";
import { useGetUsers } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const { users } = useGetUsers();
  const { search, setSearch } = Store();
  useEffect(() => {
    setSearch(users);
  }, [users]);
  return (
    <Box pt={2}>
      <Container>
        <Typography
          fontWeight={700}
          component={"h1"}
          variant="h4"
          align="center"
          textTransform={"capitalize"}
        >
          users
        </Typography>
        {users && <SearchAuto data={users} setSearch={setSearch} title={'Search by user Email'} element={'userEmail'} />}
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
                {search?.map((x, index) => (
                  <TableRow key={index}>
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
                      {x._isBlocked ? (
                        <Button startIcon={<HowToReg />}>unBlocked </Button>
                      ) : (
                        <Button startIcon={<Block />}>Blocked </Button>
                      )}
                    </TableCell>

                    <TableCell align="center" sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        color="info"
                        startIcon={<DriveFileRenameOutlineOutlined />}
                        onClick={() => {
                          navigate(`/admin/users/${x._id}`);
                        }}
                      >
                        detials
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Delete />}
                      >
                        Delete
                      </Button>
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
