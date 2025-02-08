import {json} from "express";

class ApiFeatures {

    /**
     * Creates an instance of APIFeatures.
     *
     * @param {Object} query - The MongoDB query object to be modified i.e. `Recipe.find()`.
     * @param {Object} queryString - The query string(object) parameters from the request i.e. `req.query`.
     *
     * @example
     * const features = new APIFeatures(Model.find(), req.query);
     */
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        /*
        * QueryString received look like: {limit: 5, sort : ratingAvg,price}
        * - filter all fields except 'gte, lte, gt, lt'
        * */
        const queryObj = {...this.queryString};
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach(obj => delete queryObj[obj]);

        let qStr = JSON.stringify(queryObj);
        qStr = qStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(qStr));
        // for method chaining, return this.
        return this;
    }

    sort() {
        // {sort=val1,val12..}
        if (this.queryString.sort) {
            let str = this.queryString.sort.split(",").join(" ");
            console.log(str);
            this.query = this.query.sort(str);
        } else {
            this.query = this.query.sort("-data_created");
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const str = this.queryString.split(",").join(" ");
            this.query = this.query.select(str);
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1; // converted to number
        const limit = this.queryString.limit || 30;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

}

export default ApiFeatures;