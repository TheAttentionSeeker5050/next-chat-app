import { formatDate } from "@/utils/formatters/formatDate";
import React from "react";

// the props are the message, the author, and the date
interface Props {
    message: string;
    author: string;
    authorId: string;
    date: Date;
}

export default function OtherUserMessageBubble({ message, author, authorId, date }: Props) {

    return (
        <div className="w-52 mobile:w-80 tablet:w-96 max-w-max relative mx-auto tablet:ml-8 bg-gray-balloons-light rounded-lg shadow-lg py-2 px-3 mb-10">
            <p className="font-semibold text-blue-balloons-light mb-1">{author}:</p>
            <p className="text-fore-tertiary-light mb-2">{message}</p>
            <span className="text-xs uppercase text-fore-tertiary-light">{formatDate(date)}</span>
        </div>
    );
}