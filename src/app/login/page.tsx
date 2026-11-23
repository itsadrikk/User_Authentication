"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Span } from "next/dist/trace";


export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ''
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)

    
    const handleForgot = async () => {
        try {
            if(!user.email){
            setError(true)
        }else{
            setError(false)
            const response = await axios.post('api/users/passwordreset', {email: user.email})
            alert(response.data.message)
            
            // return (
            //     <div>
            //         <h1 className="text-green-400" >Reset Password link has been sent to your registered Email</h1>
            //     </div>
            // )
        }
        } catch (error:any) {
            alert(error.response?.data?.error)
            
        }
    }




    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log('Signup Success', response.data)
            toast.success('Login Success')
            router.push('/profile')
            
        } catch (error:any) {
            const message = error.response?.data?.error || error.message
            console.log('Login Failed', message)
            toast.error(message)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
            if(user.email.length>0 && user.password.length>0 || user.username.length>0){
                setButtonDisabled(false)
            }else{
                setButtonDisabled(true)
            }
        }, [user])

    

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? 'Processing' : 'Login'}</h1>
            <hr />

            {/* <label htmlFor="email">email</label> */}
            <input className="p-1.5 m-1.5" type="text" id='email' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="Email" />

            {error && 
            <span className="text-red-400">
                Email is required for Reset Password
            </span> }

            {/* <label htmlFor="password">password</label> */}
            <input className="p-1.5 m-1.5" type="password" id='password' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="Password" />

            <button className="p-1.5 m-1.5 ring-1 rounded-md px-5 cursor-pointer bg-gray-800 hover:bg-gray-950" onClick={onLogin}>{buttonDisabled ? 'No Login' : 'Login'}</button>
            
            <Link  className="p-1.5 m-1.5 ring-1 rounded-md px-5 cursor-pointer bg-gray-800 hover:bg-gray-950" href={'/signup'}>Visit Signup Page</Link>
            <button className="p-1.5 m-1.5 ring-1 rounded-md px-5 cursor-pointer bg-gray-800 hover:bg-gray-950" onClick={handleForgot}>Forgot Password</button>
            
        </div>
    )
}