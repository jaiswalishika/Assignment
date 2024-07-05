import axios from "axios"

export class DataService{
    private static URL:string = "https://jsonplaceholder.typicode.com/"

    public static getALLData(){
        let DataURL:string = `${this.URL}/posts`
        return axios.get(DataURL)
    }
}