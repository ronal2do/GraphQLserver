# GraphQL DataLoader Boilerplate

[![CircleCI](https://circleci.com/gh/sibelius/graphql-dataloader-boilerplate.svg?style=svg)](https://circleci.com/gh/sibelius/graphql-dataloader-boilerplate)
[![codecov](https://codecov.io/gh/sibelius/graphql-dataloader-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/sibelius/graphql-dataloader-boilerplate)

Very simple boilerplate using GraphQL and DataLoader

## Blog Posts
* [How to implement viewerCanSee in  GraphQL](https://medium.com/@sibelius/how-to-implement-viewercansee-in-graphql-78cc48de7464#.d9vpk6fvx)
* [Testing a GraphQL Server using Jest](https://medium.com/@sibelius/testing-a-graphql-server-using-jest-4e00d0e4980e)

### Directory Structure

```
├── /data/                   # GraphQL generated schema
├── /repl/                   # Read-Eval-Print-Loop (REPL) configuration
├── /scripts/                # Generate GraphQL schema script
├── /src/                    # Source code of GraphQL Server
│   ├── /connection/         # Connections types (Relay)
│   ├── /interface/          # NodeInterface (Relay)
│   ├── /loader/             # Loaders of the models using DataLoader
│   ├── /model/              # Models definition (Mongoose, SQL, Google DataStore)
│   ├── /mutation/           # Mutations definition
├── /test/                   # Test helpers
```

## Command

#### Setup
```bash
npm install
```
#### Develop
```bash
npm run watch
```

#### Production
```bash
# first compile the code
npm run build

# run graphql compiled server
npm start
```

### Flow
```bash
npm run flow
```

Or
```bash
flow
```

### REPL server
```bash
npm run repl

awesome > M.User.find()
```

### Schema
Update your schema
```bash
npm run update-schema
```

Take a look on the [Schema](https://github.com/sibelius/graphql-dataloader-boilerplate/blob/master/data/schema.graphql)
