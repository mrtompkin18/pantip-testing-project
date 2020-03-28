import axios from "axios";
export const fetchReview = async () => {
    return await axios.get("https://www.mocky.io/v2/5e1d227c3600002a00c73e82")
        .then(res => res).catch(error => error);
}

export const fetchTopic = async () => {
    return await axios.get("https://www.mocky.io/v2/5e1d24dd3600005a00c73e8c")
        .then(res => res).catch(error => error);
}