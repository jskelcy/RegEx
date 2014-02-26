var operations = require('./operations');

module.exports = preparse;


//this just turns our string into a mutable array so recursion doesnt break string
function preparse(str){
	var arrayStr=[];
	for(var i = 0; i < str.length; i++){
		arrayStr.push(str[i]);
	}
	return parse(arrayStr);
}


function  parse(str) {
	
	//init stacks
	var operandStack =[];
	var operatorStack=[];
	//Base case-----------------------------
	//i think this will only happen if you get the regex '()'
	if(peek(str)===')' || peek(str) === undefined){
		return operandStack.pop();
	}
	//---------------------------------------
	var nextCharacter = peek(str);
	str = advance(str);
	while(nextCharacter !== ')' && nextCharacter !== undefined){
		//this is need for a concat
		if(nextCharacter === '('){
			operandStack.push(parse(str));
			nextCharacter = peek(str);
			str = advance(str);
			continue;
		}
		if((operandStack.length === 2 && operatorStack[0] === undefined)|| operandStack.length === 4 ){
			//this is need for a concat
			var switcheroo = operandStack.pop();
			var cat = new  operations.Concat(operandStack.pop(), switcheroo);
			operandStack.push(cat);
		}		
		if(nextCharacter === '|'){
		//push the or operator onto the operator stack
			operatorStack.push('|');
		}else{
			//this is for literals
			var lit = new operations.Lit(nextCharacter);
			operandStack.push(lit);
		}
		nextCharacter = peek(str);
		str = advance(str);
	}

	//this seems sloppy
	if((operandStack.length === 2 && operatorStack[0] === undefined)|| operandStack.length === 4 ){
			//this is need for a concat
			var switcheroo = operandStack.pop();
			var cat = new operations.Concat(operandStack.pop(), switcheroo);
			operandStack.push(cat);
		}	
	//this will or if it is needed
	if(operatorStack[0] === '|'){
		//because or can go either way this next line does not matter but I am putting it in for now
		var switcheroo = operandStack.pop();
		var cat = new operations.Concat(operandStack.pop(), switcheroo);
		operandStack.push(cat);
	}


	//this is not even funny
	var plarCheck = peek(str);
	//add star or plus to current return value
	if(plarCheck === '*' ||  plarCheck === "|"){
		//this seems inefficent
		var currentRegex = operandStack.pop();
		if(plarCheck === '*'){
			//add star
			var plarRegex = new operations.Star(currentRegex);
			str=advance(str);
			operandStack.push(plarRegex);
		}else{
			//add plus
			var plarRegex = new operations.Plus(currentRegex);
			str=advance(str);
			operandStack.push(plarRegex);
		}
	}
	//return whatever is left on the stack at this point
	return operandStack.pop();

}

//helper functions for moving through string
function peek(str){
	return str[0];
}

function advance(str){
	str.splice(0,1);
	return str;
}

function more(str){
	return (str.length > 0);
}


