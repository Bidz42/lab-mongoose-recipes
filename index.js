const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Bidz' Burger",
      level: "UltraPro Chef",
      ingredients: ["Mince Meat", "Bun", "Cheese", "Seasoning"],
      cuisine: "Unique",
      dishType: "main_course",
      image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F09%2Fhatch-chile-smash-burgers-FT-seo-RECIPE0719_0.jpg",
      duration: 15,
      creator: "Bidz",
      created: "01/01/0001"
    });
  })
  .then (() => {
    return Recipe.insertMany(data)
  })
  .then (() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, {new: true})
  })
  .then (() => {
  return Recipe.deleteOne({ title: "Carrot Cake" }, {new: true})
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

setTimeout(() => {mongoose.disconnect()}, 1500);
