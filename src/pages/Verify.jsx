import axios from "axios";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Verify = () => {
  const params = useParams();
  const navigate = useNavigate();
  const verifyCode = async () => {
    await axios.get(`/verify/${params.token}`).then((res) => {
      if (res.data.status === 202) {
        navigate("/login");
      }
    });
  };
  useMemo(() => {
    verifyCode();
  }, []);

  return <>wait to Verify your email</>;
};

export default Verify;
