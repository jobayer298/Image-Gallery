import React, { useState } from "react";

import img2 from "../../../src/assets/images/image-10.jpeg";
import img1 from "../../../src/assets/images/image-1.webp";
import img3 from "../../../src/assets/images/image-11.jpeg";
import img4 from "../../../src/assets/images/image-2.webp";
import img5 from "../../../src/assets/images/image-3.webp";
import img6 from "../../../src/assets/images/image-4.webp";
import img7 from "../../../src/assets/images/image-5.webp";
import img8 from "../../../src/assets/images/image-6.webp";
import img9 from "../../../src/assets/images/image-7.webp";
import img10 from "../../../src/assets/images/image-8.webp";
import img11 from "../../..//src/assets/images/image-9.webp";
import UploadButton from "../Button/UploadButton";
import { FaUpload } from "react-icons/fa";

const Gallery = ({}) => {
  const [upload, setUpload] = useState([]);
  const [images, setImages] = useState([
    { path: img3 },
    { path: img2 },
    { path: img1 },
    { path: img4 },
    { path: img5 },
    { path: img6 },
    { path: img7 },
    { path: img8 },
    { path: img9 },
    { path: img10 },
    { path: img11 },
  ]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const imageUrl = URL.createObjectURL(files[i]);
      newImages.push({ path: imageUrl });
    }

    setUpload([...upload, ...newImages]);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const updatedImages = [...images];
    const draggedImage = updatedImages[draggedIndex];

    updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(index, 0, draggedImage);

    setImages(updatedImages);
  };

  const imageArray = [
    { path: img3 },
    { path: img2 },
    { path: img1 },
    { path: img4 },
    { path: img5 },
    { path: img6 },
    { path: img7 },
    { path: img8 },
    { path: img9 },
    { path: img10 },
    { path: img11 },
  ];

  return (
    <div className="w-1/2 mx-auto">
      <h1 className="text-3xl border-b-2 pb-3 border-[#a19d9d]  font-bold mt-6">
        Gallery
      </h1>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {images.concat(upload).map((image, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            className={` relative hover:brightness-50 rounded-xl hover:bg-gray-400 delay-150 transition-all group ${
              index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
            }`}
          >
            <img
              src={image.path}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <input
              className="absolute top-3 left-3"
              type="checkbox"
              name=""
              id=""
            />
          </div>
        ))}
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
              onChange={handleFileChange}
            />
            <p className="text-center mt-2">Add image</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
