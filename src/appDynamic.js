const path=require('path')
const express=require('express')
const hbs = require('hbs')

const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const app=express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath= path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'welcome to home',
        uname:'vaibhavi patil'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        uname:'Vaibhavi Patil',
        title:'help'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        uname:'Vaibhavi Patil',
        errorMessage:'Help article not found'
    
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        uname:'Vaibhavi Patil'
    })
})

app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"you must provide an address"
        })
    }

    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        //geocode url is not working that why site is not work and in console it gives error
        if(error){
            return res.send({error})
        }

        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })



    // console.log(req.query);
    // res.send({
    //     forecast:'rainy',
    //     location:'pune',
    //     address:req.query.address
    // })
})


app.get('/product',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:"you must provide a search term"
        })
    }

    console.log(req.query.search);
    res.send({
        products:[]
    })
})


//if page is not found at the time use " * " to print our msg
app.get('*',(req,res)=>{        
    res.render('404',{
        title:'404',
        uname:'Vaibhavi Patil',
        errorMessage:'Page Not Found'
    })
})

app.listen(3000,()=>{
    console.log("server is up on port 3000");
})