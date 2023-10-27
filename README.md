# DataLoader Demo

This project is a simple demonstration of a GraphQL API that manages recipes and ingredients. It is designed to showcase how GraphQL can be speed up using DataLoader.

## Prerequisites

- Node.js installed
- npm or yarn installed

## Installation

1. Clone this repository or download the source code.

   ```bash
   git clone https://github.com/RedbeanGit/dataloader-demo.git
   ```

   Or download the code as a ZIP file and extract it.

2. Navigate to the project directory.

   ```bash
   cd dataloader-demo
   ```

3. Install the dependencies.

   ```bash
   npm install
   ```

## Usage

1. Start the GraphQL server.

   ```bash
   node index.js
   ```

2. Open your browser and navigate to `http://localhost:4000/graphql`.

3. Run GraphQL queries, for example:

   To fetch a specific recipe by its ID:

   ```graphql
   {
     recipe(id: 1) {
       id
       name
       ingredients {
         id
         name
       }
     }
   }
   ```

   To fetch all recipes and their ingredients:

   ```graphql
   {
     recipes {
       id
       name
       ingredients {
         id
         name
       }
     }
   }
   ```

## Author

Julien Dubois
