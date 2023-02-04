//1.	EXAM Scale riddle. With 8 balls, ex.  [1,2,1,1,1,1,1,1] get position of the “heavy” ball. Indexes are to be chosen at random. Use weights comparison only two times.

let inputArray = [1, 2, 1, 1, 1, 1, 1, 1];
//funkcja zwraca losąwą liczbę w przedziale min - max
function getRandomNumberInRange(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

//bierze tablicę i ustawia ją w losowej kolejności
function randomizeIndexes(inputArray) {
	//tablica pomocnicza z wagą i indexami poszczególnych kul
	let inputArrayWithIndexes = [];
	//tablica z wagami i indexami kul tylko w losowej kolejności
	let randomizedArray = [];
	//tworzenie tablicy inputArrayWithIndexes
	for (let i = 0; i < inputArray.length; i++) {
		inputArrayWithIndexes.push([inputArray[i], i]);
	}
	// losowa liczba w przediale 0 - długości tablicy
	let randomIndex = getRandomNumberInRange(0, inputArrayWithIndexes.length);
	// tworzenie tablicy w losowej kolejności
	for (let i = 0; i < inputArray.length; i++) {
		//wstawienie losowej kuli do nowej tablicy
		randomizedArray.push(inputArrayWithIndexes.splice(randomIndex, 1)[0]);
		//kolejna losowa liczba
		randomIndex = getRandomNumberInRange(0, inputArrayWithIndexes.length - 1);
	}
	return randomizedArray;
}

// sumuje wagę kul z tablicy
function sumBalls(array) {
	let sum = 0;
	array.forEach((element) => {
		sum += element[0];
	});
	return sum;
}

function ScaleRiddle(array) {
	//dzielenie na 3 tablicę, 2 tablicę po 3 elementy i 1 tablicę z 2 elementami
	let ballsArray1 = array.slice(0, 3);
	let ballsArray2 = array.slice(3, 6);
	let ballsArray3 = array.slice(6);
	//sumowanie tablic
	let sumBallsArray1 = sumBalls(ballsArray1);
	let sumBallsArray2 = sumBalls(ballsArray2);

	//pierwsze ważenie
	if (sumBallsArray1 < sumBallsArray2) {
		//drugie ważenie
		if (ballsArray2[0][0] > ballsArray2[1][0]) {
			return ballsArray2[0][1];
		} else if (ballsArray2[0][0] < ballsArray2[1][0]) {
			return ballsArray2[1][1];
		} else {
			return ballsArray2[2][1];
		}
	}
	//pierwsze ważenie
	else if (sumBallsArray1 > sumBallsArray2) {
		//drugie ważenie
		if (ballsArray1[0][0] > ballsArray1[1][0]) {
			return ballsArray1[0][1];
		} else if (ballsArray1[0][0] < ballsArray1[1][0]) {
			return ballsArray1[1][1];
		} else {
			return ballsArray1[2][1];
		}
	}
	//pierwsze ważenie
	else {
		//drugie ważenie
		if (ballsArray3[0][0] > ballsArray3[1][0]) {
			return ballsArray3[0][1];
		} else {
			return ballsArray3[1][1];
		}
	}
}

console.log('Array in random order: ' + randomizeIndexes(inputArray));
console.log(ScaleRiddle(randomizeIndexes(inputArray)));
