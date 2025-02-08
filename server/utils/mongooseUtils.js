import mongoose from "mongoose";

/**
 * This method is used to get the fields that accept array or multiple value as input, in a model dynamically.
 * @param models Module that accept input from user.
 * @returns {*[]} return array of strings, "name of the filed" in a database.
 */
const getArrayFields = (models) => {
    let whiteList = [];
    Object.values(models).forEach(model => {
        const schemaPaths = model.schema.paths;
        Object.entries(schemaPaths).forEach(([key, value]) => {
            if (value instanceof mongoose.Schema.Types.Array || value.instance === "Array" || value instanceof mongoose.Schema.Types.DocumentArray)
                whiteList.push(key);
        });
    });
    // Object.entries return an array where the first value is key, and the 2nd value is the value of the key.
    console.log(Object.entries({
        title: {
            type: String,
            required: [true, "Recipe name is required"],
            maxLength: [100, "Recipe name can't exceeds 100 character"], /*Indexes are used to improve query performance by allowing MongoDB to quickly locate documents without scanning the entire collection.
        What it does:
        An index is like a "table of contents" for your MongoDB collection.
        When you query a field with an index, MongoDB can quickly find the matching documents instead of scanning every document in the collection.*/
            trim: true,
            index: true,

        },
        name: "Tahir"
    }));
    return whiteList;
};

export {getArrayFields};