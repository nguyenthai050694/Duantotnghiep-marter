// const axios = require('axios');
// const baseURL = 'http://localhost:3000/';

// const axiosInterceptor = axios.create({
//     baseURL: baseURL,
//     timeout: 3000,
//     headers: {
//         'Authorization': localStorage.getItem('access_token') ? "Bearer" + localStorage.getItem('token') : null,
//         'Content-Type': 'application/json',
//         'accept': 'application/json'
//     }
// });

// axiosInterceptor.interceptors.response.use(
//     response => response,
//     error => {
//         const originalRequest = error.config;

//         // Prevent infinite loops
//         if (error.response.status === 401 && originalRequest.url === baseURL + 'token/refresh/') {
//             window.location.href = '/login/';
//             return Promise.reject(error);
//         }

//         if (error.response.data.code === "token_not_valid" &&
//             error.response.status === 401 &&
//             error.response.statusText === "Unauthorized") {
//             const refreshToken = localStorage.getItem('refresh_token');

//             if (refreshToken) {
//                 const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

//                 // exp date in token is expressed in seconds, while now() returns milliseconds:
//                 const now = Math.ceil(Date.now() / 1000);
//                 console.log(tokenParts.exp);

//                 if (tokenParts.exp > now) {
//                     return axiosInterceptor
//                         .post('/token/refresh/', { refresh: refreshToken })
//                         .then((response) => {

//                             localStorage.setItem('token', response.data.access);
//                             localStorage.setItem('refresh_token', response.data.refresh);

//                             axiosInterceptor.defaults.headers['Authorization'] = "Bearer " + response.data.access;
//                             originalRequest.headers['Authorization'] = "Bearer " + response.data.access;

//                             return axiosInterceptor(originalRequest);
//                         })
//                         .catch(err => {
//                             console.log(err)
//                         });
//                 } else {
//                     console.log("Refresh token is expired", tokenParts.exp, now);
//                     window.location.href = '/login/';
//                 }
//             } else {
//                 console.log("Refresh token not available.")
//                 window.location.href = '/login/';
//             }
//         }


//         // specific error handling done elsewhere
//         return Promise.reject(error);
//     }
// );
