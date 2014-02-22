

//i am manipulating the string and using it in my while loop, rather than the Regex, 
//because a string is not mutable and that way I can use it as the return value of all the opoerator functions 


function match(RegEx, userInput){
	var counter = 0;
	var currentString = eval(RegEx,userInput);
	while(currentString != undefined && currentString.length >0){
		currentString = eval(RegEx, currentString);
		console.log('current string: '+ currentString )
		counter++;
	}
	//in the case of a RegEx ending star or a plus there may be left over Regex
	if(RegEx.length === 0){
		if(currentString === undefined){
			//string is longer than Regex
			console.log('String does not match RegEx(1)');
			return false;
		}else{
			//RegEx is correct and the last operation is not a star or a plus
			console.log('String matches RegEx(2)');
			return true;
		}
	}
	else{ //this is super ugly, I am sure there is a better way
		//Regex ending in a star or a plus with a confirmation that there is nothing after the last repeated character
		if(RegEx[0] == '*'){
			console.log('String matches RegEx(3)');
			return true;
		}else{
			//I am having trouble finding if this is possible
			console.log('String does not match RegEx(4)');
			return false;
		}
	}
}


//this is very similar to match however it does not advance the current pointer
function eval(RegEx, userInput){
	var operator = RegEx[0];
	var operatation = opLookup(operator);
	return (operatation(RegEx, userInput));
}


function opLookup(operator){
	switch(operator){
		case '|':
			return(function(RegEx, userInput){
				RegEx.splice(0,1);
				var orArgs = RegEx.splice(0,1);
				//why is this doing this
				var returnMe = eval(orArgs[0][0], userInput);
				if(returnMe != undefined){
					return(returnMe);
				
				}else{
					returnMe =eval(orArgs[0][1], userInput)
					if(returnMe != undefined){
						return(returnMe)
					}else{
					return undefined;
					}
				}
			}
			)

		case '*':
			return(function(RegEx,userInput){
				var starArgs = RegEx.slice(1)
				var returnMe = eval(starArgs, userInput)
				if(returnMe !=  undefined){
					return returnMe;	
				}else{
					RegEx.splice(0,2);
					return userInput;
				}
			})

		case undefined:
			return(function(expression,userInput){
				if(userInput != ""){
						console.log('this is a test')
					return undefined;
				}
			})

		default:
			return(function(RegEx, userInput){
				current = userInput[0];
				//this splice is a problem
                lit = RegEx.splice(0,1);
				if(lit == current){
                    userInput = userInput.substring(1,userInput.length+1);
                    console.log('this is the returned string: ' + userInput)
					return userInput;
				}else{
					return undefined;
				}
			}) 
	}
}



//Test Stuff***
match(['|',[['a'],['b']],'|',[['c'],['d']]] , 'a');
//match(['*',['k']], 'kkkkkkg');
//match(['|',[['a'],['b']],'|',[['c'],['d']]] , 'ad');
//match(['|',[['a'],['b']],'|',[['c'],['d']]] , 'adf');
//match(['|',[['a'],['b']],'|',[['c'],['d']]] , 'al');
//


//var userRegEx = process.argv[2];
//var input = process.argv[3];

//need to turn the userRegEx value into a tree


