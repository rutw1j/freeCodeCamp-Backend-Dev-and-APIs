require('dotenv').config();
const express = require('express');


/* challenge-1 */
const mongoose = require('mongoose');
mongoose.connect(
  process.env['MONGO_URI'],
  { useNewUrlParser: true, useUnifiedTopology: true }
);
/* challenge-1 */


/* challenge-2 */
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema, 'Persons');
/* challenge-2 */


/* challenge-3 */
const createAndSavePerson = (done) => {
  let rutwij = new Person({ name: 'Rutwij', age: 21, favouriteFoods: ['Pizza', 'Fries'] });

  rutwij.save((err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};
/* challenge-3 */


/* challenge-4 */
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};
/* challenge-4 */


/* challenge-5 */
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};
/* challenge-5 */


/* challenge-6 */
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};
/* challenge-6 */


/* challenge-7 */
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};
/* challenge-7 */


/* challenge-8 */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) {
      return done(err);
    }

    // Add "hamburger" to the list of favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // Save the updated Person
    person.save((err, updatedPerson) => {
      if (err) {
        return done(err);
      }
      done(null, updatedPerson);
    });
  });
};
/* challenge-8 */


/* challenge-9 */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) {
        return done(err);
      }
      done(null, updatedPerson);
    }
  );
};
/* challenge-9 */


/* challenge-10 */
const removeById = (personId, done) => {
  Person.findOneAndRemove({ _id: personId }, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};
/* challenge-10 */


/* challenge-11 */
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};
/* challenge-11 */


/* challenge-12 */
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};
/* challenge-12 */


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
