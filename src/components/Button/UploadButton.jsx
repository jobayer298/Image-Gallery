import React from 'react';
import { FaUpload } from 'react-icons/fa';

const UploadButton = () => {
    return (
      <div
        onClick={() => document.getElementById("input").click()}
        className="border cursor-pointer flex justify-center items-center  border-dashed border-[#d6cfcf]"
      >
        <div className="">
          <FaUpload className="text-2xl mx-auto" />
          <input
            className="hidden"
            accept="image/*"
            multiple
            type="file"
            name=""
            id="input"
          />
          <p className="text-center mt-2">Add image</p>
        </div>
      </div>
    );
};

export default UploadButton;