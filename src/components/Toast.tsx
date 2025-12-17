import { useEffect, useState } from "react";

type ToastProps = {
    message: string;
    duration?: number;
}

export default function Toast({ message, duration = 3000 }: ToastProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className="toast">
            {message}
        </div>
    );
}
