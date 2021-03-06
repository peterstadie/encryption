function addListeners(){
	var button_encrypt = document.getElementById('button_encrypt');
	var button_decrypt = document.getElementById('button_decrypt');
	var button_swap = document.getElementById('button_swap');
	
	if(window.addEventListener) {
		button_encrypt.addEventListener("click", callback("encrypt"), false);
		button_decrypt.addEventListener("click", callback("decrypt"), false);
		button_swap.addEventListener("click", callback("swap"), false);
	}
}

/*

Encryption
The the plaintext(P) and key(K) are added modulo 26 (length alphabet).
Ei = (Pi + Ki) mod 26

Decryption
Di = (Ei - Ki + 26) mod 26


modulus operator (%)
A%B: if A<B the division A/B returns 0 with the remainder A

*/
function callback(action){
	var output_text = document.getElementById('output');
	var output_keyword = document.getElementById('output_keyword');
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";			

	return function(){
		var key = document.getElementById('key').value.toUpperCase();
		var message = Array.from(document.getElementById('message').value.cleanup());
		console.log(message);
		key = key.repeat(Math.floor(message.length/key.length)) + key.slice(0,message.length%key.length);
		var output = Array();
		
		if(action == "encrypt"){
			output = message.map((message_char,index)=>{ 
					return alphabet.charAt((alphabet.indexOf(message_char) + alphabet.indexOf(key.charAt(index))) % alphabet.length)
				});
		}
		if(action == "decrypt"){
			output = message.map((message_char,index)=>{ 
					return alphabet.charAt((alphabet.indexOf(message_char) - alphabet.indexOf(key.charAt(index)) + alphabet.length) % alphabet.length)
				});
		}
		if(action == "swap"){
			document.getElementById('message').value = output_text.value;
		}
		
		output_text.innerHTML = output.join("");
	}
}
	
String.prototype.cleanup = function() {
   return this.toUpperCase().replace(/[^a-zA-Z]+/g, "");
}
window.onload = addListeners;

