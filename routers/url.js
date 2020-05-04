const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortID = require("shortid");

const Url = require("../models/Url");

router.post("/shorten", async (req, res) => {
  console.log(req);
  const { longUrl } = req.body;
  const baseUrl = process.env.baseURL;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  const urlCode = shortID.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long URL");
  }
});

module.exports = router;
