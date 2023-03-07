const request = require("request");

//shorthand and destructuring
const geocode= (address,callback)=>{

    const url=  "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1";
    //this url is not working that's why output is not shown gives error


    request({url, json: true} ,(error,{body})=>{

        if(error){
            callback("Unable to connect weather service", undefined)
        }
        else if(body.features.length === 0){
            callback("Unable to find location, try another search", undefined)
        }
        else{
            callback(undefined,{
            latitude:body.features[0].center[0],
            longitude:body.features[0].center[1]
        })
        }
    })
}


module.exports =geocode