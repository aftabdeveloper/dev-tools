const express = require("express");
const cors = require("cors");
const app = express();
app.listen(8080);

const passwordGenerator = (length)=>{
  let password = '';
  let pattern = "dfsh365238shAHDDJ34sfh*5$#(%)DGD@3DFDGDsgshe65237";
  for(let i=0;i<length;i++){
   let index =  Math.floor(Math.random()*pattern.length);
   password+=pattern[index];
  }
  return password;
}

app.use(cors())
app.get('/password-generator',(req,res)=>{
    let {query: {length}} = req;
    length = !length ? 8 : length;
    let password = passwordGenerator(length);
      res.status(200).json({
        success: true,
        password
    })
})