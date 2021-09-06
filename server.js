const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.set("view engine" , "ejs");

const uri = process.env.MONGODB_URI;

// setting up the database connection
mongoose.connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const PORT = process.env.PORT || 8000;

// requiring the model document
const modelDoc = require('./models/modelDoc')

const code = `Welcome to CodeDocShare 👋 !! 

The one stop solution to your code / text sharing problems ⭐
Write or Paste snippets of code / text ,save it, edit it and 
get a url to share it to world within a fraction of second  🤩 `;

app.get("/" ,(req,res) => {
    res.render('displayCode' , { code  , language: 'plaintext'})
});

app.get('/new' , (req,res) => {
    res.render("newFile");
});

app.post('/save' , async (req,res) => {
    const value = req.body.text;
    try{
        const document = await modelDoc.create({value})
        res.redirect(`/${document.id}`);
    }catch(err){
        res.render("newFile" , { value });
    }
  
});

// the duplicate route
app.get('/:id/duplicate' , async (req,res) => {
    const id = req.params.id;
    try{
        const document = await modelDoc.findById(id)
        res.render('newFile' , { value : document.value , id});
    }catch(err){
        res.redirect('/${id}');
    }
});

app.get('/:id' , async (req,res) => {
    const id = req.params.id;
    try{
        const document = await modelDoc.findById(id)
        res.render('displayCode' , { code : document.value, id});
    }catch(err){
        res.redirect(`/`);
    }
});


app.listen(PORT , () => {
    console.log("Server running on " + PORT);
});
