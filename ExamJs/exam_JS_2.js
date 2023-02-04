//2.	EXAM Create a solution that will tell us what poker set we have. The solution is to deal us 5 cards from the standard 52 card deck at random. Based on cards on our hand the program should tell us what is the best poker set.

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function createDeck() {
	let cardsNumbers = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
	let cardsSuites = ['Pik', 'Karo', 'Trefl', 'Kier'];
	let deck = [];
	for (let i = 0; i < cardsNumbers.length; i++) {
		for (let j = 0; j < cardsSuites.length; j++) {
			let card = {
				cardNumber: cardsNumbers[i],
				cardSuite: cardsSuites[j],
			};
			deck.push(card);
		}
	}
	return deck;
}

function dealCardsToHand(deck) {
	let myCards = [];
	for (let i = 0; i < 5; i++) {
		let randomElement = getRandomInt(deck.length);
		myCards.push(deck[randomElement]);
		deck.splice(randomElement, 1);
	}
	return myCards.sort((a, b) => a.cardNumber - b.cardNumber);
}

function checkSameColors(myCards) {
	let temp = myCards[0].cardSuite;
	for (let i = 0; i < myCards.length; i++) {
		if (myCards[i].cardSuite != temp) {
			return false;
		}
	}
	return true;
}

function checkCorrectOrder(myCards) {
	for (let i = 0; i < myCards.length - 1; i++) {
		if (myCards[i].cardNumber != myCards[i + 1].cardNumber - 1) {
			return false;
		}
	}
	return true;
}

function checkSameCardsNumbers(myCards) {
	let temp = myCards[0].cardNumber;
	let sumSameCardsArray = [];
	let sumSameCards = 1;
	for (let i = 1; i < myCards.length; i++) {
		if (myCards[i].cardNumber === temp) {
			sumSameCards++;
		} else {
			//jeżeli karty są różne to temp jest zmieniany
			temp = myCards[i].cardNumber;
			sumSameCardsArray.push(sumSameCards);
			sumSameCards = 1;
		}
	}
	//ostatni element jest dodawany bo nie ma z czym porównać
	sumSameCardsArray.push(sumSameCards);

	let maxSameCards = Math.max(...sumSameCardsArray);
	if (maxSameCards === 1) {
		return 1;
	} else if (maxSameCards === 2) {
		let count = 0;
		// sprawdzenie czy dwie pary
		for (let i = 0; i < sumSameCardsArray.length; i++) {
			if (maxSameCards === sumSameCardsArray[i]) {
				count++;
			}
		}
		if (count === 2) {
			//dwie pary
			return 2.2;
		} else {
			//para
			return 2;
		}
	} else if (maxSameCards === 3) {
		//sprawdza czy jest jeszcze para poza trójką
		for (let i = 0; i < sumSameCardsArray.length; i++) {
			if (maxSameCards === sumSameCardsArray[i] - 1) {
				return 3.2;
			}
		}
		return 3;
	} else {
		return 4;
	}
}
function returnBestPokerHand() {
	let deck = createDeck();
	let hand = dealCardsToHand(deck);
	let isSameColor = checkSameColors(hand);
	let isCorrectOrder = checkCorrectOrder(hand);
	let sameCards = checkSameCardsNumbers(hand);
	console.log(hand);
	if (isSameColor === true && isCorrectOrder === true) {
		//sprawdza czy ostatnia karta to as
		if (hand[hand.length].card === 14) {
			return 'Royal flush';
		}
		return 'Straight flush';
	}
	if (sameCards === 4) {
		return 'Quads';
	}
	if (sameCards === 3.2) {
		return 'Full house';
	}
	if (isSameColor) {
		return 'Flush';
	}
	if (isCorrectOrder) {
		return 'Straight';
	}
	if (sameCards === 3) {
		return 'Three of a kind';
	}
	if (sameCards === 2.2) {
		return 'Two pair';
	}
	if (sameCards === 2) {
		return 'Pair';
	}
	if (sameCards === 1) {
		return 'High card';
	}
	return 'error';
}

for (let i = 0; i < 10; i++) {
	console.log(returnBestPokerHand());
}
console.log('_');
