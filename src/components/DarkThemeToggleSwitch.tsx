import React from 'react';
import { Switch } from "@material-tailwind/react";
import { useAppContext } from '@/context/MyContext';
 

export default function DarkThemeToggleSwitch() {
    const { nightMode, setNightMode } = useAppContext();

    const handleToggleNightMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNightMode(e.target.checked);
    }
    return (
        <div className='flex flex-row gap-3'>
            <span > Dark Mode Enabled:</span>
            <Switch color="blue" defaultChecked crossOrigin={undefined} onChange={handleToggleNightMode}/>
        </div>
    );
}