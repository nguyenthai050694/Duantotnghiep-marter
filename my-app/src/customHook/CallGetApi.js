import axios from "axios";
import moment from 'moment'
// import AxiosInterceptor from './AxiosInterceptor'
import { useEffect, useState } from "react";

const useCallGetAPI = (url) => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    // const ourRequest = axios.CancelToken.source()

    useEffect(() => {
        let canceled = false;
        async function getData() {
            try {
                let res = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
                let data = (res && res.data) ? res.data : []
                if (data && data.length > 0) {
                    data.map(item => {
                        item.created = moment(item.created).format('DD/MM/YYYY HH:mm:ss');
                        if (item.modified > 0) {
                            item.modified = moment(item.modified).format('DD/MM/YYYY HH:mm:ss');
                        }
                        if (item.effectFrom > 0) {
                            item.effectFrom = moment(item.effectFrom).format('DD/MM/YYYY HH:mm:ss');
                        }
                        if (item.effectUntil > 0) {
                            item.effectUntil = moment(item.effectUntil).format('DD/MM/YYYY HH:mm:ss');
                        }
                        return item;
                    })
                    data = data.reverse()
                }
                canceled = true;
                setIsLoading(false);
                setIsError(false);
                if (canceled) {
                    setData(data);
                }
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log(e.message);
                } else {
                    setIsLoading(false)
                    setIsError(true)
                }
            }
        }
        setTimeout(() => {
            getData();
        }, 1000)
        return () => {
            // ourRequest.cancel('cancel')
        }
    }, [url]);

    return {
        data, isError, isLoading
    }
}

export default useCallGetAPI;