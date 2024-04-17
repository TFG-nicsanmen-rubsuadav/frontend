import React from "react";

const Button = ({ type, text, color }) => (
    <button className={`font-bold py-2 px-4 rounded text-sm sm:text-base md:text-base ${color === 'green' ? 'bg-primary-green text-white' : 'bg-primary-yellow text-black'}`}>
        {text}
    </button>
);

export default Button;