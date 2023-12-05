"use client";
import { getFirestore, doc, updateDoc, collection } from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import "src/app/styles.css";
import { auth } from "@/lib/firebase/config";
import firebase from "firebase/compat/app";
import Header from "@/components/Header";
import { useState, useEffect } from 'react';

type FormData = {
  amount: number; 
  name: string;
  cardNumber: number;
  expirationDate: number;
  cvv: number;
};

export default function Payment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [user, setUser] = useState<User | null>(null);
  const authInstance = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      setUser(user);
    });

  
    return () => unsubscribe();
  }, [authInstance]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('Form data:', data);
    alert('clicked');
  
    if (!user) {
      console.error('User not authenticated');
      return;
    }
  
    const userRef = doc(db, 'users', user.uid);
  
    try {
      await updateDoc(userRef, {
        amount: data.amount,
      });
  
      console.log('Amount updated successfully!');
      
      
      alert('Payment successful!'); 
  
    } catch (error) {
      console.error('Error updating amount:', error);
      // Handle error, show error message
    }
  };

  return (
    <div>
      <div>
        <Header/>
      </div>

      <form
        className="max-w-md mx-auto mb-4 mt-8 p-6 rounded-lg shadow-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount of money you want to add
          </label>
          <input
            type="number"
            className="text-black border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Amount"
            {...register("amount")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            className="text-black border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Name"
            {...register("name")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Card Number
          </label>
          <input
            type="number"
            className="text-black border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Card Number"
            {...register("cardNumber", {
              required: true,
              maxLength: 19,
              pattern: /^\S+@\S+$/i,
            })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Expiration Date
          </label>
          <input
            type="datetime"
            className="text-black border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Expiration Date"
            {...register("expirationDate")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            CVV
          </label>
          <input
            type="password"
            className="text-black border rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="CVV"
            {...register("cvv", { required: true, maxLength: 5 })}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
        <img
          src="/images/visa.jpg"
          alt="Visa MasterCard"
          className="h-14 mb-4 mx-auto"
        />
      </form>
      
    </div>
  );
}
