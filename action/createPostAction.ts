"use server";
import { AddPostRequestBody } from "../api/posts/route";

// import generateSASToken, { containerName } from "@/lib/generateSASToken";
import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import 'firebase/storage';
import { Post } from "@/mongodb/models/post";
import { User } from "@/types/user";
// import { BlobServiceClient } from "@azure/storage-blob";
import { currentUser } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { ChangeEvent, FC } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

require('dotenv').config();
// Firebase configuration interface
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Initialize Firebase with environment variables
const firebaseConfig = {
  apiKey: "AIzaSyBwIT6q-fCnAl8OitOBXXX4qbXtxOLznwE",
  authDomain: "linkedin-97527.firebaseapp.com",
  projectId: "linkedin-97527",
  storageBucket: "linkedin-97527.appspot.com",
  messagingSenderId: "257820236826",
  appId: "1:257820236826:web:7e3974340021c48278c5a3",
  measurementId: "G-JQ5QDTQ803"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default async function createPostAction(formData: FormData) {
  const user = await currentUser();
  const postInput = formData.get("postInput") as string;
  const storage = getStorage();
  const image = formData.get("image") as File;
  let image_url = undefined;  

  if (!postInput) {
    throw new Error("Post input is required");
  }

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const current_user: User = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  const uploadImageToFirebase = async (file: File): Promise<string> => {
    try {
      // Create a reference to the file in Firebase Storage
      const storageRef = ref(storage, file.name);
      
      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Return the download URL
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image to Firebase Storage:', error);
      throw error;
    }
  };
  
  try {
    if (image) {

      
      const image_url = await uploadImageToFirebase(image);

      const body: AddPostRequestBody = {
        user: current_user,
        text: postInput,
        imageUrl: image_url,
      };

      await Post.create(body);
    } 
    else {

      const body: AddPostRequestBody = {
        user: current_user,
        text: postInput,
      };

      await Post.create(body);
    
    }
  } catch (error: any) {
    throw new Error("Failed to create post", error);
  }

  revalidatePath("/"); // Re-render the complete page since a post has been added 
}
