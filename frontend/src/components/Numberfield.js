import React from 'react';
import './styles/Textfield.css'

const Numberfield = ({value, min, onChange}) => {

  return <input type="number" value={value} min={min} onChange={onChange}></input>;
};

export default Numberfield;
