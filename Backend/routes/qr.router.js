const express = require("express");
const QRCode = require("qrcode");

const qrRouter = express.Router();

qrRouter.use(express.json())
qrRouter.get("/", (req, res) => {
  res.send("hello");
});

qrRouter.post("/generate", async (req, res) => {
  try {
    const {data} = req.body;
    console.log(data)
    if(data.url){
      let dataImage = await QRCode.toDataURL(data.url);

    console.log(dataImage);

    return res.status(200).send({ data: dataImage });
    }else if(data.imgbase64){
      let dataImage = await QRCode.toDataURL(data.imgbase64)

      return res.status(200).send({ data: dataImage })
    }

    
  } catch (err) {
    console.log(err)
    res.send(err);
  }
});


qrRouter.post("/scan",(req,res)=>{
    
})

module.exports = { qrRouter };
