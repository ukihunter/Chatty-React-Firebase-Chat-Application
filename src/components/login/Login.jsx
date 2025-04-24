import React, { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../lib/firebase"; // Adjust the path to your Firebase configuration file
import { db } from "../../lib/firebase"; // Adjust the path to your Firebase configuration file
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

const Login = () => {
  const [avatar, setAvater] = useState({
    file: null,
    url: "",
  });

  const [loding, setloading] = useState(false);

  const handelAvatar = (e) => {
    if (e.target.files[0]) {
      setAvater({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handelLogin = async (e) => {
    e.preventDefault();
    setloading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      setloading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setloading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      let avatarUrl = "https://avatar.iran.liara.run/public"; // Default avatar URL

      if (avatar.file) {
        const uploadData = new FormData();
        uploadData.append("file", avatar.file);
        uploadData.append("upload_preset", "chatty"); // Replace "chatty" with your actual Cloudinary upload preset
        uploadData.append("cloud_name", "dxsxtmlqd"); // Replace "your_cloud_name" with your actual Cloudinary cloud name

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/dxsxtmlqd/image/upload`,
            {
              method: "POST",
              body: uploadData,
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Cloudinary Error Response:", errorData);
            throw new Error("Failed to upload image to Cloudinary");
          }

          const data = await response.json();
          console.log("Uploaded Image Data:", data);

          avatarUrl = data.secure_url;
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image. Please try again.");
        }
      }

      // Register user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Register successfully");
      console.log("User registered:", userCredential.user);

      // Save user data to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        email,
        id: userCredential.user.uid,
        avatar: avatarUrl, // Save the Cloudinary URL or default URL
        blocked: [],
      });

      await setDoc(doc(db, "userchats", userCredential.user.uid), {
        chats: [],
      });

      toast.success("User data saved successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error in register");
    } finally {
      setloading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setloading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfully");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setloading(false);
    }
  };

  /* const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Register successfully");
      console.log("User registered:", userCredential.user);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        email,
        id: userCredential.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", userCredential.user.uid), {
        chats: [],
      });
      toast.success("User data saved successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error in register");
    }
  };*/
  return (
    <div className="login">
      <div className="items">
        <h2>Welcom back !!</h2>
        <form onSubmit={handelLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loding}>{loding ? "Loading" : "Sign in"}</button>
        </form>
      </div>
      <div className="separator">
        <h1>chatty</h1>
      </div>
      <div className="dac">
        The
        <br /> way we
        <br /> Talk
      </div>
      <div className="items">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || " ./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handelAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Passowrd" name="password" />
          <button disabled={loding}>{loding ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
