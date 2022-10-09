import { useState } from "react";

export default function useOnError(initialState = '') {
    const [error, setError] = useState(initialState);

    const onError = (error) => {
        setError(error.toString());
        setTimeout(() => {
            setError('');
        }, 3000);
    }

    return [error, onError];
};

