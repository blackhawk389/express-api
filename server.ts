import * as express from "express";
var app = express();
import * as path from "path";
import * as mongoose from "mongoose";
import * as lodash from "lodash";
import * as morgan from "morgan";
import * as cors from "cors";



app.use(express.static(path.join(__dirname, "./../client")));


app.use(morgan("combined"));
app.use(cors());



var i = 0;
var num = CreatingRandom();
//nodejs is async thats why we have to use callbacks, oh really?

var uriString = 'mongodb://localhost/quizapp';
mongoose.connect(uriString, function (err, res) {
  if (err) {
    console.log("Error occured while establishing connection " + err);
  } else {
    console.log("Connection successful ");
  }
})

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

function CreatingRandom() {

  var array: any[] = [];
  while (array.length != 4) {
    var a = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    if (lodash.indexOf(array, a) == -1) {
      array.push(a);
    } else {
      var a = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
      if (lodash.indexOf(array, a) == -1) {
        array.push(a);
      }
    }
    i++;
  }
  console.log(array);
  return array;

}


var schema = new mongoose.Schema({
  question: String,
  id: Number
})

app.get('/data', function(req, res) {

  var taken = lodash.take(num, 1);
  num = lodash.drop(num, 1);

  quizz.findOne({ id: 1}, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log(data);
      res.json(data);
    }
  })

})

var quizz = mongoose.model('Quiz', schema);

var firstDoc = new quizz({
  question: 'question 1',
  id: 1
})
var secondDoc = new quizz({
  question: 'question 2',
  id: 2
})
var thirdDoc = new quizz({
  question: 'question 3',
  id: 3
})
var fourthDoc = new quizz({
  question: 'question 4',
  id: 4
})
var fifthDoc = new quizz({
  question: 'question 5',
  id: 5
})

var question_data = [firstDoc, secondDoc, thirdDoc, fourthDoc, fifthDoc];

quizz.insertMany(question_data, function (err, res) {
  if (err) {
    console.log("Srror occured while saving document object " + err)
  } else {
    console.log("Data Saved Successful");
  }
})



function sending() {

  var taken = lodash.take(num, 1);
  num = lodash.drop(num, 1);

  quizz.findOne({ id: taken[0] }, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log(data);
    }
  })
}


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