//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret:"Our little secret",
    resave:false,
    saveUninitialized:false,
}));

//initialize the passport
app.use(passport.initialize());
//passport used for save session
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});

const userSchema = new mongoose.Schema({
    email:String,
    password:String
});

//for use the passport local package and connect it with the user schema
userSchema.plugin(passportLocalMongoose);


const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

//for store the cookie
passport.serializeUser(User.serializeUser());
//for release the cookie
passport.deserializeUser(User.deserializeUser());


app.get("/",function(req,res){
    res.render("home");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/register",function(req,res){
    res.render("register");
});

app.get("/secrets",function(req,res){
    //check whether the user is authenticated or not 
    if(req.isAuthenticated()){
        res.render("secrets");
    }else{
        res.render("login");
    }
});


app.get("/logout",function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    });
});

app.post("/register",function(req,res){
    //User schema will try to register with username password and callback function
    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("/register");
        }else{ 
            //passport npm package authenticate method
            //local is strategy 
            //sending req, res and callback function 
            //if user register them selves to this block we will save the information in session 
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            });
        }
    });
});

app.post("/login",function(req,res){
    const user = new User({
        username:req.body.username,
        password:req.body.password
    });

    //if the user is already exist or not 
    //check by passport login method
    req.login(user,function(err){
        if(err){
            console.log(err);
        }else{
            // local is strategy 
            passport.authenticate("local")(req,res,function(){
                res.redirect("secrets");
            });
        }
    });
});


app.listen(3000,function(){
    console.log("listening on port 3000");
})