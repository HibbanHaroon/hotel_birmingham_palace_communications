import React, { useRef, useState } from 'react';
import Lottie from "lottie-react";
import tickAnimation from '../assets/animations/tick.json';
import toast from 'react-hot-toast';
import './styles/Message.css'

const Message = (props) => {
  var checkIn = '';
  var checkOut = '';

  var checkInDayMonth = '';
  var checkOutDayMonth = '';

  var reservationText = '';

  var advanceText = '0';

  function extractDate(date){
    var [year, month, day] = date.split('-');
    return {'year': year, 'month': month, 'day': day};
  }

  function dateFormat(date){
    return `${dayFormat(date.day)} ${monthFormat(date.month)}, ${date.year}`;
  }

  function monthFormat(month){
    const month_mapping = {
      1 : 'January',
      2 : 'February',
      3 : 'March',
      4 : 'April',
      5 : 'May',
      6 : 'June',
      7 : 'July',
      8 : 'August',
      9 : 'September',
      10 : 'October',
      11 : 'November',
      12 : 'December',
    }
    return month_mapping[parseInt(month)]
  }

  function dayFormat(day){
    const day_mapping = {
      0 : 'th',
      1 : 'st',
      2 : 'nd',
      3 : 'rd',
      4 : 'th',
      5 : 'th',
      6 : 'th',
      7 : 'th',
      8 : 'th',
      9 : 'th',
    }

    const lastDigit = day[day.length - 1];
    day = parseInt(day);
    day = day.toString() + day_mapping[lastDigit];

    return day;
  }

  function getPreviousDate(date){
    const dateTimestamp = date.getTime();

    const oneDay = 24 * 60 * 60 * 1000;

    const yesterdayTimestamp = dateTimestamp - oneDay;

    const yesterday = new Date(yesterdayTimestamp);

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');

    const formattedYesterday = `${year}-${month}-${day}`;

    return(formattedYesterday);
  }

  function getAdvanceText(advance){
    var text = advance;
    if (advance.length > 4){
      text = '';
      var count = 0
      for (var i = advance.length - 1; i >= 0; i--){
        text = advance[i] + text;
        count++;
        if (count % 3 === 0){
          text = ',' + text;
          count = 0
        }
      }
      if (advance.length % 3 === 0){
        text = text.substring(1);
      }
    }

    return text;
  }

  if (props.checkIn !== '' && props.checkOut !== ''){
    if (props.checkIn !== ''){
      const checkInDate = extractDate(props.checkIn);
      checkIn = dateFormat(checkInDate);
  
      checkInDayMonth = `${dayFormat(checkInDate.day)} ${monthFormat(checkInDate.month)}`;
    }
    if (props.checkOut !== ''){
      const checkOutDate = extractDate(props.checkOut);
      checkOut = dateFormat(checkOutDate);
  
      console.log(getPreviousDate(new Date(props.checkOut)));
  
      checkOutDayMonth = extractDate(getPreviousDate(new Date(props.checkOut)));
      checkOutDayMonth = `${dayFormat(checkOutDayMonth.day)} ${monthFormat(checkOutDayMonth.month)}`;
    }
    if (props.checkIn === props.checkOut){
      reservationText = checkInDayMonth;
    }
    else {
      reservationText = `${checkInDayMonth} - ${checkOutDayMonth}` 
    }
  }

  if (props.advance !== 0){
    advanceText = getAdvanceText(props.advance);
  }

  const copiedToClipboardToast = () => toast('Copied to Clipboard!', {
    duration: 1500,
    position: 'top-center',
  
    style: {
      fontFamily: 'Satoshi',
    },
    className: '',
  
    icon: '✅',
  
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
  
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });

  const messageDivRef = useRef(null);
  const lottieRef = useRef();
  const [copied, setCopied] = useState(false);

  function copyToClipboard(){
    const messageDiv = messageDivRef.current;

    if (messageDiv) {
      const selection = window.getSelection();
      const range = document.createRange();

      range.selectNodeContents(messageDiv);
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand('copy');
      selection.removeAllRanges();

      setCopied(true);

      lottieRef.current.setSpeed(2);
      lottieRef.current.play();

      const tickAnimation = document.getElementById('tickAnimation');
      if (tickAnimation) {
        tickAnimation.style.display = 'flex';
      }

      copiedToClipboardToast();
    }
  }

  function handleAnimationStop(){
    setCopied(false);

    lottieRef.current.stop();

    const tickAnimation = document.getElementById('tickAnimation');
    if (tickAnimation) {
      tickAnimation.style.display = 'none';
    }
  }

  const style = {
    height: 200,
    width: 200
  }

  return (
    <div className='outerDiv'>
      <div className={`messageDiv ${copied ? 'copiedDiv' : ''}`} id='messageDiv'ref={messageDivRef} onClick={copyToClipboard}>
        <p>
            Dear {props.name}, 
            <br></br>
            <br></br>

            Thank you for choosing Hotel Birmingham Palace for your upcoming stay. We are pleased to confirm your reservation 
            for the date {reservationText}. 
            <br></br>
            <br></br>
            
            <b>Booking Details:</b>
            <br></br>
            <br></br>

            Room Number: {props.rooms} 
            <br></br>
            Check-in Date: {checkIn}
            <br></br>
            Check-out Date: {checkOut}
            <br></br>
            <br></br>

            <b>Advance Payment:</b>
            <br></br>
            <br></br>

            A payment of Rs. {advanceText} has been received in advance to secure your reservation.
            <br></br>
            <br></br>

            We look forward to providing you with a comfortable and enjoyable experience during your stay. 
            Our team is dedicated to ensuring your time with us is memorable.
            <br></br>
            <br></br>

            Should you have any special requests or need further assistance, feel free to reach out.
            <br></br>
            <br></br>

            Thank you once again for choosing Hotel Birmingham Palace. We are eagerly anticipating your arrival.
            <br></br>
            <br></br>

            Warm regards,
            <br></br>
            <br></br>
            <b>HBP</b>
        </p>
        <div className='tickAnimation' id='tickAnimation'>
          <Lottie animationData={tickAnimation} loop={false} autoplay={false} height={200} width={200} style={style} lottieRef={lottieRef} onComplete={handleAnimationStop}/>
        </div>
      </div>
    </div>
  );
};

export default Message;