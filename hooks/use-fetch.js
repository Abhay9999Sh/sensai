import { toast } from "sonner";

const { useState } = require("react")

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fn = async(...args) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await cb(...args);
            setData(response);
            setError(null);
            return response; // Return the response so it can be used by the caller
        } catch (error) {
            setError(error);
            toast.error(error.message);
            throw error; // Re-throw so the caller can handle it
        } finally {
            setLoading(false);
        }
    }

    return {data, loading, error, fn, setData};

}

export default useFetch;