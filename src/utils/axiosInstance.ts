// 파일: utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://actionpoint.store', 
  withCredentials: true, // 쿠키 인증 등 필요한 경우
});

export default axiosInstance;
