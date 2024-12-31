import React from 'react';
import './styles/Textfield.css'

const Textfield = ({value, onChange, placeholder}) => {

  return <input type="text" placeholder={placeholder} value={value} onChange={onChange} />;
};

export default Textfield;
