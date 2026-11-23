// src/app/profile/[id]/page.tsx
'use client'
import { Suspense } from "react"
import { useParams } from "next/navigation"

function ProfileContent() {
    const { id } = useParams<{ id: string }>()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page
                <span className="p-2 ml-3 rounded bg-orange-200 text-black">{id}</span>
            </p>
        </div>
    )
}

export default function UserProfile() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileContent />
        </Suspense>
    )
}