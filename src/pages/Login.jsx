import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Store } from "../context/StorgState";

const Login = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { userInfo, userToken, setUserInfo } = Store();

  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await axios
        .post("/sign_in", {
          userEmail: values.email,
          userPassword: values.password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.token !== undefined) {
            localStorage.setItem("userToken", JSON.stringify(res.data.token));
            getUser(res.data.token);
          } 
        }).catch((err)=>{
         enqueueSnackbar(`${err.response.data.error}`, { variant: "error" });
        });
    },
  });

  const getUser = async (token) => {
    closeSnackbar();
    await axios
      .get("/find_user", { headers: { authorization: "Bearer " + token } })
      .then((res) => {
        if (res.data) {
          setUserInfo(res.data);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          enqueueSnackbar(`Wellcome ${res.data.userName}`, {
            variant: "success",
          });
          if (res.data._isAdmin === true) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data.error}`, { variant: "error" });
      });
  };

  return (
    <Box>
      <Container>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"70vh"}
        >
          <form onSubmit={formik.handleSubmit} style={{ width: "60%" }}>
            <Typography
              component={"h1"}
              variant="h4"
              fontWeight={700}
              align="center"
              textTransform={"capitalize"}
            >
              login
            </Typography>
            <List>
              {Object.keys(formik.values).map((x, index) => (
                <ListItem key={index}>
                  <TextField
                    name={x}
                    fullWidth
                    size="small"
                    value={formik.values[x]}
                    error={formik.touched[x] && Boolean(formik.errors[x])}
                    helperText={formik.touched[x] && formik.errors[x]}
                    onChange={formik.handleChange}
                    label={x}
                    sx={{ textTransform: "capitalize" }}
                    inputProps={{
                      type: x === "password" ? "password" : "email",
                    }}
                  />
                </ListItem>
              ))}
              <ListItem
                sx={{ width: "100%", display: "flex", justifyContent: "end" }}
              >
                <Button variant="contained" type="submit">
                  login
                </Button>
              </ListItem>
              <ListItem>
                <Typography textTransform={"capitalize"}>
                  i don't have account /{" "}
                  <Link to="/signup">
                    <Typography component={"span"} color={"secondary"}>
                      Sign Up{" "}
                    </Typography>{" "}
                  </Link>
                </Typography>
              </ListItem>
            </List>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
