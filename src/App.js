import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import Getqr from './components/Getqr';
import Uploadimg from './components/UploadImg';
import './index.css';

const App = () => {
  const [base64, setBase64] = useState('');

  return (
    <div className='app'>
      <img src={Logo} alt="" className='logo' />

      {base64 && <Getqr base64={base64} />}

      <Uploadimg setBase64={setBase64} />

    </div>
  );
}

export default App;
