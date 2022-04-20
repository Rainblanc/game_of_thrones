import CryptoJS from 'crypto-js';
import addDays from 'date-fns/addDays';
import isBefore from 'date-fns/isBefore';

export const login = (payload: { email: string; password: string }) => {
  if (payload.email === process.env.REACT_APP_AUTH_EMAIL && payload.password === process.env.REACT_APP_AUTH_PASSWORD) {
    const now = new Date();
    const cipher = CryptoJS.AES.encrypt(
      JSON.stringify({
        iat: now.getTime(),
        exp: addDays(now, Number(process.env.REACT_APP_AUTH_EXPIRATION_DAYS)).getTime(),
      }),
      process.env.REACT_APP_AUTH_SECRET!,
    ).toString();
    return { cipher };
  }
  throw new Error('unauthorized');
};

export const verifyAuth = (cipher: string) => {
  const bytes = CryptoJS.AES.decrypt(cipher, process.env.REACT_APP_AUTH_SECRET!);
  const data: {
    iat: number;
    exp: number;
  } = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  if (isBefore(new Date(), new Date(data.exp))) {
    return data;
  }
  throw new Error('Cipher has been expired');
};
