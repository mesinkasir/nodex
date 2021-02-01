//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const welcomeStartingContent = "Welcome to Node-X . this is a new modern blog platform develope using node js and express js, very simple for develope blog and website project using node-x , let's get start now with node-x";
const homeContent = "Node-X Blogs content management";
const aboutContent = "Node-X is a simple bloging platform develope creative by dre who work @ axcora technology and very love learn about codding and photography too.. we hope node-x can help you to develope new modern website blog.";
const infoContent = "For first of course you need to download node and express js , just download on https://nodejs.org/en/download/ for node and then install it on your device, open your shell terminal or npm then run command 'npm install express --save' for installing express js , then you can download this source code, after download extract all files on our project folder then run command 'npm install' , and now you already using this web apps, just run command 'node app.js' and open localhost:3000 on web browser. You can edit any code with you needed, for create new blog just visit on localhost:3000/nodex then create your new blog post.";
const contactContent = "If you need for develope website project so lets talk with us. you can whastapp me on : +6285646104747 , sent email : axcora@gmail.com or you can call us : +6287819355589 ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("welcome", {
    startingContent: welcomeStartingContent});
});
app.get("/home", function(req, res){
  res.render("home", {homeContent: homeContent,
      posts: posts
  });
});
app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});
app.get("/info", function(req, res){
  res.render("info", {infoContent: infoContent});
});
app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/nodex", function(req, res){
  res.render("nodex");
});

app.post("/nodex", function(req, res){
  const post = {
    title: req.body.postTitle,
	img: req.body.postImg,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/home");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        img: post.img,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
