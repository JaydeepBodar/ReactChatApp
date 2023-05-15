import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Showhidepassword from "./Showhidepassword";
import * as Yup from "yup";
import Input from "./Input";
// import { useFormik } from "formik";
import "./common.css";
import Buttoncomponent from "./Buttoncomponent";
// import Priviewimg from "./Priviewimg";
import axios from "axios";
import { userAuthapi } from "../utils/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  // const {
  //   values,
  //   handleBlur,
  //   handleChange,
  //   handleSubmit,
  //   touched,
  //   errors,
  //   setFieldValue,
  // } = useFormik({
  //   initialValues: {
  //     name: "",
  //     email: "",
  //     password: "",
  //     conformpassword: "",
  //     image: "",
  //   },
  //   validationSchema: Yup.object().shape({
  //     name: Yup.string()
  //       .min(2, "Too Short!")
  //       .max(20, "Too Long!")
  //       .required("Name must be required"),
  //     email: Yup.string()
  //       .email("Invalid email")
  //       .required("Email must be Required"),
  //     password: Yup.string().min(8).required("password must required"),
  //     conformpassword: Yup.string()
  //       .oneOf([Yup.ref("password"), null], 'Must match "password" field value')
  //       .required("conform password must be required"),
  //     image: Yup.mixed()
  //       .required("image must required")
  //       .test(
  //         "FILE_SIZE",
  //         "Uploaded file is too big.",
  //         (value) => value && value.size < 1024 * 1024 * 1024
  //       )
  //       .test(
  //         "FILE_FORMAT",
  //         "Uploaded file has unsupported format.",
  //         (value) =>
  //           value &&
  //           [
  //             "image/jpg",
  //             "image/gif",
  //             "image/png",
  //             "image/jpeg",
  //             "image/svg",
  //             "image/webp",
  //           ].includes(value.type)
  //       ),
  //   }),
  //   onSubmit: (value, actions) => {
  //     axios
  //       .post(`${userAuthapi}/register`, value,{withCredentials:true})
  //       .then((res) => console.log(res), navigate("/chat"))
  //       // .catch((e) => toast.error(e.response.data.message));
  //       const data=localStorage.setItem("userInfo",JSON.stringify(value))
  //       console.log("data",data)
  //     actions.resetForm();
  //   },
  // });
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const { name, email, password, confirmpassword } = input;
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast.error("Please Fill all the Feilds");
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast.warning("Passwords Do Not Match");
      return;
    }
    // const ndata=[{...input},pic]
    // console.log("object",ndata)
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      axios
        .post(
          `${userAuthapi}/register`,
          { ...input, pic },
          config
        )
        .then((resolve) => {
          if(resolve){
            // localStorage.setItem("pic",JSON.stringify(pic))
            console.log("object",pic)
            localStorage.setItem("userInfo", JSON.stringify({data:resolve.data,pic:pic}));
            toast.success("Registration Successful");
            navigate("/chat");
          }
        })
        .catch((e) => toast.error(e.response.data.message));
      setPicLoading(false);
    } catch (error) {
      toast.error("Something went to wrong");
      setPicLoading(false);
    }
  };
  const postDetails = (pics) => {
    console.log("pic",pic)
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "htepld3m");
      data.append("cloud_name", "dxlicroam");
      fetch("https://api.cloudinary.com/v1_1/dxlicroam/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <Box className="form-wrapper">
      <form onSubmit={submitHandler}>
        <Input
          type="text"
          label="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={handleChange}
        />
        <Box className="password-btn">
          <Input
            type={passwordType}
            name="password"
            label="Password"
            value={password}
            onChange={handleChange}
          />
          <Buttoncomponent
            variant="text"
            onClick={togglePassword}
            className="new-btn"
          >
            {password && <Showhidepassword passwordType={passwordType} />}
          </Buttoncomponent>
        </Box>
        <Box className="password-btn">
          <Input
            type={passwordType}
            name="confirmpassword"
            value={confirmpassword}
            label="Conform Password"
            onChange={handleChange}
          />
          <Buttoncomponent
            variant="text"
            onClick={togglePassword}
            className="new-btn"
          >
            {confirmpassword && (
              <Showhidepassword passwordType={passwordType} />
            )}
          </Buttoncomponent>
        </Box>
        <Input
          type="file"
          name="pic"
          onChange={(e) => postDetails(e.target.files[0])}
          label="upload your Profile"
        />
        <Box className="button-group">
          <Buttoncomponent
            variant="contained"
            color="primary"
            type="submit"
            isLoading={picLoading}
          >
            Sign up
          </Buttoncomponent>
          {/* <Buttoncomponent
            variant="contained"
            color="error"
            button="Get guest user credential"
          /> */}
        </Box>
      </form>
    </Box>
  );
};

export default Signup;
