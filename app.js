
(function () {
//  Set global variable constants
    const subBtn = document.getElementById('btn');
    const form = document.getElementById('dino-compare');
    const name =  document.getElementById('name');
    const height =
        {
        feet:  document.getElementById('feet'),
        inches: document.getElementById('inches')
        };
    const weight = document.getElementById('weight');
    const diet = document.getElementById('diet');
    const grid = document.getElementById('grid');

    subBtn.disabled = true;

    // convert feet to inches to compare height - 1 foot = 12 inches
    function convertFeetToInches(feet) {
        return feet * 12;
    }

    // Random number generator
    function randomNumber(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // Convert first letter to lower case
    function lowercaseFirstLetter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

    // 2. Create Dino Constructor/FactoryFunction
    function dinosaurFactory(species, weight, height, diet, where, when, fact) {
        /**
         * @description Factory function for creating an object that represents a dinosaur
         * @param species {string}: species of dinosaur
         * @param weight {number}: weight of the dinosaur
         * @param height {number}: height of the dinosaur
         * @param diet {string}: diet of the dinosaur; herbavor, carnivor, omnivor
         * @param where {string}: geographical location where the dinosaur was found/lived
         * @params when {string}: date the dinosaur would have lived
         * @params fact {string}: a fact about the dinosaur
         */

        return {
            species: species,
            weight: weight,
            height: height,
            diet: diet,
            where: {
                fact: where,
                message: 'The ' + species + ' could be found in ' + where
            },
            when: {
                fact: when,
                message: 'The ' + species + ' lived in the ' + when + ' period'
            },
            fact: fact,
            imageURL: 'images/' + lowercaseFirstLetter(species) + '.png',
            compareDiet: function(human){
                if (human.diet === this.diet) {
                    return 'Snap! You and the ' +  this.species + ' are both ' + this.diet + 's';
                } else {
                    return 'You and the ' + this.species + ' have different diets';
                }
            },
            compareWeight: function(human){
                if (human.weight === this.weight) {
                    return 'Snap! You weigh the same as the average ' + this.species;
                } else if (human.weight > this.weight) {
                    let factor = human.weight/this.weight;
                    return 'Wow! looks like you are ' + factor + ' times heavier than the average ' + this.species;
                } else {
                    let factor = this.weight/human.weight;
                    return 'Looks like you are ' + factor + ' times lighter than the average ' + this.species;
                }
            },
            compareHeight: function(human){
                let humanHeightFt = convertFeetToInches(human.height.feet) + human.height.inches;
                let heightDiff;

                if (humanHeightFt === height) {
                    return 'You are the same height as the average ' + this.species + '!';
                } else if (humanHeightFt < height) {
                    heightDiff = height - humanHeightFt;
                    return 'You are ' + heightDiff + ' inches smaller than the average ' + this.species;
                } else {
                    heightDiff = humanHeightFt - height;
                    return 'You are the ' +  heightDiff + ' inches taller than the average ' + this.species;
                }
            },
            generateRandomFact: function (human){
                let index = randomNumber(6);
                let fact;
                switch (index) {
                    case 0:
                        fact = this.compareWeight(human);
                        break;
                    case 1:
                        fact = this.compareHeight(human);
                        break;
                    case 2:
                        fact = this.compareDiet(human);
                        break;
                    case 3:
                        fact = this.where.message;
                        break;
                    case 4:
                        fact = this.when.message;
                        break;
                    case 5:
                        fact = this.fact;
                        break;
                }
                return fact;
            },
            createTile: function(human) {
                let tileHtml = `
                <div class="grid-item">
                 <h2>${this.species}</h2>
                 <img src="${this.imageURL}" alt="${this.species}">
                 <p>${this.generateRandomFact(human)}</p>
                </div>
                `;
                return tileHtml;
            }
        }
    }

    // 3. Create Human Constructor/FactoryFunction
    function humanFactory(name, heightFt, heightIn, weight, diet) {
        /**
         * @description Factory function for creating an object that represents a human
         * @param name {string}: name of human
         * @param height {number}: height of the human
         * @param weight {number}: weight of the dinosaur
         * @param diet {string}: diet of the human; herbavor, carnivor, omnivor
         */
        return {
            name: name,
            height: {
                feet: heightFt,
                inches: heightIn
            },
            weight: weight,
            diet: diet,
            image: 'images/human.png',
            createTile: function() {
                let tileHtml = `
                <div class="grid-item">
                 <h2>${this.name}</h2>
                 <img src="${this.image}" alt="An image of ${this.name}">
                </div>
                `;
                return tileHtml;
            }
        }
    }

    //    Remove form from screen
    //    Add click event listener to submit button to trigger event

    function checkFormValidation() {
        if (name.value && height.feet.value && height.inches.value && weight.value && diet.value) {
        subBtn.disabled = false
        }
    }

    form.onchange = function() {checkFormValidation()};

    subBtn.addEventListener('click', (e) => {
        e.preventDefault();
        form.classList.add('hide');
        const human = (function (name, heightFt, heightIn, weight, diet) {
            return humanFactory(name, heightFt, heightIn, weight, diet);
        })(name.value, height.feet.value, height.inches.value,  weight.value, diet.value);
        buildInfographic(human);
    });

    function createDinoList(data, human) {
        const dinoList = data['Dinos'].map(item => dinosaurFactory(item.species, item.weight, item.height,
            item.diet, item.where, item.when, item.fact).createTile(human));
        return dinoList;
    }

    function getDinos(callback) {
        fetch('dino.json')
            .then(response => response.json())
            .then(data => {
                callback(data);
            });
    }

    function buildInfographic(human) {
        let gridObjects = [];
        // get data from JSON
      getDinos((data) => {
          gridObjects = createDinoList(data, human);
          gridObjects.splice(4, 0, human.createTile());
          for (let i=0; i<9; i++) {
              grid.innerHTML += gridObjects[i];
          }
      });
    }

}());


    // Create Dino Constructor (done)


    // Create Dino Objects


    // Create Human Object(done)

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1 (done)
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 2 (done)
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 3 (done)
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array

        // Add tiles to DOM

    // Remove form from screen (done)


// On button click, prepare and display infographic
    // get data from JSON



