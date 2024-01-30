// ep 81
class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr

    }
    filter(){
        let queryString = JSON.stringify(this.queryStr)
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`) 
        const queryObj = JSON.parse(queryString)  
        console.log(queryObj) 
        this.query = this.query.find(queryObj);

        return this;
    }
    sort(){
        if(this.query.sort){ // SORTING LOGIC ep - 77
            const sortBy = req.query.sort.split(',').join(' ')
            // query = query.sort(req.query.sort); // ep - 77
            this.query = this.query.sort(sortBy); // ep - 77
        }
        else{
            this.query = this.query.sort('duration')
        }
        return this;
    }
    limit(){
        // LIMITTING FIELDS EP - 78
        if(this.query.fields){
            // query.select('name durationn price ratings')
            const fields = this.query.fields.split(',').join(' ')
            console.log(fields)
            this.query = this.query.select(fields)
        }else{
            this.query = this.query.select('-__v')
        }
        return this;
    }
    paginate(){
        // Pagination ep - 79
        const page = this.query.page ||1;
        const limit = this.query.limit*1 || 10;
        // in pager 1 : 1-10 page 2: 11-20 .....
        const skip = (page-1) * limit
        this.query = this.query.skip(skip).limit(limit);
        // if(this.query.page){
        //     const moviesCount =await Movie.countDocuments();
        //     if(skip >= moviesCount){
        //         throw new Error('This page is not found')
        //     }
        // }
        return this;
    }
}
module.exports = ApiFeatures