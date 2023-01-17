
const { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');
const { projects, clients } = require('./sampleData');
//Mongoose Models
const Project = require('../models/Project');
const Client = require('../models/Client');








const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});




const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        clientId: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            }
        },
    }),
});








const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            },
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id);
            },
        },
    },
});




//Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {






        //Add Client
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            }
        },







        //Delete Client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id);
            }
        },




        //Update Client
        updateClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Client.findByIdAndUpdate(args.id, { $set: { name: args.name, email: args.email, phone: args.phone, } }, { new: true });
            }
        },








        //Add Project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            NOT_STARTED: { value: 'Not Started' },
                            IN_PROGRESS: { value: 'In Progress' },
                            COMPLETED: { value: 'Completed' },
                            ON_HOLD: { value: 'On Hold' },
                            CANCELLED: { value: 'Cancelled' },
                        }

                    }),
                    defaultValue: 'Not Started'
                },




                clientId: { type: GraphQLNonNull(GraphQLID) },

            },
            resolve(parent, args) {
                let project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });
                return project.save();
            }

        },




        //Delete Project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },

            },
            resolve(parent, args) {
                return Project.findByIdAndRemove(args.id);
            }

        },





        //Update Project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'Status',
                        values: {
                            NOT_STARTED: { value: 'Not Started' },
                            IN_PROGRESS: { value: 'In Progress' },
                            COMPLETED: { value: 'Completed' },
                            ON_HOLD: { value: 'On Hold' },
                            CANCELLED: { value: 'Cancelled' },
                        }

                    }),
                },

            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(args.id, { $set: { name: args.name, description: args.description, status: args.status, clientId: args.clientId, } }, { new: true });
            }
   
   
},
                        








    },
});















module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});



// const MyGraphQLSchema = buildSchema(`
//     type Query {
//             hello: String
//              }
// `);


// module.exports = MyGraphQLSchema;