class UnsplashApi{
    constructor(){
        this.baseURL = 'https://api.unsplash.com'
        this.clientID = 'Client-ID FvQq0thJHCHhjN80Sz4e5hnrLpMQJiwWj9W7jFOAI9c' 
        this.axiosNesne = axios.create({
            baseURL: this.baseURL,
            headers: {
                Authorization : this.clientID
            },
            params: {
                query: 'animal',
                count: 1 
            }
        }) 
    }

    async randomResimGetir() {
        try{
            const resimResponse = await this.axiosNesne.get('/photos/random')
            console.log(resimResponse.data[0].urls.regular)
            return resimResponse.data[0].urls.regular
        }
        catch(err){
            console.log(err.response)
            return 'https://www.online-tech-tips.com/wp-content/uploads/2021/06/http-403.jpeg'
        }
    } 
}