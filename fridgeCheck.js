var net = require('net');
var server = net.createServer();

var fs = require('fs');
var jsonString = fs.readFileSync("./fridgeCheck.json", 'utf8');
var jsonEdit = JSON.parse(jsonString);
/*
function save(){
	var jsonCompleted = JSON.stringify(jsonEdit);
	fs.writeFileSync('./fridgeCheck.json', jsonCompleted, 'utf8');
}*/


server.on('connection', function(client){
	console.log('USER CONNECTED');
	client.setEncoding('utf8');
	client.write('Hello User! Welcome to FridgeCheck!');

	client.on('data', function(userInput){
		var userArray = userInput.trim().split(" ");

		var newUser = {fullName: "",fridge : []};
		var fridgeAddition = {};




		function save(){
			var jsonCompleted = JSON.stringify(jsonEdit);
			fs.writeFileSync('./fridgeCheck.json', jsonCompleted, 'utf8');
		};


		if (userArray[1] === "new") {
			function nameLookUp(nameLookUp) {
				for(var i = 0; i < jsonEdit.length; i++) {
					if(jsonEdit[i].fullName.toUpperCase() === nameLookUp.toUpperCase()) {
						fridgeAddition.food = userArray[2];
						fridgeAddition.amount = userArray[3];
						fridgeAddition.typeContainer = userArray[4];
						jsonEdit[i].fridge.push(fridgeAddition);
						return;
					}
				}
				newUser.fullName = userArray[0];
				fridgeAddition.food = userArray[2];
				fridgeAddition.amount = userArray[3];
				fridgeAddition.typeContainer = userArray[4];
				newUser.fridge.push(fridgeAddition);
				jsonEdit.push(newUser);
				return;
			}

			nameLookUp(userArray[0]);


			client.write("Thank you " + userArray[0] + ", you just added " + userArray[3] + " " + userArray[4] + " of " + userArray[2])

			save();

		} else if (userArray[1] === "add") {

			function foodLookUp(foodLookUp) {
				for(var i = 0; i < jsonEdit.length; i++) {
					if(jsonEdit[i].fullName.toUpperCase() === userArray[0].toUpperCase()) {
						for(var x = 0; x < jsonEdit[i].fridge.length; x++) {
							if(jsonEdit[i].fridge[x].food.toUpperCase() === foodLookUp.toUpperCase()) {
								jsonEdit[i].fridge[x].amount = parseInt(jsonEdit[i].fridge[x].amount) + parseInt(userArray[3]);
								return;
							}
						}
					}
				}
				return false;
			}

			if(foodLookUp(userArray[2]) === false) {
				client.write("Please add this food as new!")
			}

			client.write("You have added " + userArray[3] + " " + userArray[2]);

			save();

		} else if (userArray[1] === "consumed"){

			function foodLookUpTwo(foodLookUp) {
				for(var i = 0; i < jsonEdit.length; i++) {
					for(var x = 0; x < jsonEdit[i].fridge.length; x++) {
						if(jsonEdit[i].fridge[x].food.toUpperCase() === foodLookUp.toUpperCase()) {
							jsonEdit[i].fridge[x].amount = parseInt(jsonEdit[i].fridge[x].amount) - parseInt(userArray[3])
							return;
						}
					}
				}
				return false;
			}

			if(foodLookUpTwo(userArray[2]) === false) {
				client.write("That food doesn't exist in your fridge")
			}

			client.write("You have consumed " + userArray[3] + " " + userArray[2]);
			save();

		} else if (userArray[1] === "fridgecheck"){

			var noFoods = "";

			function fridgecheck(usersFridge) {
				for(var i = 0; i < jsonEdit.length; i++) {
					console.log(i);
					if(jsonEdit[i].fullName.toUpperCase() === usersFridge.toUpperCase()){
						for(var x = 0; x < jsonEdit[i].fridge.length; x++) {
							client.write(jsonEdit[i].fridge[x].food + " " + jsonEdit[i].fridge[x].amount + "\n");
							if(jsonEdit[i].fridge[x].amount == 0) {
								noFoods += jsonEdit[i].fridge[x].food + "\n";
							}
						}
						return;
					}
				}
				return false;
			}

			fridgecheck(userArray[0]);

			/*for (var i = 0; i < (jsonEdit.length); i++){
				client.write(jsonEdit[i].food + " " + jsonEdit[i].amount + " " + jsonEdit[i].typeContainer)
				if (jsonEdit[i].amount == 0) {
					noFoods += jsonEdit[i].food + "\n";
				}
			}*/
			if(noFoods.length > 0){
				client.write("\nThe foods that you need to purhcase are:");
				client.write(noFoods + "\n");
			}

		} else {

			client.write("Hi user! Unfrotunately you did not enter the proper words, please refer to the users manual for more information.")
		}

	});
});


server.listen(8124, function() {
	console.log('SERVER BOUND');
});