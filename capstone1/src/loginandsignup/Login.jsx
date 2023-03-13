import {useFormik} from 'formik'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage} from "formik";
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// import './signup.css'
import './Login.css'
import { API } from './global'
export default function Login() {

  const [status,setstatus]=useState('Submit')
  const navigate=useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(3).max(50).required(),
    
  });

  const initialValues = {
    email: "",
    password: "",
  };
  const nav=useNavigate();


const onSubmit=(values)=>{
  console.log("submited")

  setstatus('loding..') 
  console.log(values)
  fetch(`${API}/user/login`,{
    method:'POST',
    body:JSON.stringify(values),
    headers:{"Content-Type":"application/json"},
    
  }).then((data)=>
  {
   

if(data.status===401)
{
  toast("invalid credentials")
  setstatus("error")
throw new Error(data.statusText)

}
else if(data.status===402)
{
  toast("verification needed")
  setstatus("error")
// throw new Error(data.statusText)

}

return data.json();})
.then((data)=>{console.log(data);
// localStorage.setItem('token',data.token);
if(data.message==="logged in sucessfully")
{
  const id=(data.emailfound._id)
nav(`/message/${id}`);
toast("Logged in sucessfully")
localStorage.setItem('token',data.token);
}
})
.catch((err)=>{console.log(err);
toast("inalid credentials")})
}

const renderError = (message) => <p className="help is-danger">{message}</p>;
  
  return(
  <>
  <div className="sign1">
    <div className="signup1">
      <div className="signwrapper1">
<div className="signup-11">
<h3 className="loginLogo1">InFiChat</h3>
{/* <img className="loginimage" src='  https://media.tenor.com/6pBm1sGCTnAAAAAM/excited-pikachu.gif
' alt='name'/> */}
      </div>
      <div className="signup-21"></div>
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
          className="container1"
          style={{
            width: "60%",
          }}
        >
           <div className="field1">
            <label className="label1" htmlFor="email">
              Email Address
            </label>
            <div className="control1">
              <Field
                name="email"
                type="text"
                className="input"
                placeholder="Email address"
              />
              <ErrorMessage name="email" render={renderError} />
            </div>
          </div>
          <div className="field1">
            <label className="label1" htmlFor="password">
              password
            </label>
            <div className="control1">
              <Field
                name="password"
                type="password"
                className="input"
                placeholder="password"
              />
              <ErrorMessage name="password" render={renderError} />
            </div>
          </div>
          
      
          <button type="submit" className="btn btn-primary" 
          >
            {status}
          </button>
          <br></br>
        <Link to='/'>No Account</Link>
        <br></br>
        <br></br>
        <Link to='/verification'>Forgot Password</Link>

        </div>
      </Form>
      </div>
      
      </Formik>
      </div>
    </div>
    </div>
        </>
        );
}
