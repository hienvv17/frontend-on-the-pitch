import { auth, googleProvider } from "@/firebaseConfig/firebaseConfig";

import { signInWithPopup } from "firebase/auth";

import Cookies from "js-cookie";

function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      if (!token) {
        console.log("No token: Google login failed");
        return null;
      }
      const expriresIn = new Date(new Date().getTime() + 5 * 60 * 1000);
      Cookies.set('accessToken', token, { expires: expriresIn }); // token expires in 1 minute

      return { user, token };
      // You can now send the user information to your backend to create or authenticate the user
    } catch (error) {
      console.log("Error during Google login", error);
      return null;
    }
  };

  return handleGoogleLogin();
}

export default GoogleLogin;

