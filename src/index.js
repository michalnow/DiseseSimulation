import "./styles.css";

class Animal {
  constructor(age, phase, isResistant, breedPhase) {
    this.age = age;
    //phase = 0 - nie chory, 1 - chory bezobjawowy, 2 - chory objawowy
    this.phase = phase;
    this.isResistant = isResistant;
    //breedPhase = 0 - nie jest w ciazy ; 1 - jest, ale nie rodzi w tej turze; 2 - w biezacej turze rodzi
    this.breedPhase = breedPhase;
  }
}

function countSickByAge(age) {
  let count = 0;
  for (let i = 0; i < animals.length; i++) {
    if (animals[i] === age && animals[i].phase > 0) {
      count++;
    }
  }
  return count;
}

function countByAge(age) {
  let count = 0;
  for (let i = 0; i < animals.length; i++) {
    if (animals[i] === age) {
      count++;
    }
  }
  return count;
}

function breeding(chance) {
  let arr = [];
  for (let i = 0; i < animals.length; i++) {
    let animal = animals[i];

    if (
      animal.age >= 2 &&
      animal.age <= 4 &&
      Math.random() <= 0.17 &&
      animal.breedPhase === 2
    ) {
      //age, phase,  isResistant, breedPhase
      Math.random() <= chance
        ? arr.push(new Animal(1, 1, true, 0))
        : arr.push(new Animal(1, 0, false, 0));
    }

    if (
      animal.age >= 5 &&
      animal.age <= 6 &&
      Math.random() <= 0.11 &&
      animal.breedPhase === 2
    ) {
      //age, phase, isSick, isResistant,isBreeding, breedPhase
      Math.random() <= chance
        ? arr.push(new Animal(1, 1, true, 0))
        : arr.push(new Animal(1, 0, false, 0));
    }
  }
  return arr;
}

function sickDead() {
  let count = 0;
  for (let i = 0; i < animals.length; i++) {
    let animal = animals[i];
    let random = Math.random();
    if (
      animal.age <= 3 &&
      animal.phase > 0 &&
      random >= 0.15 &&
      random <= 0.25
    ) {
      animals.splice(i, 1);
      count++;
    }

    if (
      animal.age >= 4 &&
      animal.age <= 5 &&
      animal.phase > 0 &&
      random >= 0.23 &&
      random <= 0.37
    ) {
      animals.splice(i, 1);
      count++;
    }

    if (
      animal.age >= 4 &&
      animal.age <= 5 &&
      animal.phase > 0 &&
      random >= 0.23 &&
      random <= 0.37
    ) {
      animals.splice(i, 1);
      count++;
    }

    if (
      animal.age === 6 &&
      animal.phase > 0 &&
      random >= 0.35 &&
      random <= 0.65
    ) {
      animals.splice(i, 1);
      count++;
    }
  }

  return count;
}

function ageDeath() {
  let count = 0;
  for (let i = 0; i < animals.length; i++) {
    const animal = animals[i];
    const death = Math.random();
    if (animal.age === 7) {
      animals.splice(i, 1);
      count++;
    }
    if (animal.age >= 5 && death < 0.3) {
      animals.splice(i, 1);
      count++;
    }
  }
  return count;
}

function advanceBreeding() {
  let twoYearAnimalsOffspring = Math.floor(
    (animals.filter(animal => animal.age === 2).length *
      (Math.round(Math.random()) * (17 - 13) + 13)) /
      100
  );
  let threeYearAnimalsOffspring = Math.floor(
    (animals.filter(animal => animal.age === 3).length *
      (Math.round(Math.random()) * (17 - 13) + 13)) /
      100
  );
  let fourYearAnimalsOffspring = Math.floor(
    (animals.filter(animal => animal.age === 4).length *
      (Math.round(Math.random()) * (17 - 13) + 13)) /
      100
  );

  let fiveYearAnimalsOffSpring = Math.floor(
    (animals.filter(animal => animal.age === 5).length *
      (Math.round(Math.random()) * (11 - 9) + 9)) /
      100
  );
  let sixYearAnimalsOffspring = Math.floor(
    (animals.filter(animal => animal.age === 6).length *
      (Math.round(Math.random()) * (11 - 9) + 9)) /
      100
  );
  console.log(
    twoYearAnimalsOffspring,
    threeYearAnimalsOffspring,
    fourYearAnimalsOffspring,
    fiveYearAnimalsOffSpring,
    sixYearAnimalsOffspring
  );
  animals.forEach(animal => {
    if (animal.breedPhase !== 0) {
      if (animal.breedPhase === 1) {
        animal.breedPhase = 2;
      } else if (animal.breedPhase === 2) {
        animal.breedPhase = 0;
      }
    } else {
      if (animal.age === 2 && twoYearAnimalsOffspring !== 0) {
        animal.breedPhase = 1;
        twoYearAnimalsOffspring--;
      }
      if (animal.age === 3 && threeYearAnimalsOffspring !== 0) {
        animal.breedPhase = 1;
        threeYearAnimalsOffspring--;
      }
      if (animal.age === 4 && fourYearAnimalsOffspring !== 0) {
        animal.breedPhase = 1;
        fourYearAnimalsOffspring--;
      }
      if (animal.age === 5 && fiveYearAnimalsOffSpring !== 0) {
        animal.breedPhase = 1;
        fiveYearAnimalsOffSpring--;
      }
      if (animal.age === 6 && sixYearAnimalsOffspring !== 0) {
        animal.breedPhase = 1;
        sixYearAnimalsOffspring--;
      }
    }
  });
}

function updateAnimals() {
  animals.forEach(animal => {
    animal.age += 1;
    if (animal.phase === 1) {
      animal.phase = 2;
    } else if (animal.phase === 2) {
      animal.phase = 0;
      animal.isResistant = 0;
    }
  });
}

function timeTick(numberOfTicks) {
  let chance;

  for (let i = 0; i < numberOfTicks; i++) {
    chance = calculateChance();

    let breedingArr = breeding(chance);

    //aktualziacja danych odnośnie ciazy
    advanceBreeding();
    //symulacja zgonów wśród chorych
    let sickDeaths = sickDead();
    // zgony ze starosci
    let ageDeaths = ageDeath();
    updateAnimals();
    //let tmpArr = animals;
    for (let i = 0; i < breedingArr.length; i++) {
      animals.push(breedingArr[i]);
    }
    //animals.concat(breedingArr);

    console.log(
      "Tick number: " +
        i +
        ", number of animals: " +
        animals.length +
        "\nSick deaths " +
        sickDeaths +
        "\nAge deaths " +
        "" +
        ageDeaths +
        "\n New borns " +
        breedingArr.length
    );

    // tu wchodzi flow symulacji; kolejnosc do ustalenia
    // propozycja: obliczamy breed, zapisujemy go na boku
    // aktualizujemy breed dane w glownym arrayu (zeby ta propertka byla aktualna)
    // na zwierzetach wykonujemy funkcje od obliczenia % umierajacego i ze starosci
    // przeliczamy wiek, stan choroby itd.
    let div = document.getElementById("app");
    div.innerHTML +=
      "<p>Time = " +
      i +
      "</p>" +
      "<p>Number of animals: " +
      animals.length +
      "</p><p>Deaths due to sick: " +
      sickDeaths +
      "</p>" +
      "<p>Deaths due to age: " +
      ageDeaths +
      "</p>" +
      "<p>New Borns: " +
      breedingArr.length +
      "</p>" +
      "<p>####################</p>";

    console.log(JSON.stringify(animals));
  }
}

function calculateChance() {
  let chance = 0;
  for (let i = 0; i < animals.length; i++) {
    chance = 0;
    let animal = animals[i];
    if (animal.age >= 2) {
      chance = countSickByAge(animal.age) / countByAge(animal.age);
    }
  }
  return chance;
}

function initializeArray() {
  let count = 0;

  // Age 1 - not sick
  for (let i = 0; i < 80; i++) {
    if (count < 20) {
      //age, phase,  isResistant, breedPhase
      animals.push(new Animal(1, 0, true, 0));
    } else {
      //age, phase, isResistant, breedPhase
      animals.push(new Animal(1, 0, false, 0));
    }
    count++;
  }

  //sick
  count = 0;
  for (let i = 0; i < 20; i++) {
    if (count < 10) {
      animals.push(new Animal(1, 1, true, 0));
    } else {
      animals.push(new Animal(1, 2, true, 0));
    }
    count++;
  }

  // Age 2 - - not sick
  count = 0;
  for (let i = 0; i < 90; i++) {
    if (count < 30) {
      animals.push(new Animal(2, 0, false, 0));
    } else {
      animals.push(new Animal(2, 0, false, 0));
    }
    count++;
  }

  //sick
  count = 0;
  for (let i = 0; i < 30; i++) {
    if (count < 10) {
      animals.push(new Animal(2, 1, true, 0));
    } else {
      animals.push(new Animal(2, 2, true, 0));
    }
    count++;
  }

  // Age 3  - not sick
  count = 0;
  for (let i = 0; i < 80; i++) {
    if (count < 10) {
      animals.push(new Animal(3, 0, false, 0));
    } else {
      animals.push(new Animal(3, 0, false, 0));
    }
    count++;
  }

  //sick
  count = 0;
  for (let i = 0; i < 15; i++) {
    if (count < 10) {
      animals.push(new Animal(3, 1, true, 0));
    } else {
      animals.push(new Animal(3, 2, true, 0));
    }
    count++;
  }

  // Age 4 - not sick
  count = 0;
  for (let i = 0; i < 70; i++) {
    if (count < 10) {
      animals.push(new Animal(4, 0, false, 0));
    } else {
      animals.push(new Animal(4, 0, false, 0));
    }
    count++;
  }

  //sick
  count = 0;
  for (let i = 0; i < 15; i++) {
    if (count < 10) {
      animals.push(new Animal(4, 1, true, 0));
    } else {
      animals.push(new Animal(4, 2, true, 0));
    }
    count++;
  }

  // Age 5 - not sick
  count = 0;
  for (let i = 0; i < 40; i++) {
    if (count < 20) {
      animals.push(new Animal(5, 0, false, 0));
    } else {
      animals.push(new Animal(5, 0, false, 0));
    }
    count++;
  }

  //sick
  count = 0;
  for (let i = 0; i < 10; i++) {
    if (count < 7) {
      animals.push(new Animal(5, 1, true, 0));
    } else {
      animals.push(new Animal(5, 2, true, 0));
    }
    count++;
  }

  // Age 6 - not sick
  count = 0;
  for (let i = 0; i < 15; i++) {
    if (count < 5) {
      animals.push(new Animal(4, 0, false, 0));
    } else {
      animals.push(new Animal(4, 0, false, 0));
    }
    count++;
  }

  //sick
  count = 0;
  for (let i = 0; i < 10; i++) {
    if (count < 6) {
      animals.push(new Animal(4, 1, true, 0));
    } else {
      animals.push(new Animal(4, 2, true, 0));
    }
    count++;
  }

  // Age 7 - not sick
  count = 0;
  for (let i = 0; i < 10; i++) {
    animals.push(new Animal(7, 0, false, 0));
    count++;
  }

  //sick
  count = 0;
  for (let i = 0; i < 3; i++) {
    animals.push(new Animal(7, 2, true, 0));
    count++;
  }
}

const numberOfTicks = 10;
var animals = [];

function main() {
  initializeArray();
  timeTick(numberOfTicks);
}

main();
