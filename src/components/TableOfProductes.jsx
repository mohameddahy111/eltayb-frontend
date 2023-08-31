import React, { useEffect } from "react";
import { useGetProduct } from "../hooks/useApi";
import {
  Badge,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Store } from "../context/StorgState";
import { useNavigate } from "react-router-dom";

const TableOfProductes = () => {
  const { productSearch, setProductSearch } = Store();
  const navigate = useNavigate();

  const { product } = useGetProduct();
  useEffect(() => {
    setProductSearch(product);
  }, [product]);

  // console.log(product);
  return (
    <>
      {product && (
        <>
          <Paper elevation={4} sx={{ padding: "10px" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography>Name </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>Stoke </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>Status </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>Amout </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>Price </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>Offer </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>Offer Value </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>More </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productSearch?.map((x, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <Typography>{x.title} </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Badge badgeContent={x.stoke} color={x.stoke <5 ?"error" :"info"} /> 
                      </TableCell>
                      <TableCell align="center">
                        {x.status ? (
                          <Typography color={"green"}>Active </Typography>
                        ) : (
                          <Typography color={"red"}>Not Active </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{x.amout} </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{x.price} $</Typography>
                      </TableCell>

                      <TableCell
                        align="center"
                      >
                        {x.offer === false ? " unoffre" : "offer"}
                      </TableCell>
                      <TableCell align="center">
                        {x.offerValue ? `${x.offerValue} %` : "0 %"}
                      </TableCell>
                      <TableCell align="center" sx={{display :'flex' , gap:1}}>
                        
                        <Button
                          variant="contained"
                          onClick={() => {
                            navigate(`/admin/producte/${x._id}`);
                          }}
                        >
                          more
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => {
                            navigate(`/admin/productes/edite/${x._id}`,{state :x});
                          }}
                        >
                          edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
    </>
  );
};

export default TableOfProductes;
