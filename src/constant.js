export const cocBaseURI = "https://api.clashofclans.com/v1" 
export const AuthHeaderCOC = {
    headers: {
        "Authorization" : `Bearer ${process.env.COC_ACCESS_TOKEN}`
    }
}
export const options  = {
    httpOnly: true,
    secure: true
}
export const clanTag = "#2820PP28L"


//password: m2dPYB1BDJdMTt0D
//username: semifarzeon5
//db_uri=mongodb+srv://semifarzeon5:m2dPYB1BDJdMTt0D@brave.zcn5b.mongodb.net/?retryWrites=true&w=majority&appName=Brave