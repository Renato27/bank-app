import { jwtDecode } from "jwt-decode";
import { DataType } from "../pages/types/balance-type";

type JWT = {
  iss: string;
  iat: number;
  exp: number;
  nbf: number;
  jti: string;
  sub: string;
  prv: string;
  user_id: string;
  name: string;
  user_type: string;
};

export const mockData = (qtd: number, type?: string) => {
  const data: DataType[] = [];
  for (let i = 0; i < qtd; i++) {
    data.push({
      id: i,
      value: i * 1000,
      date: new Date().toDateString(),
      description: `Description ${i}`,
      type: type ?? i % 2 === 0 ? "credit" : "debit",
    });
  }
  return data;
};

export const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded: JWT = jwtDecode(token);
    const data: {
      userId: string;
      name: string;
      userType: string;
    } = {
      userId: decoded.user_id,
      name: decoded.name,
      userType: decoded.user_type,
    };

    return data;
  }
};

export const createUrlWithUserId = (baseUrl: string) => {
  const decoded = decodeToken();
  if (!decoded || !decoded.userId) {
    throw new Error("User not found");
  }
  return `${baseUrl}/${decoded.userId}`;
};

export const convertToBase64 = (file: File) => {
  const reader = new FileReader();
  let result: string | ArrayBuffer | null = "";
  reader.readAsDataURL(file);
  reader.onload = () => {
    result = reader.result;
  };
  reader.onerror = (error) => {
    console.error("Error converting file to base64:", error);
  };

  return result;
};

export const isTokenExpired = () => {
  const expiresAt = localStorage.getItem("expiresAt");
  const now = Date.now();

  if(!expiresAt) return true;


  return now > parseInt(expiresAt);

};
