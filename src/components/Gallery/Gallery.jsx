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
import { FaTrash, FaUpload } from "react-icons/fa";

const Gallery = ({}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([
    img3,
    img2,
    img1,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
  ]);
  //upload image
  const handleImageUpload = (event) => {
    const newImages = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );

    // Concatenate the new images with the existing ones
    setImages([...images, ...newImages]);
  };

  //toggle imageSelection and delete
  const toggleImageSelection = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(
        selectedImages.filter((selectedIndex) => selectedIndex !== index)
      );
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const deleteSelectedImages = () => {
    const updatedImages = images.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  //drag image

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

  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto mt-6 rounded-xl bg-white p-7">
      <h1 className="text-3xl  pb-3   font-bold ">Gallery</h1>
      {selectedImages.length > 0 && (
        <div className="mt-4 flex justify-between items-center pb-3">
          <div className="flex gap-2 items-center">
            <input checked type="checkbox" name="" id="" />
            <p className=" font-medium">
              {selectedImages.length} files selected
            </p>
          </div>
          <p
            onClick={deleteSelectedImages}
            className="text-red-500 font-medium cursor-pointer"
          >
            Delete Files
          </p>
        </div>
      )} 
      <hr />
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            className={`relative rounded-xl imageBox hover:brightness-50 hover:bg-gray-400 delay-150 transition-all group ${
              index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
            }`}
          >
            {selectedImages.includes(index) && (
              <div className="absolute h-full w-full inset-0 bg-blue-200 opacity-50 rounded-xl"></div>
            )}
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover cursor-grab"
            />
            <input
              className={`absolute w-4 h-4 top-3 checkbox cursor-pointer left-3 opacity-0 transition-all delay-150 ${
                selectedImages.includes(index) ? "opacity-100" : ""
              }`}
              type="checkbox"
              name=""
              id={`checkbox-${index}`}
              checked={selectedImages.includes(index)}
              onChange={() => toggleImageSelection(index)}
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
              onChange={handleImageUpload}
            />
            <p className="text-center mt-2">Add image</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
