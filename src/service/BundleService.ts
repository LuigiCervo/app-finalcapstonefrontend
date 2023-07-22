import Bundle from "../models/Bundle";
import { API_GATEWAY_HOST } from "./ServiceCostants";

function getBundleList(): Promise<Bundle[]> {
    return fetch(`${API_GATEWAY_HOST}/api/bundle/list`)
        .then(response => {
            switch (response.status) {
                case 200:
                    return response.json().then(json => <Bundle[]>json);
                default:
                    console.log(response.statusText);
                    return [];
            }
        })
}

export { getBundleList };