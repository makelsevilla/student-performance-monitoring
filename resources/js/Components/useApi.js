import { useState, useEffect } from "react";
import axios from "axios";

const useApi = ({ url, method, body = null, headers = null }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = async () => {
        const source = axios.CancelToken.source();
        setLoading(true);

        try {
            const response = await axios({
                method: method,
                url: url,
                data: body,
                headers: headers,
                cancelToken: source.token,
            });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            if (axios.isCancel(error)) {
                // don't update state in case component is dismounting
            } else {
                setLoading(false);
                setError(error);
            }
        }

        return () => {
            source.cancel();
        };
    };

    useEffect(() => {
        request();
    }, [url, method, body, headers]);

    return { data, error, loading };
};

export default useApi;
