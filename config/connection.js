const mongoClient=require('mongodb').MongoClient;
const state={
    db:null
};




module.exports.connect= async function(done){
    // const url="mongodb://localhost:27017";

    const url='mongodb+srv://athul:asbupsilonno1@cluster0.223ob.mongodb.net';

    const dbname='expensetracker2';
  
   await mongoClient.connect(url, (err, client) => {
        if (err) {
          console.error('Error connecting to MongoDB:', err);
          return done(err);
        }
      
        console.log('Connected to MongoDB');
        state.db = client.db(dbname);
        done();
      });
      
}

module.exports.get=function(){
    return state.db ;
}