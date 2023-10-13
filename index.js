const express = require("express");
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
app.get('/password-generator',(req,res)=>{
    const {query: {length}} = req;
    let password = passwordGenerator(length);
      res.status(200).json({
        success: true,
        password
    })
})