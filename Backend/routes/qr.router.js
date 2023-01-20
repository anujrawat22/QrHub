const express = require("express");
const QRCode = require("qrcode");

const qrRouter = express.Router();

qrRouter.get("/", (req, res) => {
  res.send("hello");
});

qrRouter.post("/generate", async (req, res) => {
  try {
    const data = req.body.data;
    

    const dataImage = await QRCode.toDataURL(data);

    console.log(dataImage);

    return res.status(200).json({ data: dataImage });
  } catch (err) {

    res.send(err);
  }
});


qrRouter.post("/scan",(req,res)=>{
    
})

module.exports = { qrRouter };
