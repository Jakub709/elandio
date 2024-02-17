class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    // zde do tohoto query budu ukládat veškeré metody (filter atd.)
    this.queryString = queryString;
  }
  filter() {
    // a) Basic filtering (=)
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "fields", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // b) Advanced filtering (=)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      // potřebuji nahradit čárku mezerou:
      // 127.0.0.1:3000/api/v1/tours?sort=price,ratingsAverage
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
