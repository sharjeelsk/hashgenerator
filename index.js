const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const jsSHA = require("jssha")
// const payu = require('payu-sdk')({
//     key: '<a22xcp>',
//     salt:  '<MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDhtjIhG3aGAC+s0k6854O8cwrLihtTgmtQj3Ss7roSCsktRobx6jyr/0URE+GwNC3KND7RblOvanBQIpyBK4nKaxSLGlvakWxSPSmaWj9IA2T3I3xkEQ0s1Gztp/F1QzbeXJuG1rBXt15MQZ2MPtQqC9vW4ZBg1Cm9Li05BZeBiQuJDO4DB5fvICS8gcPGVdv9mSjuA5+fBx9aFI5xLhmGphWiyLiBAijwKe2lcDBVbrAs6m7ezuK0fSy+RSIYmRM3D+zS7Cf8JyvTSsRxOGi6I+oafb7+T0+RhKqWZFbhbfjEcWWoQbblAg0JtLCfhEMMviar//zB8G8dEWPX4EjFAgMBAAECggEBAJ40ho6OIVVra/9GqcnevIeqWzavZtfx4iZlZvKPofxjcv85H/0QodYs5sxBkz9eU3oXhLBnFGEvyelhWTFwwvQOeifGIfvhUnuSQ0bdWt2vA2X2iYnaKdHyUyeBP81hf2P8pUat1IynCoGIvFVA9JVEGqNTF0/HZjoj067ULI2toCPICaqycDZyPEOWyHUrLI8vPYj1XJJApaA677LTnlTrYSp5Nb49LJ6ey72Q8ANQSItycysFeNv4uqo49ZNqh5pvLoHb+v63aR/5K2fX1iNe5ge+4DL8jGlzXhjc5ZW3MxSpjdnIT/p370Y7eQh3bevfOXWFqWbECBQMQsSMbUECgYEA+WKRzDGdyOtD9y5i6OAi50aRELMvS6p1tYBtFl6wtpWc3AXc6InBeJJusKhH+1j6lo5X4wAscd+SuQEiJ6ksQSdIDbJQ2GbX+lNqawoSM9xSyuGOibksVRCQ9Mq+fjWV6/jqnVZDJMbrWM6Q9Dw0lJr3RUkctG/GG8cBPJWhjSsCgYEA57Lf0QRZhPTdxJKP2jVcDXIg5skJFZW1klPPgXKBNthfJg17XvL01gStt1jW/STBbnEJJZvMxhFc0SuBfznVtZbrwZtrzVbKHJfZglM/L0aPiAvgoScEIUIXEU1qHN6v9vjXpLlOJJqzaADDngyMdUUH2pVFur4pWeO54+7J6c8CgYBcAONtA7kEUNdoL7LJ2zbFQCFwmcqPDboTVefo4tIq6hNOkNMo7vlzdAJmJg84SWFZffYqhvvenu7QVfy1yRHMj6Njei+dRoPTlEakarjAbT4WHxSo9qnGUDBKPyn8AeTng5N6rEJlJQXaY4rSsAtt76Xd59UxNDNQOCDaqxFItQKBgACgMgyNd3RteN/cCXlsZXg/06jr6BNf2SKxCUFvPrwYL4GZzbh+7XxafOGe4s3COKeEtKKeXho218pU1L+0N0iLRM28Drl6P4d+PX8lnGkTRrX2Wj/1LASu+gL4841qaI1BNMvkGDrvFAb24ZBetk5mxlOnzY1okBIHFGxyK6dvAoGAE3w+eD2bEHokZMrOisxASR5OTLDiAcdzYk+wCNcjUBRzRSOdEEwzIS3H2b8opFyYRTYczS1HRrTgT3CltrFk6lGkqNVrFCCRHZjIuZ6JyXSRf9rLH1Yd1N+woJIh0bhjjQn4Ud+VIC/NO5R+W7nmkz2gplGBrIrvKMdaD8SF88Q=>', // should be on server side only
//   });
const PORT = process.env.PORT || 3002
const app = express();
app.use(cors())
app.use(bodyParser.json())

app.post('/payment/payumoney',(req,res)=>{
    if (!req.body.txnid || !req.body.amount || !req.body.productinfo   
        || !req.body.firstname || !req.body.email) {
          res.send("Mandatory fields missing");
    } else {
          var pd = req.body;
          var hashString = 'tEMqiOPJdArwI1W5o3mrzlPBHzQmBULU' // Merchant Key 
                   + '|' + pd.txnid 
                   + '|' + pd.amount + '|' + pd.productinfo + '|'          
                   + pd.firstname + '|' + pd.email + '|' 
                   + '||||||||||' 
                   + 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDhtjIhG3aGAC+s0k6854O8cwrLihtTgmtQj3Ss7roSCsktRobx6jyr/0URE+GwNC3KND7RblOvanBQIpyBK4nKaxSLGlvakWxSPSmaWj9IA2T3I3xkEQ0s1Gztp/F1QzbeXJuG1rBXt15MQZ2MPtQqC9vW4ZBg1Cm9Li05BZeBiQuJDO4DB5fvICS8gcPGVdv9mSjuA5+fBx9aFI5xLhmGphWiyLiBAijwKe2lcDBVbrAs6m7ezuK0fSy+RSIYmRM3D+zS7Cf8JyvTSsRxOGi6I+oafb7+T0+RhKqWZFbhbfjEcWWoQbblAg0JtLCfhEMMviar//zB8G8dEWPX4EjFAgMBAAECggEBAJ40ho6OIVVra/9GqcnevIeqWzavZtfx4iZlZvKPofxjcv85H/0QodYs5sxBkz9eU3oXhLBnFGEvyelhWTFwwvQOeifGIfvhUnuSQ0bdWt2vA2X2iYnaKdHyUyeBP81hf2P8pUat1IynCoGIvFVA9JVEGqNTF0/HZjoj067ULI2toCPICaqycDZyPEOWyHUrLI8vPYj1XJJApaA677LTnlTrYSp5Nb49LJ6ey72Q8ANQSItycysFeNv4uqo49ZNqh5pvLoHb+v63aR/5K2fX1iNe5ge+4DL8jGlzXhjc5ZW3MxSpjdnIT/p370Y7eQh3bevfOXWFqWbECBQMQsSMbUECgYEA+WKRzDGdyOtD9y5i6OAi50aRELMvS6p1tYBtFl6wtpWc3AXc6InBeJJusKhH+1j6lo5X4wAscd+SuQEiJ6ksQSdIDbJQ2GbX+lNqawoSM9xSyuGOibksVRCQ9Mq+fjWV6/jqnVZDJMbrWM6Q9Dw0lJr3RUkctG/GG8cBPJWhjSsCgYEA57Lf0QRZhPTdxJKP2jVcDXIg5skJFZW1klPPgXKBNthfJg17XvL01gStt1jW/STBbnEJJZvMxhFc0SuBfznVtZbrwZtrzVbKHJfZglM/L0aPiAvgoScEIUIXEU1qHN6v9vjXpLlOJJqzaADDngyMdUUH2pVFur4pWeO54+7J6c8CgYBcAONtA7kEUNdoL7LJ2zbFQCFwmcqPDboTVefo4tIq6hNOkNMo7vlzdAJmJg84SWFZffYqhvvenu7QVfy1yRHMj6Njei+dRoPTlEakarjAbT4WHxSo9qnGUDBKPyn8AeTng5N6rEJlJQXaY4rSsAtt76Xd59UxNDNQOCDaqxFItQKBgACgMgyNd3RteN/cCXlsZXg/06jr6BNf2SKxCUFvPrwYL4GZzbh+7XxafOGe4s3COKeEtKKeXho218pU1L+0N0iLRM28Drl6P4d+PX8lnGkTRrX2Wj/1LASu+gL4841qaI1BNMvkGDrvFAb24ZBetk5mxlOnzY1okBIHFGxyK6dvAoGAE3w+eD2bEHokZMrOisxASR5OTLDiAcdzYk+wCNcjUBRzRSOdEEwzIS3H2b8opFyYRTYczS1HRrTgT3CltrFk6lGkqNVrFCCRHZjIuZ6JyXSRf9rLH1Yd1N+woJIh0bhjjQn4Ud+VIC/NO5R+W7nmkz2gplGBrIrvKMdaD8SF88Q=' // Your salt value
          var sha = new jsSHA('SHA-512', "TEXT");
          sha.update(hashString)
          var hash = sha.getHash("HEX");
          console.log(hash)
          res.send({ 'hash': hash });
    }
})

app.post("/success",(req,res)=>{
    console.log("success",req.body)
})
app.post('/fail',(req,res)=>{
    console.log(req.body)
})

app.post("/singletransaction",(req,res)=>{
    console.log(req.url)
    res.redirect(`https://hellomitr.com${req.url}`)
})
app.post("/transaction",(req,res)=>{
    console.log(req.url)
    res.redirect(`https://hellomitr.com${req.url}`)
})
// app.post('/payment/payumoney',(req,res)=>{
//     if (!req.body.txnid || !req.body.amount || !req.body.productinfo   
//         || !req.body.firstname || !req.body.email) {
//           res.send("Mandatory fields missing");
//     } else {
//           var pd = req.body;
//           const hash = payu.hasher.generateHash(pd);
//         //   var hashString = 'tEMqiOPJdArwI1W5o3mrzlPBHzQmBULU' // Merchant Key 
//         //            + '|' + pd.txnid 
//         //            + '|' + pd.amount + '|' + pd.productinfo + '|'          
//         //            + pd.firstname + '|' + pd.email + '|' 
//         //            + '||||||||||' 
//         //            + 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDhtjIhG3aGAC+s0k6854O8cwrLihtTgmtQj3Ss7roSCsktRobx6jyr/0URE+GwNC3KND7RblOvanBQIpyBK4nKaxSLGlvakWxSPSmaWj9IA2T3I3xkEQ0s1Gztp/F1QzbeXJuG1rBXt15MQZ2MPtQqC9vW4ZBg1Cm9Li05BZeBiQuJDO4DB5fvICS8gcPGVdv9mSjuA5+fBx9aFI5xLhmGphWiyLiBAijwKe2lcDBVbrAs6m7ezuK0fSy+RSIYmRM3D+zS7Cf8JyvTSsRxOGi6I+oafb7+T0+RhKqWZFbhbfjEcWWoQbblAg0JtLCfhEMMviar//zB8G8dEWPX4EjFAgMBAAECggEBAJ40ho6OIVVra/9GqcnevIeqWzavZtfx4iZlZvKPofxjcv85H/0QodYs5sxBkz9eU3oXhLBnFGEvyelhWTFwwvQOeifGIfvhUnuSQ0bdWt2vA2X2iYnaKdHyUyeBP81hf2P8pUat1IynCoGIvFVA9JVEGqNTF0/HZjoj067ULI2toCPICaqycDZyPEOWyHUrLI8vPYj1XJJApaA677LTnlTrYSp5Nb49LJ6ey72Q8ANQSItycysFeNv4uqo49ZNqh5pvLoHb+v63aR/5K2fX1iNe5ge+4DL8jGlzXhjc5ZW3MxSpjdnIT/p370Y7eQh3bevfOXWFqWbECBQMQsSMbUECgYEA+WKRzDGdyOtD9y5i6OAi50aRELMvS6p1tYBtFl6wtpWc3AXc6InBeJJusKhH+1j6lo5X4wAscd+SuQEiJ6ksQSdIDbJQ2GbX+lNqawoSM9xSyuGOibksVRCQ9Mq+fjWV6/jqnVZDJMbrWM6Q9Dw0lJr3RUkctG/GG8cBPJWhjSsCgYEA57Lf0QRZhPTdxJKP2jVcDXIg5skJFZW1klPPgXKBNthfJg17XvL01gStt1jW/STBbnEJJZvMxhFc0SuBfznVtZbrwZtrzVbKHJfZglM/L0aPiAvgoScEIUIXEU1qHN6v9vjXpLlOJJqzaADDngyMdUUH2pVFur4pWeO54+7J6c8CgYBcAONtA7kEUNdoL7LJ2zbFQCFwmcqPDboTVefo4tIq6hNOkNMo7vlzdAJmJg84SWFZffYqhvvenu7QVfy1yRHMj6Njei+dRoPTlEakarjAbT4WHxSo9qnGUDBKPyn8AeTng5N6rEJlJQXaY4rSsAtt76Xd59UxNDNQOCDaqxFItQKBgACgMgyNd3RteN/cCXlsZXg/06jr6BNf2SKxCUFvPrwYL4GZzbh+7XxafOGe4s3COKeEtKKeXho218pU1L+0N0iLRM28Drl6P4d+PX8lnGkTRrX2Wj/1LASu+gL4841qaI1BNMvkGDrvFAb24ZBetk5mxlOnzY1okBIHFGxyK6dvAoGAE3w+eD2bEHokZMrOisxASR5OTLDiAcdzYk+wCNcjUBRzRSOdEEwzIS3H2b8opFyYRTYczS1HRrTgT3CltrFk6lGkqNVrFCCRHZjIuZ6JyXSRf9rLH1Yd1N+woJIh0bhjjQn4Ud+VIC/NO5R+W7nmkz2gplGBrIrvKMdaD8SF88Q=' // Your salt value
//         //   var sha = new jsSHA('SHA-512', "TEXT");
//         //   sha.update(hashString)
//         //   var hash = sha.getHash("HEX");
//         //   console.log(hash)
//           res.send({ 'hash': hash });
//     }
// })

app.listen(PORT,()=>{
    console.log("server started on",PORT)
})