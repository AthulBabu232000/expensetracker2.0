var db=require('../config/connection');
var collection=require('../config/collection');
const ObjectId=require('mongodb').ObjectId;


module.exports = {
    enterExpenses: (expenseData) => {
      return new Promise(async (resolve, reject) => {
        db.get()
          .collection(collection.EXPENSE_COLLECTION)
          .insertOne(expenseData)
          .then((data) => {
            console.log("data about to enter");
            console.log(data);
            console.log("data entered");
            resolve(data);
          });
      });
    },

  
    getExpenses:()=>{
      return new Promise(async(resolve, reject)=>{
        let expenseList=await db.get().collection(collection.EXPENSE_COLLECTION).find().toArray();
        let expenses = await db
        .get()
        .collection(collection.EXPENSE_COLLECTION)
        .find({}, { projection: { inputAmount: 1 } })
        .toArray();
      
       let totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.inputAmount), 0);
       collection.TOTAL_AMOUNT=totalAmount;
        console.log("working");
        resolve({expenseList:expenseList,totalAmount:totalAmount});
    });
    },
    deleteExpense: (expenseId) => {
      return new Promise(async (resolve, reject) => {
     

        db.get()
          .collection(collection.EXPENSE_COLLECTION)
          .deleteOne({ _id: ObjectId(expenseId) })
          .then((data) => {
            console.log("Expense deleted");
            console.log(data);
            resolve(data);
          })
          .catch((err) => {
            console.log("Error deleting expense");
            console.error(err);
            reject(err);
          });
      });
    },
    calculateAmount:()=>{
      return(new Promise(async(resolve,reject)=>{
        let expenseList = await db
  .get()
  .collection(collection.EXPENSE_COLLECTION)
  .find({}, { projection: { inputAmount: 1 } })
  .toArray();

let totalAmount = expenseList.reduce((sum, expense) => sum + expense.inputAmount, 0);

console.log('Total Amount:', totalAmount);
resolve(totalAmount);


      }))
    }
    
  
    
  };