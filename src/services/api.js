"use client";

import axios from "axios";
import { getAcessToken } from "./auth.service";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${getAcessToken()}`,
  },
});

api.interceptors.response.use((config) => {
  const token = getAcessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
