const express = require("express");
const cors = require("cors");
const cryptoJs = require("crypto-js");
const md5 = require("md5");

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

const messageEncryption = (message)=>{
  const encryptMessage = cryptoJs.AES.encrypt(message,"DON");
  return encryptMessage.toString();
}

const passwordEncryption = (password)=>{
  return md5(password);
}

const strongPasswordChecker = (password)=>{
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);

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

app.get("/encrypt",(req,res)=>{
  let {query:{message}} = req;
  message = !message ? "Hello World" : message;
  const encryptMessage= messageEncryption(message)
  res.status(200).json({
    success: true,
    encryptMessage
  })
})

app.get("/md5",(req,res)=>{
  let {query:{password}} = req;
  password = !password ? "Hello World" : password;
  const encryptPassword = passwordEncryption(password)
  res.status(200).json({
    success: true,
    encryptPassword
  })
})

app.get("/strongPassword",(req,res)=>{
  let {query:{password}} = req;
  password = !password ? "H@lllO10" : password;
  const isStrong = strongPasswordChecker(password)
  res.status(200).json({
    success: true,
    isStrong
  })
})
