import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Buttoncomponent from "./Buttoncomponent";
import { useFormik, useFormikContext } from "formik";
import axios, { Axios } from "axios";
import { userAuthapi } from "../utils/config";
import * as Yup from "yup";
import Input from "../components/Input";
import "./common.css";
import Showhidepassword from "./Showhidepassword";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const [guest, setguest] = useState({
    guestemail: "",
    guestpassword: "",
  });
  const { guestemail, guestpassword } = guest;
  const formik = useFormikContext();
  console.log("object", formik);
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email must be Required"),
        password: Yup.string().required("password must required"),
      }),
      onSubmit: (value, actions) => {
        axios
          .post(`${userAuthapi}/login`, value)
          .then((res) => {
            if (res) {
              localStorage.setItem("userInfo", JSON.stringify(res.data))
                navigate("/chat")
            }
            console.log(res)
          })

          .catch((e) => toast.error(e.response.data.message));
        console.log("object", value);
        actions.resetForm();
      },
    });
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <Box className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          label="Email"
          name="email"
          value={guestemail ? guestemail : values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <Typography variant="body1" sx={{ color: "red", padding: "3px 0" }}>
            {errors.email}
          </Typography>
        )}
        <Box className="password-btn">
          <Input
            type={passwordType}
            label="Password"
            name="password"
            value={guestpassword ? guestpassword : values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Buttoncomponent
            variant="text"
            onClick={togglePassword}
            className="new-btn"
          >
            {values.password && (
              <Showhidepassword passwordType={passwordType} />
            )}
          </Buttoncomponent>
          {errors.password && touched.password && (
            <Typography variant="body1" sx={{ color: "red", padding: "3px 0" }}>
              {errors.password}
            </Typography>
          )}
        </Box>
        <Box className="button-group">
          <Buttoncomponent variant="contained" color="primary" type="submit">
            Log in
          </Buttoncomponent>
          <Buttoncomponent
            variant="contained"
            color="error"
            onClick={() => {
              setguest({
                guestemail: "guest@gmail.com",
                guestpassword: "guest1234",
              });
            }}
          >
            Get guest user credential
          </Buttoncomponent>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
