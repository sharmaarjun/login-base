var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
});

// db.collection('User').insertOne({
//     text: "Hello",
//     completed: false
// }, (err, result) => {
//     if(err){
//         console.log('Cannot enter in db');
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2));
// });