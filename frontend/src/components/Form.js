import React, { useState } from 'react';
import Textfield from './Textfield';
import Datefield from './Datefield';
import Numberfield from './Numberfield';
import './styles/Form.css'

const Form = (props) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [rooms, setRooms] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [advance, setAdvance] = useState(0);

  const handleChange = (field, value) => {
    const data = {
      'name': name, 
      'phone': phone, 
      'rooms': rooms, 
      'checkIn': checkIn, 
      'checkOut': checkOut, 
      'advance': advance
    }

    switch(field){
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'rooms':
        setRooms(value);
        break;
      case 'checkIn':
        setCheckIn(value);
        break;
      case 'checkOut':
        setCheckOut(value);
        break;
      case 'advance':
        if (value === ''){
          value = '0';
        } 
        else if (value[0] === '0'){
          value = value.substring(1);
        }

        setAdvance(value);
        break;
      default:
        break;
    }
    data[field] = value;
    props.onChange(data);
  };

  return (
    <div className='formDiv'>
      <div className='formRow'>
        <label>Name</label>
        <Textfield placeholder="e.g., Shaheer Ahmed" value={name} onChange={(e) => handleChange('name', e.target.value)} />
      </div>
      <div className='formRow'>
        <label>Phone Number</label>
        <Textfield placeholder="e.g., 03148598699" value={phone} onChange={(e) => handleChange('phone', e.target.value)} />
      </div>
      <div className='formRow'>
        <label>Rooms</label>
        <Textfield placeholder="e.g., 112, 114" value={rooms} onChange={(e) => handleChange('rooms', e.target.value)} />
      </div>
      <div className='formRow'>
        <label>Check-In Date</label>
        <Datefield value={checkIn} onChange={(e) => handleChange('checkIn', e.target.value)} />
      </div>
      <div className='formRow'>
        <label>Check-Out Date</label>
        <Datefield value={checkOut} onChange={(e) => handleChange('checkOut', e.target.value)} />
      </div>
      <div className='formRow'>
        <label>Advance Payment</label>
        <Numberfield value={advance} min={0} onChange={(e) => handleChange('advance', e.target.value)} />
      </div>
    </div>
  );
};

export default Form;
