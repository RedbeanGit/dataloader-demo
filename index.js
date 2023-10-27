// Statement: Use Dataloader to batch requests

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const DataLoader = require("dataloader");

// Simulated database
const ingredients = [
  { id: 1, name: "Sugar" },
  { id: 2, name: "Flour" },
  { id: 3, name: "Egg" },
];

const recipes = [
  { id: 1, name: "Cake", ingredientIds: [1, 2, 3] },
  { id: 2, name: "Omelette", ingredientIds: [3] },
];

// Function to fetch an ingredient by ID
const getIngredientById = (id) => {
  console.log(`Loading ingredient ${id}`);
  return ingredients.find((ingredient) => ingredient.id === id);
};

// Function to fetch a recipe by ID
const getRecipeById = (id) => {
  return recipes.find((recipe) => recipe.id === id);
};

// Loader to batch requests for ingredients
const ingredientLoader = new DataLoader((ids) => {
  return Promise.resolve(ids.map((id) => getIngredientById(id)));
});

// Loader to batch requests for recipes
const recipeLoader = new DataLoader((ids) => {
  return Promise.resolve(ids.map((id) => getRecipeById(id)));
});

// GraphQL Schema
const IngredientType = new GraphQLObjectType({
  name: "Ingredient",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
});

const RecipeType = new GraphQLObjectType({
  name: "Recipe",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    ingredients: {
      type: new GraphQLList(IngredientType),
      resolve: (parent) =>
        parent.ingredientIds.map((id) => ingredientLoader.load(id)),
    },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    recipe: {
      type: RecipeType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => recipeLoader.load(args.id),
    },
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve: () => recipes,
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000/graphql");
});
