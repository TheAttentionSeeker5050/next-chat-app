import React from 'react';
import { Switch } from "@material-tailwind/react";
import { useAppContext } from '@/context/MyContext';
import { saveToLocalStorage } from '@/context/localStorageHandlers';
 

export default function DarkThemeToggleSwitch() {
    const { nightMode, setNightMode } = useAppContext();

    const handleToggleNightMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNightMode(e.target.checked);
        // save to localstorage using method from utils
        saveToLocalStorage('nightMode', e.target.checked == true ? 'true' : 'false');
    }
    return (
        <div className='flex flex-row gap-3'>
            <span > Dark Mode Enabled:</span>
            <Switch color="blue" defaultChecked crossOrigin={undefined} onChange={handleToggleNightMode}/>
        </div>
    );
}