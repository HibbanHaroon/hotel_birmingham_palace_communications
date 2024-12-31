import React, {useState} from 'react';
import Form from './Form';
import Message from './Message';
import './styles/Content.css'

const Content = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', rooms: '', checkIn: '', checkOut: '', advance: 0 });
    
  const handleChange = (data) => {
    setFormData(data);

  };

  return (
    <div className='contentDiv'>
      <Form onChange={handleChange} />
      <Message name={formData.name} phone={formData.phone} rooms={formData.rooms} checkIn={formData.checkIn} checkOut={formData.checkOut} advance={formData.advance}/>
    </div>
  );
};

export default Content;
