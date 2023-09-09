import React,{useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "./../assets/Logo.png"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { registerRoute } from '../utils/APIRoutes';
import axios from "axios"

const toastoptions = {
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    theme:"dark",
};

function Register() {
    const navigate = useNavigate();
    const [values,setValues]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
    })

    useEffect(() => {
      if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/");
      }
    }, []);

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            const{password,confirmpassword,username,email}=values;
            const {data} = await axios.post(registerRoute,{
                username,
                email,
                password,
            })
            
            if (data.status===false){
              toast.error(data.msg,toastoptions);
            }
            if (data.status===true){
              localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY,JSON.stringify(data.user));
              navigate("/");  
            }
        }
    };

    const handleChange = (event)=>{
        setValues({...values,[event.target.name]: event.target.value}) //username:ctr
    };

    const handleValidation = ()=>{
        const{password,confirmpassword,username,email}=values;
        if (password !== confirmpassword){
            toast.error("Passwords Do not match",toastoptions);
            return false;
        }
        else if (username.length < 4){
            toast.error("username should be longer than 4 characters",toastoptions)
            return false;
        }
        else if(email === ""){
            toast.error("email is required",toastoptions);
            return false;
        }
        else if(password.length<8) {
            toast.error("password should be longer than 8 charactors",toastoptions)
            return false;
        }
        
        return true; 
    }

  return (
    <>
    <FormContainter>
        <form onSubmit={(event)=> handleSubmit(event)}>
        <div className='brand'>
            <img src={Logo} alt="Logo"/>
            <h1>CHATnow</h1>
        </div>
        <input 
            type='text' 
            placeholder='Username' 
            name='username'
            onChange={(e)=>handleChange(e)}
        />
        <input 
            type='email' 
            placeholder='Email' 
            name='email'
            onChange={(e)=>handleChange(e)}
        />
        <input 
            type='password' 
            placeholder='Password' 
            name='password'
            onChange={(e)=>handleChange(e)}
        />
        <input 
            type='password' 
            placeholder='Confirm Password' 
            name='confirmpassword'
            onChange={(e)=>handleChange(e)}
        />
        <button type='submit'>Create Account</button>
        <span>
            already have an account? 
            <Link to="/login">Login</Link> 
        </span> 
        </form>

    </FormContainter>
    <ToastContainer/>
    </>
  )
}

const FormContainter=styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      img {
        height: 6rem;
      }
      h1 {
        color: white;
        text-transform: uppercase;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.4rem;
      background-color: #00000076;
      border-radius: 2rem;
      padding: 3rem 6rem;
    }
    input {
      background-color: transparent;
      padding: 1rem;
      box-sizing: border-box;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
    
      background-color: #6639e0;
      box-sizing: border-box;
      width: 100%;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
`;  

export default Register