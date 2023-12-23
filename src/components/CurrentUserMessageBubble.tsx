import React from "react";

export default function CurrentUserMessageBubble() {

    return (
        <div className="w-52 mobile:w-80 tablet:w-1/2 relative mx-auto tablet:mr-8 bg-blue-balloons-light rounded-lg shadow-lg p-2 mb-10">
            <p className="font-semibold text-white mb-1">Current User</p>
            <p className="text-white mb-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, officiis dolorem voluptatibus voluptate mollitia soluta sequi excepturi assumenda.</p>
            <span className="text-xs uppercase text-fore-secondary-light">10:20 pm</span>
        </div>
    );
}