import React from 'react';
import { Switch } from "@material-tailwind/react";
 

export default function DarkThemeToggleSwitch() {
    return (
        <p className='flex flex-row gap-3'>
            <span > Dark Mode Enabled:</span>
            <Switch color="blue" defaultChecked crossOrigin={undefined} />
        </p>
    );
}