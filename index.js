const express = require('express');

const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList, 
    GraphQLSchema
 } = require('graphql');


const app = express();

const UsersList = [
    {id: '1', name: 'John', email: 'john@example.com'},
    {id: '2', name: 'Michael', email: 'michael@example.com'},
    {id: '3', name: 'Bose', email: 'bose@example'},
]

const UserType = new GraphQLObjectType({
    name: "UserType",
        fields: () => ({
            id: {type: GraphQLID },
            name: {type: GraphQLString},
            email: {type: GraphQLString},
        }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        // to get all users
        users:{
            type: new GraphQLList(UserType),
            resolve() {
                return UsersList;
            },
            
        },
    },
});

const schema = new GraphQLSchema({ query: RootQuery });

app.use("/graphql", graphqlHTTP({schema, graphiql: true}));





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
