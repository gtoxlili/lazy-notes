import axios, {AxiosInstance} from 'axios'

export class Client {
    private readonly axiosClient: AxiosInstance

    constructor(url: string, secret?: string) {
        this.axiosClient = axios.create({
            baseURL: url,
            headers: secret ? {Authorization: `Bearer ${secret}`} : {},
        })
    }
}
