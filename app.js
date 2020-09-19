

(function () {
//    1. Set global variable constants

    const subBtn = document.getElementById('btn');
    const form = document.getElementById('dino-compare');


    // convert feet to inches to compare height - 1 foot = 12 inches

    function convertFeetToInches(feet) {
        return feet * 12;
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
            where: where,
            when: when,
            fact: fact,
            imageURL: `./images/${this.species}.png`,
            // write 3 comparison methods
            compareDiet: function(human){
                if (human.diet === this.diet) {
                    return `Snap! You and the ${this.species} are both ${this.diet}s `;
                } else {
                    return `You and the ${this.species} have different diets`;
                }
            },
            compareWeight: function(human){
                if (human.weight === this.weight) {
                    return `Snap! You weigh the same as the average ${this.species}`;
                } else if (human.weight > this.weight) {
                    let factor = human.weight/this.weight;
                    return `Wow! looks like you are ${factor} times heavier than the average ${this.species}`;
                } else {
                    let factor = this.weight/human.weight;
                    return `Looks like you are ${factor} times lighter than the average ${this.species}`;
                }

            },
            compareHeight: function(human){
                let humanHeightFt = convertFeetToInches(human.height.feet) + human.height.inches;
                let heightDiff;

                if (humanHeightFt === height) {
                    return `You are the same height as the average ${this.species}!`;
                } else if (humanHeightFt < height) {
                    heightDiff = height - humanHeightFt;
                    return `You are ${heightDiff} inches smaller than the average ${this.species}`;
                } else {
                    heightDiff = humanHeightFt - height;
                    return `You are the ${heightDiff} inches taller than the average ${this.species}`;
                }

            },
            generateRandomFact: function (){

                

            },


            createTile: function() {
                let tileHtml = `
                <div class="grid-item">
                 <h2>${this.species}</h2>
                 <img src="${this.imageURL}" alt="${this.species}">
                </div>
                `;
                return tileHtml;
            }

        }

    }

    // 3. Create Human Constructor/FactoryFunction

    function humanFactory(name, height, weight, diet) {
        /**
         * @description Factory function for creating an object that represents a human
         * @param name {string}: name of human
         * @param height {number}: height of the human
         * @param weight {number}: weight of the dinosaur
         * @param diet {string}: diet of the human; herbavor, carnivor, omnivor
         */
        return {
            name: name,
            height: height,
            weight: weight,
            diet: diet,
            image:  `./images/human.png`,
            createTile: function() {
                let tileHtml = `
                <div class="grid-item">
                 <h2>${this.name}</h2>
                 <img src="${this.imageURL}" alt="An image of ${this.name}">
                </div>
                `;
                return tileHtml;
            }
        }



    }






    //    Remove form from screen
    //    Add click event listener to submit button to trigger event
    subBtn.addEventListener('click', () => {
        form.classList.add('hide');
    });







}());


    // Create Dino Constructor


    // Create Dino Objects


    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array

        // Add tiles to DOM

    // Remove form from screen (done)


// On button click, prepare and display infographic
    // get data from JSON



