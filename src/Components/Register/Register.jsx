import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let phoneRegExp =
    /^[+2]{0,1}((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validation = yup.object({
    name: yup
      .string()
      .required("name is required")
      .max(15, "max length is 15 chars")
      .min(3, "min length is 3 chars"),
    email: yup
      .string()
      .required("email is required")
      .email("email is not valid"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password start with capital letter then from 5 to 10 letters or digits"
      ),
    age: yup
      .string()
      .required("age is required")
      .matches(/^\S[0-9]{1,3}$/, "age is not valid"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(phoneRegExp, "Phone number is not valid"),
  });
  async function sendData(values) {
    setLoading(true);
    let { data } = await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.msg);
        toast.error(err.response.data.msg, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    setLoading(false);
    toast.success("Register Successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/login");
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: validation,
    onSubmit: sendData,
  });
  function changeBgRegister() {
    document.getElementById("changeR").classList.add("auth");
  }
  return (
    <>
      <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 py-md-0">
        <div className="content row gx-0">
          <div className="col-md-5">
            <div className="bg-main text-white h-100 d-flex align-items-center justify-content-center flex-column p-5 text-center">
              <h2 className="mb-3 fw-bold">Welcome Back!</h2>
              <p>
                To Keep Conected With Us Please Login With Your Personal
                Information
              </p>
              <Link to={"/login"}>
                <button className="btn btn-outline-light fw-bold rounded-pill py-2 px-4">
                  Login
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-7 bg-light">
            <div className="text-center p-5">
              <h1 className="text-main fw-bolder">Create Account</h1>
              <div className="social-media d-flex gap-3 mt-3 justify-content-center">
                <div className="rounded-circle">
                  <i className="fa-brands fa-facebook"></i>
                </div>
                <div className="rounded-circle">
                  <i className="fa-brands fa-instagram"></i>
                </div>
                <div className="rounded-circle">
                  <i className="fa-brands fa-google"></i>
                </div>
              </div>
              <h6 className="mt-2 mb-3">or create your account here</h6>
              <form onSubmit={formik.handleSubmit}>
                {error ? <p className="text-danger ">{error}</p> : ""}
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter Name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.name}
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="email"
                  className="form-control mt-3"
                  placeholder="Enter Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.email}
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="password"
                  className="form-control mt-3"
                  placeholder="Enter Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.password}
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="number"
                  className="form-control mt-3"
                  placeholder="Enter Age"
                  name="age"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.age && formik.touched.age ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.age}
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="tel"
                  className="form-control mt-3"
                  placeholder="Enter Phone"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.phone}
                  </p>
                ) : (
                  ""
                )}
                <button
                  onClick={() => changeBgRegister()}
                  id="changeR"
                  type="submit"
                  className="btn-style text-center mt-3 w-100"
                >
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <Oval
                        height={30}
                        width={30}
                        color="#fff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#86b7fe"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
