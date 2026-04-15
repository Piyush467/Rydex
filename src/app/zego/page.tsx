'use client'
import React, { useRef } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function ZegoPage() {
    const { userData } = useSelector((state: RootState) => state.user)
    const containerRef = useRef<HTMLDivElement>(null)
    const startCall = async () => {
        if (!containerRef) {
            return null
        }
        try {
            const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID)
            const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret!,
                "jhishfi",
                userData?._id.toString()!,
                "piyush"
            )

            // Create instance object from Kit Token.
            const zp = ZegoUIKitPrebuilt.create(kitToken)
            zp.joinRoom({
                container: containerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
                },

            })

        } catch (error) {
            console.log(error)

        }
    }
    return (
        <div ref={containerRef} className='h-screen'>
            <button onClick={startCall}>click</button>
        </div>
    )
}

export default ZegoPage