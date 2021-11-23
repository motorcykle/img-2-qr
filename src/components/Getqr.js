import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import ClipLoader from "react-spinners/ClipLoader";
import ImageKit from "imagekit";

const Getqr = ({ base64 }) => {
  const [loading, setLoading] = useState(true);
  const [qrImg, setQrImg] = useState('');
  const uuidName = uuidv4();

  useEffect(() => {
    if (base64) {

      fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
        },
        body: JSON.stringify({
          image: base64.split(',')[1]
        })
      })
      .then(res => res.json())
      .then(({ data: { link } }) => {
        QRCode.toDataURL(link)
          .then(qrbase64 => {
            setQrImg(qrbase64);
            setLoading(false);
          })
          .catch(err => {
            alert(err.message)
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
