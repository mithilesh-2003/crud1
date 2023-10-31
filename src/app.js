const express =require('express');
const mongoose =require('mongoose');
const bodyParser =require('body-parser');
const multer =require('multer');
const app =express();

// connect database

mongoose.connect('mongodb://127.0.0.1:27017/model',{useNewUrlParser:true,useUnifiedTopology:true})

.then(()=>{
    console.log('connected successs');
})

// create model

const User =mongoose.model('User',{
    name:String,
    email:String,
    dob:String,
    number:String,
    gender:String,
    city:String
})

app.use(bodyParser.urlencoded({
    extended:true
}));

// getting form

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/login.html');
})

// insert data

app.post('/submit',(req,res)=>{
    const{name,email,dob,number,gender,city}=req.body
    // console.log(name)
    const user =new User({
        name,email,dob,number,gender,city
    });
    user.save().then(()=>{
        res.send('user data is saved');
    })
    .catch((err)=>{
        console.error('error giving',err);
        res.status(500).send('error saving user')
    })
});

// show data

app.get('/users',(req,res)=>{
    User.find({}).then(users=>{
        const table=`
        <table border="1">
        <tr>
        <th>Name</th>
        <th>Email</th>
        <th>dob</th>
        <th>phone</th>
        <th>gender</th>
        <th>city</th>
        </tr>
        ${users.map(user=>`
        <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.dob}</td>
        <td>${user.number}</td>
        <td>${user.gender}</td>
        <td>${user.city}</td>
        </tr>
        `).join('')}
        </table>
        `;
        res.send(table);
    })
    .catch(err =>{
        console.error('error fetching',err);
        res.status(500).send('errpr');
    });
});


const PORT =process.env.PORt ||3000
app.listen(PORT,()=>{
    console.log(`server is on running on ${PORT}`);
})




