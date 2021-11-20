import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import ClipLoader from "react-spinners/ClipLoader";

const Getqr = ({ base64 }) => {
  const [loading, setLoading] = useState(true);
  const [qrImg, setQrImg] = useState('');
  const uuidName = uuidv4();

  useEffect(() => {
    if (base64) {
      fetch('https://api.m3o.com/v1/image/Upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer ${process.env.REACT_APP_M3O_API_TOKEN}",
        },
        body: JSON.stringify({
          name: `${uuidName}.jpeg`,
          base64 
        })
      })
      .then(res => res.json())
      .then(({ url }) => {
        QRCode.toDataURL(url)
          .then(qrbase64 => {
            setQrImg(qrbase64);
            setLoading(false);
          })
          .catch(err => {
            console.error(err)
          })
      })


    }
  }, [base64])

  useEffect(() => {
    console.log(qrImg)
  }, [qrImg])

  if (loading) return <div className="loading__container">
    <ClipLoader color="#111" loading={loading} size={150} />
  </div>;

  return (
    <div className='getqr'>
      <img src={qrImg} alt="" className='qr-img' />
      <a href={qrImg} className='qr-img-download' download={uuidName} >Download QR Code Image</a>
    </div>
  );
}

export default Getqr;
