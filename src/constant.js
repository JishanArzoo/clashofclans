export const cocBaseURI = "https://api.clashofclans.com/v1" ;
export const AuthHeaderCOC = {
    headers: {
        "Authorization" : `bearer ${process.env.COC_ACCESS_TOKEN}`
    }
};
export const options  = {
    httpOnly: true,
    secure: true
};
