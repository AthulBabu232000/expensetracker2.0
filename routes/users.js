var express = require('express');
const multer=require('multer');
var path = require('path');
var router = express.Router();
var expenseHelper=require('../helpers/expensehelper');
// const ObjectId=require('mongodb');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/'); // Uploads will be stored in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
  },
});

const upload = multer({ storage: storage });
/* GET home page. */
router.get('/', function(req, res, next) {
  
expenseHelper.getExpenses().then(({expenseList,totalAmount})=>{

  res.render("users/home",{expenseList:expenseList,totalAmount:totalAmount});
})
});

router.get('/enter-details',function(req,res,next){


expenseHelper.getExpenses().then(({expenseList,totalAmount})=>{

  res.render("users/enter-details",{expenseList:expenseList,totalAmount:totalAmount});
})


})


  router.get("/display-details",function(req,res,next){
    
    expenseHelper.getExpenses().then(({expenseList,totalAmount})=>{

      res.render("users/display-details",{expenseList:expenseList,totalAmount:totalAmount});
    })
  })

router.post('/enter-details', upload.single('inputImage'), (req, res) => {
  const body1=req.body;
  const body2=req.file;
  const finalBody=Object.assign({},body1,body2);

  console.log(finalBody);
  expenseHelper.enterExpenses(finalBody).then((response)=>{
    res.redirect('/display-details');
  })
});

router.post('/delete-expense',function(req,res){
let expenseId=req.body.expenseId;
expenseHelper.deleteExpense(expenseId).then(response=>{
  res.redirect('/display-details');
})
})

module.exports = router;
