import React from 'react';

interface ImageAsButtonProps {
  handleClick: () => void;
}

export default function ImageAsButton({ handleClick }: ImageAsButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="border-none p-0 bg-transparent cursor-pointer relative right-5 lg:right-30 ml-20"
    >
      <img
        src="./edit.jpeg"
        alt="Edit Profile Image"
        className="w-6 h-6 ml-8 lg:ml-10"
      />
    </button>
  );
};

export default ImageAsButton;


};

export default ImageAsButton;
