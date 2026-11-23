'use client'

import axios from "axios"
import { log } from "console"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { link } from "fs"

export default function ProfilePage(){
    const router = useRouter()
    const [data, setData] = useState('')
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout Successfully')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
        
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-3 rounded bg-green-500">{data === '' ?'Nothing': <Link rel="stylesheet" href={`/profile/${data}`}>{data}</Link> }</h2>
            <hr />
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-2 rounded mt-4">Logout</button>
            <hr />
            <button onClick={getUserDetails} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-2 rounded mt-4">Get User Details</button>
        </div>
    )
}