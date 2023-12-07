"use client";
import React, {useState, useEffect} from 'react';
import {doc, setDoc, getDoc} from 'firebase/firestore';
import Image from 'next/image';
import ImageAsButton from './ImageAsButton';
import {collection, query, where} from 'firebase/firestore';
import {app, firestore} from '../firebase';



export default function ProfileDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const[name, setName]= useState('John Doe');
  const[description, setDescription] = useState("Let's Explore");

  const profileRef = doc(collection(firestore, 'Profile'), 'profileName');
  
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
    setDoc(profileRef, {
      name, 
      description,
    });
   
  };

  useEffect(() => {
    getDoc(profileRef)
    .then((docSnap) => {
      if(docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setDescription(data.description);
      }
    })
    .catch((error) => {
      console.error('Error fetching document:', error);
    });
}, []);

  return (
    <section className="max-container padding-container flex flex-col lg:flex-row gap-20 py-10 pb-32 items-start">
      {/* Profile Picture */}
      <div className='profile-picture'>
        <Image 
          src="/pfp.png"
          alt="profile"
          height={400}
          width={400}
        
          
        />
      </div>

      {/* Content */}
      <div className='relative z-20'>
        <div className='ml-0 lg:mt-6'>
        <div className="flex  flex-col lg:flex-row items-center"> {/* Flex container */}
        {/* Name input or text */}
        <div className='flex flex-col'>
          <h1 className='Name'>
            {isEditing ? (
             <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              style={{ color: 'black' }}
              className='name-input'  />
             ):(
              name
             )}
             </h1>
        
        {/* Description */}
        {!isEditing && (
          <div className='Description'>
            <p className='regular-16 mt-2'>
              {description}
            </p>
            </div>
        )}

        {/* Editable Description */}
        {isEditing && (
            <div className='EditableDescription'>
              <textarea
                value={description} 
                onChangeCapture={(e) => setDescription(e.target.value)} 
                style={{ color: 'black' }} /> 
                <button className= "EditButton" onClick={handleSaveClick}>Save</button>
                </div>
          )}
          </div>

        {/* Image as a button */}
        <ImageAsButton handleClick={handleEditClick} />
        
          </div>
        </div>
        {/* Following Count */}
        <div className="flex items-center mt-10 text-gray-30 lg:mt-4">
          <h3 className="bold-12 mr-4">50</h3>
          <h6 className="bold-5">Followers</h6>
          <h3 className="bold-12 ml-8 mr-4">99</h3>
          <h6 className="bold-5">Following</h6>
        </div>
      </div>
    </section>

  );
};

