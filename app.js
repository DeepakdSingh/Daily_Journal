
import express from "express";
import _ from "lodash";
import mongoose from "mongoose";

const homeStartingContent = "To start a journal, you just need to be willing to write. You don’t have to write well, you just need to want to do it. You don’t even need to decide what to write, you just need to let your words flow. Once you’ve decided you want to create a journal, here is a long list of instructions to guide you: Set up a schedule of when you play to write in your journal. You want to turn your writing into a habit, so create a schedule. Pick a time and the days of the week you will want to write and create a timely calendar reminder, so you don't forget. \t1.\tFind the right space to write.  \t2.\tClose your eyes and reflect on your day. \t3.\tAsk yourself questions.\t4.\tDive in and start writing.\t5.\tTime yourself.\t6.\tRe-read your entry and add additional thoughts.";


const aboutContent = "We keep a lot of things in our heads, but we put less down on paper. All those thoughts and ideas bouncing around can sometimes feel overwhelming. You have to-do lists, hopes, dreams, secrets, failures, love, loss, ups and downs. Ideas come and go, feelings pass. How do you remember all of them? How do you keep them organized? A great way to keep your thoughts organized and clear your mind is to write them down in a journal. Writing is a great exercise for anyone and by expressing yourself in a personal place is a wonderful way to stay sane.";

const aboutContent2="Journaling is simply the act of informal writing as a regular practice. Journals take many forms and serve different purposes, some creative some personal. Writers keep journals as a place to record thoughts, practice their craft, and catalogue ideas as they occur to them. Journals are often a place for unstructured free writing, but sometimes people use writing prompts (also known as journaling prompts).";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
mongoose.connect("mongodb+srv://Deepak:deepaks9867@cluster0.dxyck.mongodb.net/posts?retryWrites=true&w=majority");

app.set( 'view engine' , 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 100,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});
const PostMaker = mongoose.model("post",postSchema);

const date = new Date();
const options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long'
};
const day = date.toLocaleDateString('en-US',options);


app.get("/", (req, res)=>{
  PostMaker.find({},(err,found)=>{
    if(err){
      console.log(err);
    }else{
      res.render( 'home' , {content: homeStartingContent, posts: found});
    }
  });
});

app.get("/about", (req, res)=>{
  res.render( 'about' , {content: aboutContent,content2: aboutContent2});
});

app.get("/contact", (req, res)=>{
  res.redirect("https://peaceful-tundra-00886.herokuapp.com/");
});

app.get("/compose", (req, res)=>{
  res.render('compose', {date: day});
});
 
// Using express routing parameter (:post) & lodash (_.)
app.get("/posts/:id", (req, res)=>{
  const id = req.params.id;
  PostMaker.findOne({_id: id},(err,found)=>{
    if(err){
      console.log(err);
    }else{
      res.render("post",{title: found.title, content: found.content, id: found._id});
    }
  })
});

app.get("/posts/delete/:id", (req,res)=>{
  const id = req.params.id;
  PostMaker.findByIdAndDelete(id,(err,doc)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect("/");
    }
  });
});

app.post("/compose", (req, res)=>{
  const post = new PostMaker({
    title:  req.body.blogTitle,
    content: req.body.blogPost
    });
  post.save();
  res.redirect("/");
  }
);









app.listen(process.env.PORT || 3000, ()=> {
  console.log("Server started on port 3000");
});




// https://afternoon-earth-85109.herokuapp.com/