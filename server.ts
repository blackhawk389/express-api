import * as express from "express";
var app = express();
import * as path from "path";
import * as mongoose from "mongoose";
import * as lodash from "lodash";


//nodejs is async thats why we have to use callbacks, oh really?

var uriString = 'mongodb://localhost/quizapp';
mongoose.connect(uriString, function(err, res){
  if(err){
    console.log("Error occured while establishing connection " + err);
  }else{
    console.log("Connection successful ");
  }
})
var i = 0;
// function CreatingRandom(){
    
//     var array : any[] = [];
//     while(i < 12){
//     var a = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
//     if(lodash.indexOf(array, a) == -1){
//       array.push(a);
//     }else {
//            var a = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
//            if(lodash.indexOf(array, a) == -1){
//                array.push(a);
//            }
//     }
//     i++;
//   }
//   console.log(array);
    
// }

function CreatingRandom(){
    
    var array : any[] = [];
    while(array.length != 10){
    var a = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    if(lodash.indexOf(array, a) == -1){
      array.push(a);
    }else {
           var a = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
           if(lodash.indexOf(array, a) == -1){
               array.push(a);
           }
    }
    i++;
  }
  console.log(array);
  return array;
    
}

app.use(express.static(path.join(__dirname, "./../client")));
var num = CreatingRandom();
var schema = new mongoose.Schema({
  question : String,
  id :  Number
})

var quizz = mongoose.model('Quiz', schema );

var firstDoc = new quizz({
  question: 'question 1',
  id : 1
})
var secondDoc = new quizz({
  question: 'question 2',
  id : 2
})
var thirdDoc = new quizz({
  question: 'question 3',
  id : 3
})
var fourthDoc = new quizz({
  question: 'question 4',
  id : 4
})
var fifthDoc = new quizz({
  question: 'question 5',
  id : 5
})

var question_data = [firstDoc, secondDoc, thirdDoc, fourthDoc, fifthDoc];

quizz.insertMany(question_data, function(err, res){
      if(err){
       console.log("Srror occured while saving document object " + err )
     }else{
       console.log("Data Saved Successful");
     }
})




quizz.findOne({id : '1'}, function(err, res){
  if(err){
    console.log(err)
  }else{
    //splice(position, how many items)
    // var a = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    //   console.log(res + "Random numnber " + a);
  }
})


// firstDoc.save(function(err, res){
//      if(err){
//        console.log("error occured while saving document object " + err )
//      }else{
//        console.log("saved data");
//      }
// })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})