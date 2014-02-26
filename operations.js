function Or(re1, re2){
	this.re1 = re1;
	this.re2 = re2;

	this.match = function(currentString){
		var rest = this.re1.match(currentString);
		if(rest !== undefined){
			return rest;
		}else{
			return this.re2.match(currentString);
		}
	} 
}

function Concat(re1, re2){
	this.re1 = re1;
	this.re2 = re2;

	this.match = function(currentString){
		var rest = this.re1.match(currentString);
		if(rest !== undefined){
			return this.re2.match(rest);
		}else{
			return undefined;
		}
	}
}

function Lit(c){
	this.c = c;
	this.match = function(currentString){
		if(currentString.length >=1 && c === currentString[0]){
				return currentString.slice(1);
		}else{
			return undefined;
		}
	}
}


function Star(re){
	this.re = re;

	this.match = function(currentString){
		if(currentString === ""){
			return "";
		}else{
			var rest = this.re.match(currentString);
			if(rest === undefined){
				return currentString;
			}else{
				return this.match(rest);
			}
		}
	}
}

function Plus(re){
	this.re = new Concat(re, new Star(re));

	this.match = function(currentString){
		return this.re.match(currentString);
	}
}


function Empty(){
	this.match = function(currentString){
		if(currentString.length === 0){
			return '';
		}else{
			return undefined;
		}
	}
}





module.exports = {
	Empty: Empty,
	Plus: Plus,
	Star: Star,
	Concat: Concat,
	Or: Or,
	Lit: Lit
}

