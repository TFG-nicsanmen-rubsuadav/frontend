import React from 'react';
import Input from '../input';
import Button from '../button';

const Form = ({ fields, buttonText }) => (
  <div className="flex items-center justify-center h-screen bg-white px-10 rounded-lg">
    <form className="flex flex-col items-center justify-center p-4 w-full lg:w-1/2">
      {fields.map((field, index) => (
        <Input key={index} type={field.type} placeholder={field.placeholder} label={field.label} staticPrefix={field.staticPrefix} className="w-full lg:w-3/4" />
      ))}
      <div className="flex justify-center mt-4 w-full lg:w-3/4">
        <Button text={buttonText} className="w-full" color="green" />
      </div>
    </form>
  </div>
);

export default Form;