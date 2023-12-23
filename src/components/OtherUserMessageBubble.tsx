import React from "react";

export default function OtherUserMessageBubble() {

    return (
        <div className="w-52 mobile:w-80 tablet:w-1/2 relative mx-auto tablet:ml-8 bg-gray-balloons-light rounded-lg shadow-lg p-2 mb-10">
            <p className="font-semibold text-blue-balloons-light mb-1">Other User</p>
            <p className="text-fore-tertiary-light mb-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, officiis dolorem voluptatibus voluptate mollitia soluta sequi excepturi assumenda.</p>
            <span className="text-xs uppercase text-fore-tertiary-light">10:20 pm</span>
        </div>
    );
}