import { Op } from 'sequelize';
import { Animal, Human } from './model.js';

// Get the human with the primary key 2
export const query1 = async () => {
    
      const human = await Human.findOne({ 
        where: { human_id: 2 }, 
        attributes: ['human_id', 'fname', 'lname', 'email'] 
      });
      return human;
     
  };
    
// Get the first animal whose species is "fish"
export const query2 = async () => {
    const firstFish = await Animal.findOne({
      where: { species: 'fish' },
      include: [{ model: Human }] // We have to use "include" to get the human data from the Human model 
    });
  
    return firstFish;
  };

// Get all animals belonging to the human with primary key 5
export const query3 = async () => {
    const animalsThatBelongToFive = await Animal.findAll({
      include: [{
        model: Human,
        where: { human_id: 5 } // this "where" will filter by the primary key of the human (5)
      }]
    });
  
    return animalsThatBelongToFive;
  };

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = async () => {
    
      const animalsBornAfter2015 = await Animal.findAll({
        where: { birth_year: { [Op.gt]: 2015 } } // Op.gt is the "greater" operator, so this essentially says birth years greater than 2015.
      });
  
      
  
      return animalsBornAfter2015;
    
    
  };

// Get all the humans with first names that start with "J"
export const query5 = async () => {
    const humansWithJNames = await Human.findAll({
      where: { fname: { [Op.like]: 'J%' } }      // Op.like is the "like" operator, so this essentially says fnames that start with J. (The % in J% just fills in the rest of the string)
    });
  
    return humansWithJNames;
  };

// Get all the animals who don't have a birth year
export const query6 = async () => {
    const animalsWithoutBirthYear = await Animal.findAll({
      where: { birth_year: null } // Like before we are using where to specify where birth_year is null.
    });
  
    return animalsWithoutBirthYear;
  };

// Get all the animals with species "fish" OR "rabbit"
export const query7 = async () => {
    const fishOrRabbits = await Animal.findAll({
      where: { species: { [Op.or]: ['fish', 'rabbit'] } } // Op.or is the "or" operator, since we are finding all and specifying which species this will retrieve all the fish and rabbits.
    });
  
    return fishOrRabbits;
  };

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = async () => {
    const humansWithoutGmail = await Human.findAll({
      where: {
        email: {
          [Op.notLike]: '%gmail%' // Op.notLike is the "not like this" operator. This will filter what is introduced inside the %%. In this case it is all containing "gmail".
        }
      }
    });
  
    return humansWithoutGmail;
  };

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
    const humansWithAnimals = await Human.findAll({
        include: [{ model: Animal }]                                // "include" let's us use the other model. In this case we are beginning with a Human.findAll but then also include the animal model.
      });
      humansWithAnimals.forEach(human => {
        console.log(`Human: ${human.fname} ${human.lname}`);         // The forEach here is grabbing each human in the model and console logging their first name and last name. It is then also using the human model to get the animals of their corresponding human id. Then logging their name and species in a for each.
        human.Animals.forEach(animal => {
          console.log(`  - ${animal.name} (${animal.species})`);
        });
      });
    }

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
    const humansWithAnimals = await Human.findAll({
        include: [{
          model: Animal,
          where: { species: species }                                       // "include" let's us use the other model. In this case we are beginning with a Human.findAll but then also include the animal model.
        }]
      });
      const humansSet = new Set();
    humansWithAnimals.forEach(human => {
      humansSet.add(`${human.fname} ${human.lname}`);
    });

    return humansSet;

}
