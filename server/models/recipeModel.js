import mongoose from "mongoose";
import validator from "validator";


const schemaOptions = {
    timestamps: {createdAt: "data_created", updatedAt: "date_updated"},
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    optimisticConcurrency: true, // handle concurrent update.
    /*
     * 1. Version Key (versionKey)
     *   The versionKey is a feature in Mongoose that helps with optimistic concurrency control. It ensures that updates to a document don't overwrite changes made by another process.
     *       What it does:
     *           Mongoose automatically adds a __v field (by default) to every document.
     *           This field is a number that increments every time the document is updated.
     *           If two processes try to update the same document simultaneously, Mongoose will detect the version mismatch and throw a VersionError.
     *           Prevents race conditions where two users might overwrite each other's changes.
     *       What to place in the field?
     *           You don't need to manually set this field. Mongoose automatically manages it for you.
     *           It starts at 0 and increments by 1 on every update.
     */
    versionKey: "version"
};

const recipeSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: [true, "recipe description is required."],
        trim: true,
        maxLength: [2000, "Description can't exceeds 2000 characters"]
    },
    ingredients: {
        type: [
            {
                name: {
                    type: String,
                    required: [true, "Ingredient name is required"],
                    trim: true,
                    maxLength: [100, "Ingredient name can't exceed 100 characters."]
                },
                quantity: {
                    value: {type: Number, required: true, min: 0},
                    units: {
                        type: String,
                        enum: {
                            values: ["g", "kg", "ml", "l", "cup", "tbsp", "item"],
                            message: "{VALUE} is not allowed"
                        },
                        validate: {
                            validator: function (value) {
                                return this.value > 0 ? !!value : true; // Require units only if value > 0
                            },
                            message: "Units are required when value is greater than 0"
                        }
                    }
                }

            }
        ],
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: "At least one ingredient is required"
        },
        required: [true, "Ingredients are required to make a recipe."],
        _id: false
    },
    instructions: {
        type: [
            {
                step: {type: Number, required: true},
                content: {
                    type: String,
                    required: true,
                    maxLength: [1000, "Instruction step can't exceeds 1000 characters"]
                }
            }
        ],
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: "At least one instruction is required"
        },
        required: [true, "instruction is required for recipe."],
        _id: false
    },
    prep_time: {
        type: Number,
        required: true,
        min: [0, "prep_time should be positive and grater than 0"],

    },
    cook_time: {
        type: Number,
        required: true,
        min: [0, "cook_time should be positive and grater than 0"],
    },
    servings: {
        type: Number,
        required: true,
        min: [1, "Servings must be at least 1"],
    },
    category: {
        type: String,
        enum: {
            values: ["appetizer", "main", "dessert", "beverage", "salad", "soup", "breakfast"],
            message: "{VALUE} is not allowed"
        },
        index: true // so we can query by category faster.
    },
    cuisine: {
        type: String,
        enum: {
            values: ["italian", "mexican", "asian", "mediterranean", "american", "halal"],
            message: "{VALUE} is not allowed"
        },
        index: true
    },
    image_url: {
        type: String,
        validate: [validator.isURL, "Please provide correct image URL"]
    },
    video_url: {
        type: String,
        validate: [validator.isURL, "Please provide correct video URL"]
    },
    difficulty: {
        type: String,
        enum: {
            values: ["easy", "medium", "hard"],
            message: "{VALUE} is invalid "
        },
        required: true
    },
    nutrition: {
        type: {
            calories: {type: Number, min: 0},
            protein: {type: Number, min: 0},
            crabs: {type: Number, min: 0},
            fat: {type: Number, min: 0},
        },
        _id: false
    },
    dietary_info: [
        {
            type: String,
            enum: ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "halal", "kosher",],
        }
    ],
    author: {
        // type: mongoose.Schema.ObjectId,
        type: mongoose.Schema.Types.ObjectId, // exact same as the above but modern.
        ref: "User",
        required: [true, "Recipe must have author"],
        index: true
    },
    source_url: {
        type: String,
        validate: [validator.isURL, "Please provide correct source URL"]
    },
    // date_created: {
    //     type: Date, default: Date.now, select: false
    // },
    // date_updated: Date, // set up in the schemaOption so that the createAt filed and updateAt filed will be replaced by our provided name there.
    tags: {
        type: [
            {
                type: String,
                lowercase: true,
                maxLength: [20, "Tag cannot exceed 20 characters"],
            }
        ],
        validate: [(value) => value.length <= 10, "can't have more than 10 tags"],
        _id: false
    },
    rating: {
        average: {
            type: Number, min: 0, max: 10, default: 0
        },
        count: {type: Number, min: 0, default: 0}
    },
}, schemaOptions);


recipeSchema.virtual("total_time").get(function () {
    return this.prep_time + this.cook_time;
});

/**
 * As we've indexed certain field so when we query like model.find({category: "halal"}); then it looks for that index, but let's say that we want to find the docs with specific text lie "pizza" we can do the same
 * but since we want to look for "pizza" in title description or any other field then it's will be very slow, so to fix that we can create a text index so when we do the same sing mongo operator $text or $search
 * then mongo will look form them in the text index making our query a hell lot faster.
 * - schema.index({title: "text"}) -> make text-based index for title.
 * - schema.index({"indigent.calories": 1}) -> single field index for the filed calories inside ingredient and "1" means that arrange the index in ascending order and -1 mean descending order.
 */
recipeSchema.index({title: "text", description: "text"});
recipeSchema.index({"nutrition.calories": 1});


// the name of the collection is created by the pluralizing and converting model name to lowercase.


recipeSchema.pre(/^find/, function (next) {
    this.find({}).select("-version");
    next();
});


const RecipeModel = mongoose.model("Recipe", recipeSchema);
export default RecipeModel;