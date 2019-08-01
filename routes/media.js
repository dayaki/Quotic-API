import slug from "slug";
import express from "express";
const route = express.Router();

// Model
import Media from "../models/media";

// slug: slug(req.body.title, { lower: true }),

// Fetch all media contents
route.get("/", (req, res) => {
  Media.find({}, (err, media) => {
    if (err) {
      res.status(503).json("Network Errot");
    }
    res.json(media);
  });
});

// Increment view count
route.post("/view", (req, res) => {
  Media.findOneAndUpdate({ _id: req.body.id }, { $inc: { views: 1 } }, err => {
    if (err) res.status(503).json({ status: "error" });
    res.json({ status: "success" });

    if (err) {
      res.status(503).json({ error: err });
    }
    res.json(media);
  });
});

// Like an item
route.post("/like/:id", (req, res) => {
  Media.update(
    { _id: req.params.id },
    { $push: { likes: req.body.user } },
    function(err) {
      if (err) res.json({ status: "error" });

      Media.find({ published: "true" })
        .populate("author")
        .populate("comments")
        .sort({ date: -1 })
        .exec(function(err, items) {
          if (err) res.send("Error fetching articles");
          res.json({ status: "success", data: items });
        });
    }
  );
});

// UnLike an item
route.post("/unlike/:id", (req, res) => {
  Media.update(
    { _id: req.params.id },
    { $pop: { likes: req.body.user } },
    function(err) {
      if (err) res.json({ status: "error" });

      Media.find({ published: "true" })
        .populate("author")
        .populate("comments")
        .sort({ date: -1 })
        .exec(function(err, items) {
          if (err) res.send("Error fetching articles");
          res.json({ status: "success", data: items });
        });
    }
  );
});

// Post new comment
route.post("/comment", (req, res) => {
  Media.findById(req.body.mediaId, (err, media) => {
    if (err) res.json("Error finding media item");

    let comment = {
      postedBy: req.body.user,
      text: req.body.comment
    };

    let newComment = new Comment({
      comment: req.body.comment,
      user: req.body.user,
      media: req.body.mediaId
    });
    newComment.save();

    media.comments.push(comment);

    media.save((err, article) => {
      if (err) res.send("Error saving comments to media");
      // res.json({status: 'success', data: article });
      Media.find({ published: "true" })
        .populate("author")
        .populate("comments.postedBy")
        .sort({ date: -1 })
        .exec(function(err, items) {
          if (err) res.send("Error fetching articles");
          res.json({ status: "success", data: items });
        });
    });
  });
});

export default route;
