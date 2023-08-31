import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { Store } from "../context/StorgState";
import { useGetAllCategories } from "../hooks/useApi";
import { useSnackbar } from "notistack";

const Category = () => {
  const [loading, setLoading] = useState(false);
  const [newImg, setImg] = useState("");
  const { userToken } = Store();
  const data = new FormData();
  const { categories, setCategories } = useGetAllCategories();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const validationSchema = yup.object({
    titel: yup.string().required(),
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      titel: "",
      img: "",
      url: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      Object.keys(values).map((x) => {
        return data.append(x, values[x]);
      });
      await axios
        .post("/category", data, {
          headers: { authorization: `Bearer ${userToken}` },
        })
        .then(async (res) => {
          if (res.status === 201) {
            await axios.get(`/category`).then((data) => {
              setCategories(data.data);
            });
          }
          if (res.data.error) {
            enqueueSnackbar(`${res.data.error} `, { variant: "error" });
          }
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    },
  });
  useEffect(() => {
    formik.values.img = newImg;
  }, [newImg]);
  return (
    <>
      <Container>
        <Box mb={2}>
          <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <TextField
                name={"titel"}
                value={formik.values.titel}
                onChange={formik.handleChange}
                error={formik.touched.titel && Boolean(formik.errors.titel)}
                helperText={formik.touched.titel && formik.errors.titel}
                inputProps={{ type: "text" }}
                size="small"
                label={"New Category"}
              />
              <TextField
                name={"url"}
                value={formik.values.url}
                onChange={formik.handleChange}
                inputProps={{ type: "text" }}
                size="small"
                label={"url // img"}
              />
              <TextField
                name={"img"}
                value={formik.values.ima}
                onChange={(e) => setImg(e.target.files[0])}
                inputProps={{ type: "file" }}
                size="small"
                disabled={loading}

              />
              <LoadingButton
                loading={loading}
                variant="contained"
                type="submit"
              >
                add
              </LoadingButton>
            </Box>
          </form>
        </Box>
        <Divider />
     <Box mt={5}>
          {loading ? (
            <Typography>loading .... </Typography>
          ) : (
            <Grid container spacing={1}>
              {categories?.map((x, index) => (
                <Grid key={index} item xs={12} md={3}>
                  <Card >
                    <CardContent >
                    <img src={x.img} style={{height:'300px' }} alt={x.titel} />
                      <Typography align="center">{x.titel}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
         )}
        </Box>
      </Container>
    </>
  );
};

export default Category;
