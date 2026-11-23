'use client'

import axios from "axios";
import Link from "next/link";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/navigation";


function page() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [cnfpassword, setCnfPassword] = useState('')
    const [error, setError] = useState(false)
    const [token, setToken] = useState("");

    useEffect(() => {
            const urlToken = window.location.search.split("=")[1];
            // ?token=${hashedToken} [?token, hashedToken]
            setToken(urlToken || "");
        }, []);

    const passwordChecker = async () => {
        try {
            if(password === cnfpassword){
                setError(false)
                const response = await axios.post('/api/users/passwordreset/verify', {token, password})
                router.push('/login')
            }else{

                setError(true)
                
            }
            
        } catch (error:any) {
            console.log(error);
            console.log(error.reponse);
        }
    } 
    

  return (
    
    <div className="flex items-center justify-center h-screen flex-col bg-gray-900">
        <h1 className="text-white p-1.5 m-1.5 font-bold">Reset Password</h1>
        <input  className="p-1.5 m-1.5"type="password" name="password" id="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
        <input className= {`p-1.5 m-1.5 ${error? 'border-red-600 border-2' : ''}`} type="text" name="password" id="" placeholder="Confirm Password" onChange={(e) => setCnfPassword(e.target.value)} />
        <button className="p-1.5 m-1.5 ring-1 rounded-md px-5 cursor-pointer bg-gray-800 hover:bg-gray-950" onClick={passwordChecker} type="submit">Reset</button>
    </div>
  )
}

export default page