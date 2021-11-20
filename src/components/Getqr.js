import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode'

const Getqr = ({ base64 }) => {
  const [qrImg, setQrImg] = useState('');

  useEffect(() => {
    if (base64) {
      fetch('https://api.m3o.com/v1/image/Upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer ${process.env.REACT_APP_M3O_API_TOKEN}",
        },
        body: JSON.stringify({
          name: `${uuidv4()}.jpeg`,
          base64 
        })
      })
      .then(res => res.json())
      .then(({ url }) => {
        QRCode.toDataURL(url)
          .then(qrbase64 => {
            setQrImg(qrbase64)
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

  return (
    <div>
      <p>{base64}</p>
    </div>
  );
}

export default Getqr;
