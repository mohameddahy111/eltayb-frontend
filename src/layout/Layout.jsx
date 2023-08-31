import React, { useEffect, useState } from "react";
import { Store } from "../context/StorgState";
import styles from "./css/layout.module.css";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useNavigate, } from "react-router-dom";
import { NightlightRoundOutlined, WbSunnyOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  CssBaseline,
  Switch,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import SearchAuto from "./components/SearchAuto";
import Profile from "./components/Profile";
import Language from "./components/Language";
import Dashbord from "../admin/page/Dashbord";

const Layout = () => {
  const navigate =useNavigate()
  const { userInfo ,homeSearch, setHomeSearch } = Store();
  const { i18n, t } = useTranslation();
  const [dark, setDark] = useState(
    localStorage.darkMode ? JSON.parse(localStorage.darkMode) : false
  );
  useEffect(()=>{
    if (userInfo && userInfo?._isAdmin === true) {
      navigate('/admin')
    }

  },[])


  const theme = createTheme(
    {
      typography: {},
      palette: {
        mode: dark === true ? "dark" : "light",
        primary: {
          main: "#203040",
        },
        secondary: {
          main: "#208080",
        },
      },
    },
    i18n.language
  );
  const CheageDarkMode = () => {
    setDark(!dark);
    localStorage.setItem("darkMode", JSON.stringify(!dark));
  };

  const chengeDir = () => {
    document.getElementById("body").style.direction =
      i18n.language === "arEG" ? "rtl" : "ltr";
  };

  useEffect(() => {
    chengeDir();
  }, [i18n.language]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar
            className={styles.toolbar}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box></Box>

            <Box>
              {userInfo?._isAdmin === false &&  <SearchAuto data={homeSearch} setSearch={setHomeSearch} element={''} title={'Search by name of product'} />}
             
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Tooltip title="dark mode">
                <Switch
                  value={dark}
                  icon={<NightlightRoundOutlined />}
                  checkedIcon={<WbSunnyOutlined sx={{ color: "yellow" }} />}
                  checked={dark}
                  onChange={CheageDarkMode}
                />
              </Tooltip>
              <Box>
                {userInfo ? (
                  <>
                    <Profile />
                    <Typography> Hi , {userInfo?.userName} </Typography>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Typography>Login</Typography>
                    </Link>
                  </>
                )}
              </Box>
              <Box>
                <Language />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <main>
          {userInfo?._isAdmin&& window.location.pathname.includes('admin')? (
            <Dashbord/>
          ):(<Outlet/>)}
        </main>

      </ThemeProvider>
    </>
  );
};
export default Layout;
