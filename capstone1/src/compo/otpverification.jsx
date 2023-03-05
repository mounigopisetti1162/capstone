import React from 'react'
import { API } from "./global";
import * as Yup from "yup";
import {  toast } from 'react-toastify';

import { Formik, Form, Field, ErrorMessage} from "formik";
import { useNavigate } from "react-router-dom";
function Otpverification() {
    const onSubmit=(values)=>{
        console.log("data")
        fetch(`${API}/user/otpverification`,{
        method:"POST",
        body:JSON.stringify(values),
        headers:{"Content-type":"application/json"},
    }).then((data)=> data.json()).then((data)=>{
            console.log(data)
            toast("verified")
            nav('/login')
        })
      }
      const validationSchema = Yup.object().shape({
        otp: Yup.string().required(),
       
      });
    const initialValues = {
        otp:"",
      };
const renderError = (message) => <p className="help is-danger">{message}</p>;


  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={values => {
       onSubmit(values);
      console.log(values)
    }}
  >
    <div>
      <Form>
        <div
          className="container"
          style={{
            width: "60%",
          }}
        >
            <div className="field">
            <label className="label" htmlFor="email">
              Enter the OTP
            </label>
            <div className="control">
              <Field
                name="otp"
                type="text"
                className="input"
                placeholder="Enter OTP"
              />
              <ErrorMessage name="otp" render={renderError} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" >
            Submitt
          </button>
          
          </div>
          </Form>
      </div>
      
      </Formik>
  )
}

export default Otpverification