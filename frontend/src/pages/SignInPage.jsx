import React, {useState} from 'react' //Import React and useState for managing component state
import axios from 'axios'; // Import axios to make HTTP requests to the backend 
import "../styles/SignInPage.css"; // Import the CSS file for styling 
import Header from "../components/Header.jsx";
import {Link} from 'react-router-dom'; // Import Link from react-router-dom

const SignInPage = () => {
    //useState Hook to manage form data for userName, emailm and password fields
    const [formData,setFormData] = useState({email: '', password: ''});


    //Function to handle input changes and upate formData state
    const handleChange = (e) => {
        //Use the events target name and value to update the corresponding form field
        setFormData({...formData,[e.target.name]: e.target.value});
    };

    //Funtion to handle form submission =
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevnt default form submission behavior (page reload)
        try {
            //Send a POST request to the backend with the form data using axios
            const response = await axios.post('http://localhost:5555/users/login',formData);
            if(response.status === 200) {
                alert("Successfully logged in!");
            }
            //Log the response from the server if the user is created succssfukllt
            console.log('Login Successful:', response.data);
            //Clear the form fields by resetting formData state
            setFormData({ email: '', password:''});
        } catch (error) {
            //Log any error that occurs during the reqeuest
            alert("Unsucessful log in try again!");
            console.log('Error creating user: ', error);
        }
    };

return (
  <div> 
    <Header/>
   <div className = "form-container"> 
     
        <h2> Sign In </h2>
    
        <form onSubmit = {handleSubmit} className = "sign-up-form">

            
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

            <button type = "submit" className = "form-button"> Log in </button> 
        </form>
        <Link to ="/create-account" className = "signup-link">
            Dont have an account?
        </Link>            
    </div>
 </div>
    );
};

export default SignInPage