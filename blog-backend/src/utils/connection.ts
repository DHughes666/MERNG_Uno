import { connect } from "mongoose";

export const connectToDatabase = async() => {
    try {
        await connect(`mongodb+srv://lambeezra:${process.env.MONGODB_PASSWORD}@cluster0.dnh9ww4.mongodb.net/?retryWrites=true&w=majority`)
    } catch (e) {
        console.log(e);
        
    }
}