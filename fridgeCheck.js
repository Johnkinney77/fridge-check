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
	client.write('Hello User! Welcome to FridgeCheck!\n');

	client.on('data', function(userInput){



		function save(){
			var jsonCompleted = JSON.stringify(jsonEdit);
			fs.writeFileSync('./fridgeCheck.json', jsonCompleted, 'utf8');
		};



		var userArray = userInput.trim().toLowerCase().split(" ");
		var newUser = {fullName: "",fridge : []};
		var fridgeAddition = {};


		switch (userArray[1]) {

			case "new":
			function nameLookUp(nameLookUp) {
				for(var i = 0; i < jsonEdit.length; i++) {
					if(jsonEdit[i].fullName.toLowerCase() === nameLookUp.toLowerCase()) {
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
			client.write("Thank you " + userArray[0] + ", you just added " + userArray[3] + " " + userArray[4] + " of " + userArray[2] + "\n")
			save();
			break;

			case "add":
			function addFoodLookUp(foodLookUp) {
				for(var i = 0; i < jsonEdit.length; i++) {
					if(jsonEdit[i].fullName.toLowerCase() === userArray[0].toLowerCase()) {
						for(var x = 0; x < jsonEdit[i].fridge.length; x++) {
							if(jsonEdit[i].fridge[x].food.toLowerCase() === foodLookUp.toLowerCase()) {
								jsonEdit[i].fridge[x].amount = parseInt(jsonEdit[i].fridge[x].amount) + parseInt(userArray[3]);
								client.write("You have added " + userArray[3] + " " + userArray[2]) + "\n";
								return;
							}
						}
					}
				}
				return false;
			}
			if(addFoodLookUp(userArray[2]) === false) {
				client.write("Please add this food as new!\n")
			}
			save();
			break;

			case "remove":
			function removeFoodLookUp(foodLookUp) {
				for(var i = 0; i < jsonEdit.length; i++) {
					if(jsonEdit[i].fullName.toLowerCase() === userArray[0].toLowerCase()) {
						for(var x = 0; x < jsonEdit[i].fridge.length; x++) {
							if(jsonEdit[i].fridge[x].food.toLowerCase() === foodLookUp.toLowerCase()) {
								console.log(x);
								jsonEdit[i].fridge.splice(x,1);
								client.write("You have removed " + userArray[2] + " from your fridge\n");
								return;
							}
						}
					}
				}
				return false;
			}
			if(removeFoodLookUp(userArray[2]) === false) {
				client.write("That food doesn't exist in your fridge\n")
			}
			save();
			break;

			case "consumed":
			function consumedFoodLookUp(foodLookUp) {
				for(var i = 0; i < jsonEdit.length; i++) {
					if(jsonEdit[i].fullName.toLowerCase() === userArray[0].toLowerCase()) {
						for(var x = 0; x < jsonEdit[i].fridge.length; x++) {
							if(jsonEdit[i].fridge[x].food.toLowerCase() === foodLookUp.toLowerCase()) {
								jsonEdit[i].fridge[x].amount = parseInt(jsonEdit[i].fridge[x].amount) - parseInt(userArray[3])
								client.write("You have consumed " + userArray[3] + " " + userArray[2] + "\n");
								return;
							}
						}
					}
				}
				return false;
			}
			if(consumedFoodLookUp(userArray[2]) === false) {
				client.write("That food doesn't exist in your fridge\n")
			}
			save();
			break;

			case "fridgecheck":
			var noFoods = "";
			function fridgecheck(usersFridge) {
				for(var i = 0; i < jsonEdit.length; i++) {
					console.log(i);
					if(jsonEdit[i].fullName.toLowerCase() === usersFridge.toLowerCase()){
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
			if(noFoods.length > 0){
				client.write("\nThe foods that you need to purhcase are:\n");
				client.write(noFoods + "\n");
			}
			break;

			case "delete":
			function deleteUser(deleteUser) {
				for(var i = 0; i < jsonEdit.length; i++) {
					if(jsonEdit[i].fullName.toLowerCase() === deleteUser.toLowerCase()){
						client.write("\nI am sorry you want to leave us " + userArray[0] + " we hope to see you again soon!\n")
						jsonEdit.splice(i, 1);
						return;
					}
				}
				return false;
			}
			if (deleteUser(userArray[0]) === false) {
				client.write("\nHello User, no one using this app goes by that name, please try again!\n")
			}
			save();
			break;

			case "users":
			var usersList = [];
			for(var i = 0; i < jsonEdit.length; i++) {
				client.write(jsonEdit[i].fullName + "\n")
			}
			break;

			case "exit":
			client.end();
			break;

			case "manual":
			client.write("\nNew User? or putting a new food to your fridge\n`your name` new `food` `amount` `container type`\n\n`your name` e.g bob\n`food` e.g. beer\n`amount` e.g. 30\n`container type` e.g. cans\n\nAdding more of an exisiting food?\n`your name` add `food` `amount`\n\nConsumed some food?\n`your name` consumed `food` `amount`\n\nNo longer want a food in your fridge?\n`your name` remove `food`\n\nWant to check the contents of your fridge or others?\n`your name` fridgecheck\n\nWant to delete yourself?\n`your name` delete\n\nSee all the users?\ncheck users\n\nWant to exit the program?\nuser exit\n")

			break;

			default:
			client.write("\nHi user! Unfortunately you did not enter the proper words, please refer to the `user manual` for more information.\n")
			break;
		};
	});
});


server.listen(8124, function() {
	console.log('SERVER BOUND');
});