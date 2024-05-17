import connectDB from "@/mongodb/db";
import {  Post } from "@/mongodb/models/post";
import { User } from "@/types/user";
import { NextResponse } from "next/server";

export interface AddPostRequestBody {
  user: User;
  text: string;
  imageUrl?: string | null;
}
