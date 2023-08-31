import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  ListItem,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AddAPhotoOutlined, Edit } from "@mui/icons-material";
import { Store } from "../context/StorgState";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetAllCategories } from "../hooks/useApi";

const EidteProducte = () => {
  const data = useLocation().state;
  console.log(data)
  const { categories } = useGetAllCategories();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const formData = new FormData();
  const [mainIamag, setMainIamag] = useState("");
  const [category, setCatogory] = useState(data ? data.category : "");
  const { userToken } = Store();
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object({
    title: yup.string("Add Producte").required(),
    price: yup.number("Add Price").required(),
    description: yup.string("Add Description").required(),
    offerValue: yup.number(),
    offerPrice: yup.number(),
    amout: yup.number().required(),
    stoke: yup.number().required(),
    offer: yup.boolean(),
    status: yup.boolean(),
    category: yup.string().required(),
    size: yup.string("Add Size"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: data ? data.title : "",
      price: data ? data.price : "",
      description: data ? data.description : "",
      amout: data ? data.amout : "",
      stoke: data ? data.stoke : "",
      offer: data ? data.offer : false,
      offerValue: data ? data.offerValue :0,
      offerPrice: data ? data.offerPrice : 0,
      mina_image: data ? data.mina_image : "",
      category: "",
      url: data ? data.url : "",
      status: data ? data.status : true,
      show: data ? data.show : false,
    },
    onSubmit: async (values) => {
      setLoading(true);
      Object.keys(values).map((x) => {
        return formData.append(x, values[x]);
      });
      await axios
        .put(`/products/${data._id}`, formData, {
          headers: { authorization: `Bearer ${userToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            enqueueSnackbar(`${res.data.message} `, {
              variant: "success",
            });
            navigate("/admin/productes/");
            setLoading(false);
          }
          if (res.data.error) {
            enqueueSnackbar(`${res.data.error} `, { variant: "error" });
            setLoading(false);
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err.response.data.error} `, { variant: "error" });
          setLoading(false);
        });
      console.log(values);
    },
  });
  useEffect(() => {
    formik.values.mina_image = mainIamag[0];
    formik.values.category = category;
  }, [mainIamag, category]);
  useEffect(() => {
    if (formik.values.offer === false) {
      formik.values.offerPrice = "";
    } else {
      formik.values.offerPrice = parseFloat(
        formik.values.price -
          ((formik.values.price * formik.values.offerValue) / 100).toFixed(2)
      );
    }
  }, [formik.values.offer , formik.values.offerValue]);
  return (
    <>
      <Container>
        <Grid container spacing={1}>
          <Grid item md={4} xs={12}>
            <Card sx={{ position: "relative" }}>
              {data.mina_image ? (
                <>
                  <CardMedia
                    component={"img"}
                    src={
                      mainIamag
                        ? URL.createObjectURL(mainIamag[0])
                        : data.mina_image
                    }
                  />
                  <Box position={"absolute"} top={10} right={10} zIndex={2}>
                    <Tooltip title={"change"}>
                      <label htmlFor="mainIamag" className="image_label">
                        <Edit sx={{ color: "#fff" }} />
                      </label>
                    </Tooltip>
                    <input
                      name="mainIamag"
                      id="mainIamag"
                      type="file"
                      hidden
                      onChange={(e) => {
                        setMainIamag(e.target.files);
                      }}
                    />
                  </Box>
                </>
              ) : (
                <Box p={4}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    p={2}
                    m={2}
                    sx={{
                      border: "2px solid  grey",
                      borderBlockStyle: "dashed ",
                    }}
                  >
                    <Tooltip title={"add photo"}>
                      <label htmlFor="mainIamag" className="image_label">
                        <AddAPhotoOutlined />
                      </label>
                    </Tooltip>

                    <input
                      name="mainIamag"
                      id="mainIamag"
                      type="file"
                      hidden
                      onChange={(e) => {
                        setMainIamag(e.target.files);
                      }}
                    />
                  </Box>
                  <Typography
                    textTransform={"uppercase"}
                    fontWeight={700}
                    align="center"
                    mb={1}
                  >
                    or
                  </Typography>
                  <Box>
                    <TextField
                      value={formik.values.url}
                      name="url"
                      onChange={formik.handleChange}
                      label="url"
                      fullWidth
                    />
                  </Box>
                </Box>
              )}
            </Card>
          </Grid>
          <Grid item md={8} xs={12} py={2}>
            <Typography
              fontWeight={700}
              component={"h1"}
              variant="h4"
              textTransform={"capitalize"}
              py={4}
            >
              producte informations
            </Typography>
            <Box>
              <form
                onSubmit={formik.handleSubmit}
                // method="post
                encType="multipart/form-data"
              >
                <Grid container spacing={1}>
                  {Object.keys(formik.values)
                    .slice(0, 9)
                    .map((x, index) => (
                      <Grid
                        key={index}
                        item
                        md={x === "offer" ? 12 : 6}
                        xs={12}
                      >
                        {x === "offer" ? (
                          <Box>
                            <ListItem>
                              <Typography mx={2}>{x}</Typography>
                              <Switch
                                checked={formik.values[x]}
                                name={x}
                                defaultChecked={formik.values[x]}
                                value={formik.values[x]}
                                onChange={formik.handleChange}
                              />
                            </ListItem>
                          </Box>
                        ) : x === "mina_image" ? null : (
                          <TextField
                            value={
                              
                                  formik.values[x]
                            }
                            name={x}
                            onChange={formik.handleChange}
                            error={
                              formik.touched[x] && Boolean(formik.errors[x])
                            }
                            helperText={formik.touched[x] && formik.errors[x]}
                            label={x}
                            disabled={
                              x === "offerValue" || x === "offerPrice"
                                ? !formik.values.offer
                                : false
                            }
                            sx={{ textTransform: "capitalize" }}
                            focused={formik.values.offer=== true && x==='offerPrice'}
                            fullWidth
                          />
                        )}
                      </Grid>
                    ))}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  display={"flex"}
                  gap={2}
                  mt={3}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Typography>category </Typography>
                    <Select
                      name="category"
                      label="category"
                      value={formik.values.category}
                      // defaultValue={data.category}
                      onChange={formik.handleChange}
                    >
                      {categories?.map((x, index) => (
                        <MenuItem key={index} value={x.titel}>
                          {x.titel}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Typography>status </Typography>
                    <Switch
                      checked={formik.values.status}
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Typography>Show in Home </Typography>
                    <Switch
                      checked={formik.values.show}
                      name="show"
                      value={formik.values.show}
                      onChange={formik.handleChange}
                    />
                  </Box>
                </Grid>

                <Box display={"flex"} gap={1} alignItems={"center"} p={2}>
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    variant="contained"
                    startIcon={<Edit />}
                  >
                    Edit
                  </LoadingButton>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EidteProducte;
