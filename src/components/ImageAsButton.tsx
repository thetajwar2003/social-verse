import { relative } from 'path';
import React from 'react';

interface ImageAsButtonProps {
  handleClick: () => void;
}

const ImageAsButton: React.FC<ImageAsButtonProps> = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      style={{
        border: 'none',
        padding: 0,
        background: 'none',
        cursor: 'pointer',
        position: 'relative',
        right: 20
      }}
    >
      <img
        src="/edit.jpeg"
        alt="Edit Profile Image"
        className="w-6 h-6 ml-30 lg:ml-10"
      />
    </button>
  );
};

export default ImageAsButton;
