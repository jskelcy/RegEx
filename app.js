var shunting = require('./shunting');


var inputRegEx = process.argv[2];
var input = process.argv[3];

//this will just correct if someone just adds gives an empty string to match against
if(input === undefined){
	input ="";
}

var Regex = shunting(inputRegEx);
var testMe = Regex.match(input)
output(testMe);

function output(str){
	if(str === ""){
		console.log("String correctly matches regular expression");
	}else{
		console.log("String does not match regular expression")
	}
}

