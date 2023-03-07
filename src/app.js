const path = require('path')
const express = require('express')

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')

app.set('view engine','hbs')
app.use(express.static(publicDirectoryPath))

// app.get('',(req,res)=>{
//     res.send("<h1>Express Page</h1>")
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'vaibhavi'
//     },{
//         age:24
//     }])
// })

// app.get('/about', (req,res)=>{
//     res.send("<h1>about Page</h1>")
// })

app.get('',(req,res)=>{
    res.render('index')
})

app.get('/weather', (req,res)=>{
    res.send({
        forecast:'rainy',
        location:'pune'
    })
})

//app.com
//app.com/help
//app.com//about

app.listen(3000, ()=>{
    console.log("server is up on port 3000");
})