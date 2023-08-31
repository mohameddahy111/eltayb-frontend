import React from "react";
import { Box, Button, Container } from "@mui/material";
import SearchAuto from "../../layout/components/SearchAuto";
import { Store } from "../../context/StorgState";
import { Add, AddShoppingCartOutlined } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetProduct } from "../../hooks/useApi";

const Productes = () => {
  const navigate = useNavigate();
  const { setProductSearch, mobileDevice } = Store();
  const { product } = useGetProduct();

  return (
    <>
      <Container>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={mobileDevice ? "column" : "row"}
        >
          {product && (        <SearchAuto
            data={product}
            setSearch={setProductSearch}
            title={"Search by Product Name"}
            element={"title"}
          />
)}

          <Box display={'flex'} alignItems={'center'} gap={1}>
            <Button
              startIcon={<AddShoppingCartOutlined />}
              color="success"
              variant="contained"
              onClick={() => {
                navigate("/admin/productes/add");
              }}
            >
              add producte
            </Button>
            <Button

              startIcon={<Add />}
              color="secondary"
              variant="contained"
              onClick={() => {
                navigate("/admin/productes/category");
              }}
            >
              add category
            </Button>
          </Box>
        </Box>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default Productes;
