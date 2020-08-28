import React, {useState } from 'react';
import Message from './Message';
import axios from 'axios';

const Input = () => {
  const [cerveza, setCerveza] = useState('');
  const [message,setMessage] = useState('')

const onChange=e=>{
    setCerveza(e.target.value)
}
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/cervezas',{
      });


      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='form-group mb-4'>
         <label>Cuantas personas van a asistir al meetup?</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="numero de personas"   onChange={onChange}></input>
        </div>


        <input
          type='submit'
          value='Submit'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      
    </>
  );
};

export default Input;