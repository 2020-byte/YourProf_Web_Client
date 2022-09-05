import { useState } from "react";

export default function useToggle (initialState = false) {
    const [visible, setVisibility] = useState(initialState);

    const toggle = () => setVisibility((prev) => !prev);

    const setToggleStatus = (value) => setVisibility(Boolean(value));

    return [visible, toggle, setToggleStatus];
};

