import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import video_mount from '../assets/a_mount.mp4'
import { useNavigate } from "react-router-dom"
import google from '../assets/google.png'
import axios from 'axios';
import { BACKEND_URL } from "../../config"

export const Signup=()=>
{
    const navigate = useNavigate(); 

    const [postInputs,setpostInputs] = useState({
        firstName:"",
        lastName:"",
        userName:"",
        password:""
    });

    const handleGoogleLogin = () => {
        // Replace this URL with your backend's Google auth endpoint
        window.location.href = 'https://backend.fantasy2reality.workers.dev/google/login';
    };

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/signup`, postInputs);
            const jwt = response.data.jwt;
            console.log("Response from backend:", response.data);
    
            if (jwt && typeof jwt === 'string') {
                localStorage.setItem("token", jwt);
                navigate("/dashboard");
            } else {
                alert("Token is missing or invalid.");
            }
        } catch (error) {
            console.error("Error details:", error.response?.data || error.message);
            alert("Error while signing up. Please check your inputs or try again later.");
        }
    }
    
    return <div className="relative h-screen w-screen">
        <video
            src={video_mount} 
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover">
        </video>
        <div className="absolute top-0 left-0 w-1/3 h-full hidden lg:flex items-center justify-center flex-col">
            <div className="text-3xl font-extrabold text-[#12233D]">
                Welcome to
            </div>
            <div className="text-5xl font-extrabold text-white">
                Fantasy<span className="text-yellow-300">2</span>Reality
            </div>
        </div>
        <div className="absolute top-0 right-0 sm:w-1/3 w-full h-full flex items-center justify-center p-6">
            <div className="rounded-lg bg-white w-100 p-2 h-max px-7">
                <Heading label={"Sign Up to Explore More"}></Heading>
                <SubHeading label={"Enter to create your account"}></SubHeading>
                <InputBox onChange={e=>{
                    setpostInputs({
                        ...postInputs,
                        firstName:e.target.value
                    })
                }} label={"First Name"} placeholder="Chetan"></InputBox>
                <InputBox onChange={e=>{
                    setpostInputs({
                        ...postInputs,
                        lastName:e.target.value
                    })
                }} label={"Last Name"} placeholder="kukreja"></InputBox>
                <InputBox onChange={e=>{
                    setpostInputs({
                        ...postInputs,
                        userName:e.target.value
                    })
                }} label={"E-mail"} placeholder="schetan88@gmail.com"></InputBox>
                <InputBox onChange={e=>{
                    setpostInputs({
                        ...postInputs,
                        password:e.target.value
                    })
                }} label={"Password"} placeholder="1234as9#@!"></InputBox>
                <div className="pt-4">
                    <Button onClick={sendRequest} label={"SignUp"}></Button>
                </div>
                <div className="pt-3 flex items-center justify-center">
                    <button
                        className="flex items-center justify-center w-full border rounded-md py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                        onClick={handleGoogleLogin}
                    >
                    <img
                        src={google}
                        alt="Google Logo"
                        className="w-5 h-5 mr-2"
                    />
                    Sign Up with Google
                    </button>
                </div>
                <BottomWarning label={"Already have an account?"} buttontext={"Sign In"} to={"/signin"}></BottomWarning>
            </div>
        </div>
    </div>
}