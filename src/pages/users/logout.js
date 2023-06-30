import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { endSession } from "../../scripts/user/scripts";
import { checkErrors } from "../../scripts/common/scripts";

export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const errors = await endSession ();
            if (!checkErrors(errors)) navigate("/");
        })();
    }, []);
};