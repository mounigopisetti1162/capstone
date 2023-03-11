import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./global";
import {  toast } from 'react-toastify';
import FileBase64 from 'react-file-base64';
import { Formik, Form, Field, ErrorMessage} from "formik";
import './signup.css'
import axios from "axios";
const Signup = () => {

  const [status,setstatus]=useState('submit')
  const navigate=useNavigate()
  const [iteam,setiteam]=useState()
// validations of the form
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("name is mandatary"),
    email: Yup.string().email().required(),
    lastname: Yup.string().required(),
    password: Yup.string().min(3).max(50).required(),
    confrimpassword: Yup.string().oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm Password is required"),
    profile: Yup
      .string()
      .min(10),
  });
//intial values
  const initialValues = {

    firstname: "picha",
    lastname: "pokeamon",
    email: "pikachu@gmail.com",
    password: "",
    confrimpassword: "",
    profile:''

  };

// on submitting the valiadation and passing to the backend

  const onSubmit = (values) => {

    console.log("submited")
      setstatus('loding..') 
      console.log(values)
      
      const data={  firstname:values.firstname,email:values.email,lastname:values.lastname,password:values.password,confrimpassword:values.confrimpassword,profile:image
      }
      
      axios.post(`${API}/user/signup`,data)
     
      .then((datas)=>
      {
        console.log(datas)
    if(datas.status===401)
    {
      toast("email alredy exists")
      setstatus("error")
    throw new Error(datas.statusText)
    }
    setstatus("submited");
    navigate("/user/login")
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
  // console.log(iteam)
  
const [image,setimage]=useState({myfile:""})

const handelfileupload= async (e)=>{
 const file=e.target.files[0];
 const base64=await converttobase64(file)
 console.log(base64)
 setimage({myfile:base64})
}
// console.log(image)

  return (
    <>
    {/* <h1>sign up page</h1> */}
    <div className="sign">
    <div className="signup">
      <div className="signwrapper">
<div className="signup-1">
<h3 className="loginLogo">InFiChat</h3>
<img src='https://image.shutterstock.com/image-photo/women-hand-using-smartphone-typing-260nw-1198604539.jpg' alt='name'/>
      </div>
      <div className="signup-2">
      <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={values => {
       onSubmit(values);
      console.log(values)
    }}>

    <div className="form">
      <Form className="form-0">
        <div
          className="container"
          style={{
            width: "60%",
          }}
        >
<div className="form-1">
  <div className="form-2">
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

          <div className="field">
            <label className="label" htmlFor="confrimpassword">
             Profile Pc
            </label>
            <div className="control">
              <img src="/public/images/person/no-avatar.png" alt='' className="signup-img"/>
             <input
             name="profile"
             type="file"
            //  type="text"
             className="input-file"
             id='file-upload'
             accept=".jpeg,.png,.jpg"
             placeholder="profile"
             onChange={(e)=>handelfileupload(e)}/>
                   {/* <Field
                name="profile"
                type="text"
                className="input"
                placeholder="profile"
                values={iteam}
              /> */}
              <ErrorMessage name="profile" render={renderError} />
            </div>
          </div>
          


          <button type="submit" className="btn btn-primary">
           {status}
          </button>
<br></br>
        <Link to='/user/login'>Alredy had an account</Link>
 </div>
</div>
        </div>
      </Form>
      </div>
     

      </Formik>
      </div>
    </div>
    </div>
    </div>
      </>
  )
};

export default Signup;


function converttobase64(file)
{
return new Promise((resolve,reject)=>{
  const fileReader=new FileReader()
  fileReader.readAsDataURL(file)
  fileReader.onload=()=>{
    resolve(fileReader.result)
  }
  fileReader.onerror=(err)=>{
    reject(err)
  }
})
}