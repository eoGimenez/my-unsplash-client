import { useState } from "react";

export function useSwitch() {
    const [isTrue, setIsTrue ] = useState<boolean>(false)

    const switchBool = () => {
        setIsTrue(!isTrue)
    }

    return {
        isTrue,
        switchBool
    }
}