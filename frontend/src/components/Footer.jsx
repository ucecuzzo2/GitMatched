import React from 'react'; // Correct: no extra spaces


const Footer = () => {
    return (
        <footer className="bg-gray-800 p-4 text-white text-center">
        <p>&copy; {new Date().getFullYear()} GitMatched </p>
        </footer>


    );
};

export default Footer;