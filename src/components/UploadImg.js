import React, { useEffect, useRef, useState } from 'react';
import UploadIcon from '../../assets/upload-icon.png';

const Uploadimg = ({ setBase64 }) => {
  const [img, setImg] = useState('');
  const inputRef = useRef(null);

  const setNewImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      setImg(reader.result);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="uploadImg">
      {img ? (
        <div className='uploaded-img'>
          <img src={img} alt="" />
          <div className="btns">
            <button className='btn btn-create' onClick={() => setBase64(img)}>Create QR Code</button>
            <button className='btn btn-delete' onClick={() => setImg('')}>Remove upload</button>
          </div>
        </div>
      ) : (
        <div className='upload-file-btn' role="button" onClick={() => inputRef.current.click()} >
          <img src={UploadIcon} className='upload-icon' alt="" />
          <p>Upload image</p>
          <input className='file-input' type="file" name="" id="" ref={inputRef} onChange={setNewImg} />
        </div>
      )}
      
      
    </div>
  );
}

export default Uploadimg;
