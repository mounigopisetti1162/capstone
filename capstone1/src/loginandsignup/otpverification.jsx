import React from 'react'
import { API } from "./global";
import * as Yup from "yup";
import {  toast } from 'react-toastify';
import './otpverification.css'
import { Formik, Form, Field, ErrorMessage} from "formik";
import { useNavigate, useParams } from "react-router-dom";
function Otpverification() {
  const nav=useNavigate()
  const tokens=useParams()
  const token=tokens.token
    const onSubmit=(values)=>{
        console.log("data")
        fetch(`${API}/user/otpverification/${token}`,{
        method:"POST",
        body:JSON.stringify(values),
        headers:{"Content-type":"application/json"},
    }).then((data)=>{
      console.log("data")
    if(data.status===403)
    {
      toast('otp has expired')
    } 
    else if(data.status===404)
    {
      toast('wrong otp entered')
    }
    
    return data.json()}).then((data)=>{
      if(data.message==='the verification is done')
      {
            console.log(data)
            toast("verified")
            nav('/user/login')
      }
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
    <>
    <div className="otpverification">
      <div className="otp">

      
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
      </div>
    </div>
      </>
  )
}

export default Otpverification