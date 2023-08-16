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

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();


  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    phone: yup.number().required(),
    confirmPassword: yup.string().min(6).required(),
    fullName: yup.string().min(3).required(),
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      // console.log('hiii')
      const user = {
        userName: values.fullName,
        userEmail: values.email,
        userPassword: values.password,
        userPhone: values.phone,
      };
      if (values.password !== values.confirmPassword) {
        enqueueSnackbar("password not Match", { variant: "error" });
      } else {
        await axios
          .post("/sign_up", user)
          .then((res) => {
            console.log(res)
            if (res.data.message === "successfully") {
              enqueueSnackbar(`${res.data.message}`, { variant: "success" });
              navigate('/login')
            } else {
              enqueueSnackbar(`${res.data.error.message}`, { variant:'error' });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });
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
                      type: x.toLowerCase().includes("password")
                        ? "password"
                        : x === "email"
                        ? "email"
                        : "text",
                    }}
                  />
                </ListItem>
              ))}
              <ListItem
                sx={{ width: "100%", display: "flex", justifyContent: "end" }}
              >
                <Button variant="contained" type="submit">
                  Sign up
                </Button>
              </ListItem>
              <ListItem>
                <Typography textTransform={"capitalize"}>
                  i have account /{" "}
                  <Link to="/login">
                    <Typography component={"span"} color={"secondary"}>
                      Login{" "}
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
