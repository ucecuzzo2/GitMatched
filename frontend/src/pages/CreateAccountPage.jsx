import React, {useState} from 'react'
import axios from 'axios';
import "../styles/SignInPage.css";
import Header from "../components/Header.jsx";
import {Link} from 'react-router-dom'; 


const CreateAccountPage = () => {

  //useState Hook to manage form data for userName, email, and password Fields
  const [formData,setFormData] = useState({name: '',email: '', pasword: ''});

  //Funtion to handle submit input changes and update formData state
  const handleChange = (e) => {
    //Use the events target name and value to update the corresponding form field
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  //Funtion to handle form Submisson;
  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      //Send a POST request to the backend with the form data using axios
      const response = await axios.post('http://localhost:5555/users/signup',formData);
      if (response.status === 200) {
        alert ("Account created successfully!")
      }
      //Log Response from the server if the user is created sucessfullt
      console.log('User Created', response.data);
      //Clear the form fields by ressting formData state
      setFormData({name: '', email: '', password: ''});
    } catch(error) {
      //Log any error that occurs during the requets
      alert ("Account created unsuccesfully");
      console.log('Error creating user: ', error);
    }
  };

return (
  <div>
    <Header/>
     <div className = "form-container">
      <h2> Create Account </h2>
      <form onSubmit = {handleSubmit} className = "sign-up-form">
        <input 
          type = "name"
          name = "name"
          placeholder = "Full name"
          value = {formData.name}
          onChange = {handleChange}
          required
          className = "form-input"
        />
        <input 
          type = "email"
          name = "email"
          placeholder = "Email"
          value = {formData.email}
          onChange = {handleChange}
          required
          className = "form-input"
        />
        <input 
          type = "password"
          name = "password"
          placeholder = "Password"
          value = {formData.password}
          onChange = {handleChange}
          required
          className = "form-input"
        />
          <button type = "submit" className = "form-button"> Create Account </button>
      </form>
          <Link to = "/sign-in " className = "signup-link">
            Back to Sign In
          </Link>
    </div >
  </div >
  );
};


export default CreateAccountPage
