import { formatDate } from "@/utils/formatters/formatDate";
import React, { useEffect } from "react";

// the props are the message, the author, and the date
interface Props {
    message: string;
    author: string;
    authorId: string;
    date: Date;
}

export default function CurrentUserMessageBubble({ message, author, authorId, date }: Props) {

    
    
    return (
        <div className="w-52 mobile:w-80 tablet:w-96 max-w-max relative mx-auto tablet:mr-8 bg-blue-balloons-light rounded-lg shadow-lg p-2 mb-10">
            <p className="font-semibold text-white mb-1">{author}:</p>
            <p className="text-white mb-2 ">{message}</p>
            <span className="text-xs uppercase text-fore-secondary-light">{formatDate(date)}</span>
        </div>
    );
}