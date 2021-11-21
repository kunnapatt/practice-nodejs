const Product = require('../models/product');

const getAllProductsStatic = async(req, res) => {
    // throw new Error('testing async errors')
    const search = 'aaa'
        // const products = await Product.find({
        // featured: { $regex: search, $options: 'i' },
        // })

    const products = await Product.find({})
        .sort('name')
        .select('name price')

    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async(req, res) => {
    // console.log(req.query)
    console.log(req.query);
    const { featured, company, name, sort, fields, numbericFilters } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    // use when filter value on parameter
    if (numbericFilters) {
        const operatorMap = {
            '>': '$gt',
            '<': '$lt',
            '=': '$eq',
            '>=': '$gte',
            '<=': '$lte',
        };

        const regEx = /\b(<|>|>=|=|<|<=)\b/g

        let filters = numbericFilters.replace(regEx, (match) => {
            return `-${operatorMap[match]}-`
        })

        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, oper, value] = item.split("-");
            if (options.includes(field)) {
                queryObject[field] = {
                    [oper]: Number(value)
                }
            }
        })
    }

    console.log(queryObject);
    let results = Product.find(queryObject).sort(sort);
    // sort values
    if (sort) {
        // products = results.sort()
        const sortList = sort.split(',').join(' ');
        results = results.sort(sortList)
    } else {
        results = results.sort('createdAt')
    }

    if (fields) {
        const selectList = fields.split(',').join(' ');
        results = results.select(selectList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    results = results.skip(skip).limit(limit);
    const products = await results;
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}