import React from 'react';
import './styles/Textfield.css'

const Datefield = ({value, onChange}) => {

  return <input type="date" value={value} onChange={onChange} min="2000-01-01" max="2999-12-31" />;
};

export default Datefield;
