import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
    MenuItems: [
        {
            MenuItemId: {
                type: Schema.Types.ObjectId,
                ref: "Menu",
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
});

export const Order = mongoose.model("Order", orderSchema);