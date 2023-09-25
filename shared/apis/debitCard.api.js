import axios from "axios";

const baseUrl = "https://651141b6829fa0248e3fc411.mockapi.io/api/v1/"
export default axios.create({
    baseURL: baseUrl+"card/",
    // headers:{
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //                 'Accept': 'application/json'
    // }
});