

var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;
require("dotenv").config()

var constr = process.env.MONGO_URI
var app = express();
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/admin", (req, res) => {
  mongoClient.connect(constr).then((clientOnj) => {
    var database = clientOnj.db("videosdb");
    database
      .collection("admin")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
app.get("/categories", (req, res) => {
  mongoClient.connect(constr).then((clientOnj) => {
    var database = clientOnj.db("videosdb");
    database
      .collection("categories")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
app.get("/users", (req, res) => {
  mongoClient.connect(constr).then((clientOnj) => {
    var database = clientOnj.db("videosdb");
    database
      .collection("users")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
app.get("/videos", (req, res) => {
  mongoClient.connect(constr).then((clientOnj) => {
    var database = clientOnj.db("videosdb");
    database
      .collection("vidoes")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
app.get("/videos/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoClient.connect(constr).then((clientObj) => {
    var database = clientObj.db("videosdb");
    database
      .collection("videos")
      .find({ VideoId: id })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.get("/getvideos/:catid", (req, res) => {
  var id = parseInt(req.params.catid);
  mongoClient.connect(constr).then((clientObj) => {
    var database = clientObj.db("videosdb");
    database.collection("videos")
      .find({ CategoryId: id })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

//categories
//CategoryId
//CategoryName
app.post("/addcategory", (req, res) => {
  var category = {
    CategoryId: parseInt(req.body.CategoryId),
    CategoryName: req.body.CategoryName
  };
  mongoClient.connect(constr).then(clientObj => {
    var database = clientObj.db("videosdb");
    database.collection("categories").insertOne(category)
      .then(() => {
        console.log(`Record Inserted`);
        res.send("Record Inserted");
        // res.redirect("/categories");
        res.end();
      })
  });
});

app.post("/regsiterUser", (req, res) => {
  var user = {
    UserId: req.body.UserId,
    Password: req.body.Password,
    Email: req.body.Email,
    Mobile: req.body.Mobile
  };
  mongoClient.connect(constr).then(clientObj => {
    var database = clientObj.db("videosdb");
    database.collection("users").insertOne(user).then(() => {
      console.log(`Registered Successfully created`);
      res.send(`Registered Successfully created`);
      res.end();
    })
  })
});
app.post("/addVideo", (req, res) => {
  var video = {
    VideoId: parseInt(req.body.VideoId),
    Title: req.body.Title,
    Url: req.body.Url,
    Likes: parseInt(req.body.Likes),
    Dislikes: parseInt(req.body.Dislikes),
    Views: parseInt(req.body.Views),
    CategoryId: parseInt(req.body.CategoryId)
  };
  mongoClient.connect(constr).then(clientObj => {
    var database = clientObj.db("videosdb");
    database.collection("videos").insertOne(video).then(() => {
      console.log(`Video Inserted`);
      res.send("Video Inserted");
      res.end();
    })
  })
});

app.put("/updatevideo/:id", (req, res) => {

  var id = parseInt(req.params.id);
  var updatevideo = {
    VideoId: parseInt(req.body.VideoId),
    Title: req.body.Title,
    Url: req.body.Url,
    Likes: parseInt(req.body.Likes),
    Dislikes: parseInt(req.body.Dislikes),
    Views: parseInt(req.body.Views),
    CategoryId: parseInt(req.body.CategoryId)
  }
  mongoClient.connect(constr).then(clientObj => {
    var database = clientObj.db("videosdb");
    database.collection("videos")
      .updateOne({ VideoId: id }, { $set: updatevideo })
      .then(() => {
        console.log(`Update Video Successfully`);
        res.send("Update Video Successfully");
        res.end();
      });

  })
});


app.delete("/deletevideo/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoClient.connect(constr).then(clientObj => {
    var database = clientObj.db("videosdb");
    database.collection("videos").deleteOne({ VideoId: id }).then(() => {
      console.log(`Video Deleted Successfully`);
      res.send("Video Deleted Successfully");
      res.end();
    })
  });

});



app.listen(5000);
console.log(`Server Started : http://localhost:5000`);
