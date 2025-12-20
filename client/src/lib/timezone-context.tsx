import React, { createContext, useContext, useState, ReactNode } from 'react';

type Timezone = 'NY' | 'Kiev' | 'Warsaw';

interface TimezoneContextType {
    timezone: Timezone;
    setTimezone: (tz: Timezone) => void;
    formatTime: (timeStr: string) => string;
}

const TimezoneContext = createContext<TimezoneContextType | undefined>(undefined);

export function TimezoneProvider({ children }: { children: ReactNode }) {
    const [timezone, setTimezone] = useState<Timezone>('NY');

    const formatTime = (timeStr: string): string => {
        // Assuming input timeStr is always in "HH:MM" format and representing NY time.
        // Handling simple ranges like "09:30-10:00" as well.

        const parts = timeStr.split('-');
        if (parts.length > 1) {
            return parts.map(p => convertSingleTime(p, timezone)).join('-');
        }
        return convertSingleTime(timeStr, timezone);
    };

    const convertSingleTime = (t: string, tz: Timezone): string => {
        try {
            const [h, m] = t.split(':').map(Number);
            if (isNaN(h) || isNaN(m)) return t;

            let date = new Date();
            date.setHours(h, m, 0, 0);

            // Offsets relative to NY
            // NY is base.
            // Warsaw is +6 hours from NY.
            // Kiev is +7 hours from NY.

            let offset = 0;
            if (tz === 'Warsaw') offset = 6;
            if (tz === 'Kiev') offset = 7;

            date.setHours(date.getHours() + offset);

            const newH = date.getHours().toString().padStart(2, '0');
            const newM = date.getMinutes().toString().padStart(2, '0');
            return `${newH}:${newM}`;
        } catch (e) {
            return t;
        }
    };

    return (
        <TimezoneContext.Provider value={{ timezone, setTimezone, formatTime }}>
            {children}
        </TimezoneContext.Provider>
    );
}

export function useTimezone() {
    const context = useContext(TimezoneContext);
    if (context === undefined) {
        throw new Error('useTimezone must be used within a TimezoneProvider');
    }
    return context;
}
