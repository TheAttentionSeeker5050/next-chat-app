import React from "react";

export default function OtherUserMessageBubble() {

    return (
        <div className="w-52 mobile:w-80 tablet:w-1/2 relative mx-auto tablet:ml-8 bg-gray-300 rounded-lg shadow-md p-2 mb-10">
            <p className="font-semibold text-blue-500 mb-1">Other User</p>
            <p className="text-gray-800 mb-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, officiis dolorem voluptatibus voluptate mollitia soluta sequi excepturi assumenda.</p>
            <span className="text-xs uppercase text-gray-500">10:20 pm</span>
        </div>
    )
}