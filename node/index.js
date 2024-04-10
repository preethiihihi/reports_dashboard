const express=require('express');
const bodyParser=require('body-parser')
const mongoose= require('mongoose');
const cors=require('cors');

const moment = require('moment');


app=express()

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

const uri ='mongodb+srv://cp932004:JYPY2eR5lv8KG3UA@cluster0.ubnldgz.mongodb.net/mern?retryWrites=true&w=majority'
;

const connectparams={
     useNewUrlParser:true,
     useUnifiedTopology:true,
}

app.use(cors());

mongoose.connect(uri,connectparams).then(()=>{
     console.log("connected sussecful");
}).catch((err)=>{
     console.log("error",err);
})

const data= mongoose.model('data',{
    name: String,
    age: Number,
})

const Elex= mongoose.model('elex',{
     lisense_plate : String,
     make: String,
     vin: String,
     model: String,
     type:String,
     date: String,
     miles_driven: Number
 })


app.get('/data', async (req, res) => {
     try {
       const datam = await data.find();
       //console.log(datam);
       res.json(datam);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });

app.post('/add',(req,res)=>{
const name=req.body.name;
const age=req.body.age;
console.log(name,age);
data.create({
     name: name,
     age:age
})
})


app.get('/data/get', (req,res)=>{
     data.find()
     .then((data)=>res.json(data))
     .catch((err)=>console.log(err));
})

app.get('/data/mile', (req,res)=>{
     Elex.find()
     .then((data)=>res.json(data))
     .catch((err)=>console.log(err));
    
})

app.post('/data/get',(req,res)=>{
     const fromDate = req.body.fromdate
     const toDate = req.body.todate; 
     Elex.find({
         $and: [
             { Date: { $gte: fromDate } }, // Greater than or equal to fromDate
             { Date: { $lt: toDate } } // Less than toDate
         ]
     })
     .then(result => {
         res.json(result);
     })
     .catch(error => {
       console.log(error);
     });
     
})

app.get('/data/month', (req,res)=>{
     Elex.aggregate([{
          $addFields: {
               year: { $toInt: { $substr: ["$Date", 0, 4] } },
               month: { $toInt: { $substr: ["$Date", 5, 2] } }, 
           }
       },
       {
           $group: {
               _id: {
                   year: "$year",
                   month: "$month"
               },
               totalMiles: { $sum: "$MilesDriven" } 
           }
       },
       {
           $project: {
               _id: 0, 
               year: "$_id.year",
               month: "$_id.month",
               totalMiles: 1 
           }
       },
       {
           $sort: { year: 1, month: 1 } 
       }
      ])
      .then((result) => { res.json(result)})
      .catch((err) => console.log(err));
})

app.get('/data/year', (req,res)=>{
     Elex.aggregate([{
          $addFields: {
               year: { $toInt: { $substr: ["$Date", 0, 4] } },
           }
       },
       {
           $group: {
               _id: {
                   year: "$year",
               },
               totalMiles: { $sum: "$MilesDriven" } 
           }
       },
       {
           $project: {
               _id: 0, 
               year: "$_id.year",
               totalMiles: 1 
           }
       },
       {
           $sort: { year: 1 } 
       }
      ])
      .then((result) => { res.json(result)})
      .catch((err) => console.log(err));
})



app.listen(6789, (err)=>{
     if(err){console.log("error",err)}
     else{console.log("listening on port 6789")}
})