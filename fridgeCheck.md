#Fridge Check
Howdy y'all and welcome to the Fridge Check documentation. Here we will find out how to keep track of whats in your fridge and easily find out what we need to purchase when its time to make out way to the grocery store.

##Putting your food into the Fridge .... check
Simply type into the console
```
node fridgeCheck.js new food amount "type of amount"
```
- "food" is the food item that you are inserting into your fridge (e.g. ketchup)
- "amount" is the amount of the item (e.g. 20)
- "type of container" (e.g. bottles, cans, slices)

When adding a food, we will let you know it happened successfully, as an example you will see:
```
You just added 10 lb of carrots
```

## Fridge Check Time!

Simply type into the console
```
node fridgeCheck.js fridgecheck
```
Inputting this will show you a list of every item you have in your fridge and how much of that item you have left.

If any of your foods are completely used, we will let you know with a list of items to purchase at the store.

Here's an example of what you will see when you fridgecheck:
```
beer 0 cans
chicken breasts 30 containers
pizza 8 slices
lemons 100000 slices

The foods that you need to purhcase are:
beer
```


##Keeping track

###When you eat food
Make sure you keep track of what you use in your fridge, once you run out we will let you know what you need to purchase using the fridgecheck functionality.

Simply type into the console
```
node fridgeCheck.js consumed food amount
```
- "Food" being which item you want to change (e.g Ketchup)
- "Amount" being the amount you used (e.g 20)

###When you out food back in yo fridge!
But lets say you went out and got more food. Just add the amount back in! Using this simple code into the console
```
node fridgecheck.js add food amount
```
- "food" is the food item that already is in your fridge (e.g. ketchup)
- "amount" is the amount of the item you are putting in. (e.g. 20)

With Fridge Check you will always has a confirmation, when you put in or take out food from your fridge. We will let you know, here is an example:
```
You have 20 beer cans
```
