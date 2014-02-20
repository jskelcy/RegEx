


function match(RegEx, userInput){
	var current;
	var counter = 0;
	while(userInput.length != 0){
		console.log(counter);
		current = userInput[0];
		console.log(current);
		userInput = userInput.substring(1,userInput.length+1);	
		if (!eval(RegEx, current)){
			console.log('pattern does not match, failure occured at the '+ counter+' index');
			return false;
		}
		counter++;
	}
	//fringy ass fringe case fringe fringe fuck fringe
	if((RegEx.length == 0) ){
		console.log("o yeah");
		return true;
	}
	console.log("nope");
	return false;
}


//this is very similar to match however it does not advance the current pointer
function eval(RegEx, current){
	var operator = RegEx[0];
	var operatation = opLookup(operator);
	return (operatation(RegEx, current));
}


function opLookup(operator){
	switch(operator){
		case '|':
			return(function(RegEx, current){
				RegEx.splice(0,1);
				var orArgs = RegEx.splice(0,1);
				//why is this doing thins
				if( (eval(orArgs[0][0], current)) || (eval(orArgs[0][1], current))){
					return true;
				} else{
					return false;
				}
			})

		case '*':
			return(function(RegEx,current){
				if(eval(RegEx[1], current)){
					return true;
				}else{
					RegEx.splice(0,2);
					return true;
				}
			})

		case undefined:
			return(function(expression,current){
				if(current === undefined){
					return true;
				}else{
					return false;
				}
			})

		default:
			return(function(lit, current){
				if(lit == current){
					return true;
				}else{
					return false;
				}
			}) 
	}
}


match(['*',['k']], 'kkkkkk');

//Test Stuff***
//*works: match(['|',['a','b'],'|',['c','d']] , 'ad');
//match(['|',['a','b'],'|',['c','d']] , 'adf');
//match(['|',['a','b'],'|',['c','d']] , 'ak');
//


//var userRegEx = process.argv[2];
//var input = process.argv[3];

//need to turn the userRegEx value into a tree


