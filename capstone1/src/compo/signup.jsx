import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./global";
import {  toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage} from "formik";

const Signup = () => {

  const [status,setstatus]=useState('submit')
  const navigate=useNavigate()
// validations of the form
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("name is mandatary"),
    email: Yup.string().email().required(),
    lastname: Yup.string().required(),
    password: Yup.string().min(3).max(50).required(),
    confrimpassword: Yup.string().oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm Password is required")
  });
//intial values
  const initialValues = {

    firstname: "picha",
    lastname: "pokeamon",
    email: "pikachu@gmail.com",
    password: "",
    confrimpassword: "",

  };

// on submitting the valiadation and passing to the backend

  const onSubmit = (values) => {

    console.log("submited")
      setstatus('loding..') 
      console.log(values)
      fetch(`${API}/user/signup`,{
        method:'POST',
        body:JSON.stringify(values),
        headers:{"Content-Type":"application/json"},
      }).then((data)=>
      {
        console.log(data)
    if(data.status===401)
    {
      toast("email alredy exists")
      setstatus("error")
    throw new Error(data.statusText)
    }
    setstatus("submited");
    return data.json();})
    .then((data)=>{navigate("/user/login")
    console.log(data)

    toast("verify- Mail has been sent")    
    //adding token to the local storage
    // localStorage.setItem('token',data.token);
    })
    .catch((err)=>{
      toast("username alredy exist")
    })
    }
  //change the color
    const renderError = (message) => <p className="help is-danger">{message}</p>;
  

  return (
    <>
    {/* <h1>sign up page</h1> */}
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={values => {
       onSubmit(values);
      console.log(values)
    }}>

    <div>
      <Form>
        <div
          className="container"
          style={{
            width: "60%",
          }}
        >

          <div className="field">
            <label className="label" htmlFor="firstname">
              Full name
            </label>
            <div className="control">
              <Field
                name="firstname"
                type="text"
                className="input"
                placeholder="Full name"
              />
              <ErrorMessage name="firstname" render={renderError} />
            </div>
          </div>


          <div className="field">
            <label className="label" htmlFor="email">
              Email address
            </label>
            <div className="control">
              <Field
                name="email"
                type="text"
                className="input"
                placeholder="Email address"
              />
              <ErrorMessage name="email" render={renderError} />
            </div>
          </div>


          <div className="field">
            <label className="label" htmlFor="lastname">
            lastname
            </label>
            <div className="control">
              <Field
                name="lastname"
                type="text"
                className="input"
                placeholder="Title"
              />
              <ErrorMessage name="lastname" render={renderError} />
            </div>
          </div>
      

          <div className="field">
            <label className="label" htmlFor="password">
              password
            </label>
            <div className="control">
              <Field
                name="password"
                type="password"
                className="input"
                placeholder="password"
              />
              <ErrorMessage name="password" render={renderError} />
            </div>
          </div>


          <div className="field">
            <label className="label" htmlFor="confrimpassword">
             Confrim password
            </label>
            <div className="control">
              <Field
                name="confrimpassword"
                type="password"
                className="input"
                placeholder="confrimpassword"
              />
              <ErrorMessage name="confrimpassword" render={renderError} />
            </div>
          </div>


          <button type="submit" className="btn btn-primary">
           {status}
          </button>
<br></br>
        <Link to='/user/login'>Alredy had an account</Link>

        </div>
      </Form>
      </div>
      </Formik>
      </>
  )
};

export default Signup;