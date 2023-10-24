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

let UsersList = [
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
        //to get user by id
        user: {
            type: UserType,
            args: {id: {type: GraphQLID } },
            resolve(parent, args) {
                return UsersList.find((user) => user.id === args.id);
            }
        }
    },
});

const mutations = new GraphQLObjectType({
    name: "mutations",
    fields: {
        // adding a user
        addUser: {
            type: UserType,
            args: {name: {type: GraphQLString}, email: {type: GraphQLString}},
            resolve(parent, {name, email}) {
                const newUser = {name, email, id:Date.now().toString()};
                UsersList.push(newUser);
                return newUser;
            }
        },

        updateUser: {
            type: UserType,
            args: {id: {type: GraphQLID}, 
            name: {type: GraphQLString}, 
            email: {type: GraphQLString}},
            resolve(parent, {id, name, email}) {
                const user = UsersList.find((user) => user.id === id);
                user.email = email;
                user.name = name;
                return user;
            },
        },

        deleteUser: {
            type: UserType,
            args: {
                id: {type: GraphQLID },
            },
            resolve(parent, {id}) {
                const user = UsersList.find((u) => u.id === id);
                UsersList = UsersList.filter((u)=> u.id !== id);
                return user;
            }
        }

    }
})

const schema = new GraphQLSchema({ query: RootQuery, mutation: mutations });

app.use("/graphql", graphqlHTTP({schema, graphiql: true}));





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
