import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAcidsAction, useSearchTerm } from "../slices/acidsSlice";
import { getAcids } from "../modules/api";

export function UseAcidsData() {
    const dispatch = useDispatch();
    const searchTerm = useSearchTerm();
    const [loading, setLoading] = useState(false);

    async function fetchData() {
        setLoading(true);
        try {
            const data = await getAcids(searchTerm);
            dispatch(setAcidsAction(data));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [searchTerm]);

    return { loading };
}