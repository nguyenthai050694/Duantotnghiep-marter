import axios from "axios";
import moment from 'moment'
// import AxiosInterceptor from './AxiosInterceptor'
import { useEffect, useState } from "react";

const useCallPostAPI = (url, datas) => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    // const ourRequest = axios.CancelToken.source()

    const postApi = () => {
        let canceled = false;
        async function postData() {
            try {
                let res = await axios.post(url, datas, { headers: { "Authorization": `Bearer ${token}` } })
                let data = (res && res.data) ? res.data : []
                // if (data && data.length > 0) {
                //     data.map(item => {
                //         item.created = moment(item.created).format('DD/MM/YYYY HH:mm:ss');
                //         if (item.modified > 0) {
                //             item.modified = moment(item.modified).format('DD/MM/YYYY HH:mm:ss');
                //         }
                //         if (item.effectFrom > 0) {
                //             item.effectFrom = moment(item.effectFrom).format('DD/MM/YYYY HH:mm:ss');
                //         }
                //         if (item.effectUntil > 0) {
                //             item.effectUntil = moment(item.effectUntil).format('DD/MM/YYYY HH:mm:ss');
                //         }
                //         return item;
                //     })
                //     data = data.reverse()
                // }
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
            postData();
        }, 1000)
        return () => {
            // ourRequest.cancel('cancel')
        }
    };

    return {
        data, isError, isLoading
    }
}

export default useCallPostAPI;