import User from "@/src/models/userModel";
import { connect } from "@/src/DbConfig/DbConfig";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/src/helpers/mailer";

connect()

export async function POST(request: NextRequest){
    try {
        const {email} = await request.json()
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: 'User does not exist'}, {status: 404})
        }
        await sendEmail({email, emailType: 'RESET', userId: user._id})
        return NextResponse.json({
            message: 'Reset Password link has been sent to your registered email',
            success: true,
            
        }, {status: 200})
        
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
    
}