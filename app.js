
(function () {

    // Set global variable constants
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

    // Disable form submission until all inputs have values
    subBtn.disabled = true;

    form.onchange = function() {checkFormValidation()};

    // Check form validation
    function checkFormValidation() {
        if (name.value && height.feet.value && height.inches.value && weight.value && diet.value) {
            subBtn.disabled = false
        }
    }

    // Convert feet to inches
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

    function dinosaurFactory(species, weight, height, diet, where, when, fact) {
        /**
         * @description factory function for creating an object that represents a dinosaur
         * @param species {string}: species of dinosaur
         * @param weight {number}: weight of the dinosaur
         * @param height {number}: height of the dinosaur
         * @param diet {string}: diet of the dinosaur; herbavor, carnivor, omnivor
         * @param where {string}: geographical location where the dinosaur was found/lived
         * @params when {string}: date the dinosaur would have lived
         * @params fact {string}: a fact about the dinosaur
         * @returns dinosaur object {object}: an object containing properties and methods for a dinosaur
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
                /**
                 * @description comparison function for comparing the diets of a dinosaur and a human
                 * @param human {object}: object representing a human with a diet property
                 * @returns diet comparison fact {string}
                 */
                if (human.diet === this.diet) {
                    return 'Snap! You and the ' +  this.species + ' are both ' + this.diet + 's';
                } else {
                    return 'You and the ' + this.species + ' have different diets';
                }
            },
            compareWeight: function(human){
                /**
                 * @description comparison function for comparing the weight of a dinosaur and a human
                 * @param human {object}: object representing the human with a weight property
                 * @returns weight comparison fact {string}
                 */
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
                /**
                 * @description comparison function for comparing the heights of a dinosaur and a human
                 * @param human {object}: object representing a human with a height property
                 * @returns height comparison fact {string}
                 */
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
                /**
                 * @description function for generating a random fact about a dinosaur
                 * @param human {object}: object representing a human with diet, weight and height properties
                 * @returns random fact about the dinosaur {string}
                 */
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
                /**
                 * @description function for creating a dinosaur tile
                 * @param human {object}: object representing a human
                 * @returns HTML element containing the dinosaur species, image and random fact
                 */
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

    // Create Human Constructor/FactoryFunction
    function humanFactory(name, heightFt, heightIn, weight, diet) {
        /**
         * @description Factory function for creating an object that represents a human
         * @param name {string}: name of human
         * @param height {number}: height of the human
         * @param weight {number}: weight of the dinosaur
         * @param diet {string}: diet of a human; herbavor, carnivor, omnivor
         * @returns human object {object}: an object containing properties and methods for a human
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
                /**
                 * @description function for creating a human tile
                 * @returns HTML element containing the human name and image
                 */
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

    // Add event listener to submission button
    subBtn.addEventListener('click', (e) => {
        e.preventDefault();
        form.classList.add('hide');
        // Use IIFE to get human data from form
        const human = (function (name, heightFt, heightIn, weight, diet) {
            return humanFactory(name, heightFt, heightIn, weight, diet);
        })(name.value, height.feet.value, height.inches.value,  weight.value, diet.value);
        buildInfographic(human);
    });

    function buildInfographic(human) {
        /**
         * @description function to build an infographic comparing a human and multiple dinosaur species
         * @param human {object}: object representing a human
         */
        let gridObjects = [];
        getDinos((data) => {
            gridObjects = createDinoList(data, human);
            gridObjects.splice(4, 0, human.createTile());
            for (let i=0; i<9; i++) {
                grid.innerHTML += gridObjects[i];
            }
        });
    }

    function createDinoList(data, human) {
        /**
         * @description function to create a list of dinosaur tiles
         * @param data {object}: object containing dinosaur data
         * @param human {object}: object representing a human
         * @returns dinoList {array}: an array of dinosaur tiles
         */
        const dinoList = data['Dinos'].map(item => dinosaurFactory(item.species, item.weight, item.height,
            item.diet, item.where, item.when, item.fact).createTile(human));
        return dinoList;
    }

    // Get data from JSON
    function getDinos(callback) {
        fetch('dino.json')
            .then(response => response.json())
            .then(data => {
                callback(data);
            });
    }

}());
