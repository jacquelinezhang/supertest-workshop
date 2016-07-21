var request = require('supertest')
var request = request('https://www.googleapis.com/books/v1/volumes');


// Test Google Books API
describe('GOOGLE BOOKS API - VOLUMES',function(){

    var bookname = 'cucumber'
    var maxResults = 2
    var id;

    // Get book list that name includes "cucumber", return http status 200 - OK
    it('Get book list that name includes "cucumber", return http status 200 - OK', function(done){

        this.timeout(10000);

        request.get('/')
            .query({
                q: bookname,
                maxResults: maxResults
            })
            .expect(200)
            .expect(function(res) {

                var length = res.body.items.length;
                length = maxResults;
                console.log(length);
////              res.body.name = res.body.name.toUpperCase();
            })
            .end(function(err,res){

               console.log(res.body.items[0].id);
               id = res.body.items[0].id;

//                console.log(err);

                done(err);

            })

    })

    // Get book list that name includes "cucumber", return http status 200 - OK
    it('Get book list that name includes "cucumber", return http status 200 - OK', function(done){

        this.timeout(10000);

        request.get('/')
            .query({
                q: bookname,
                maxResults: maxResults
            })
            .expect(200)
            .expect(function(res) {
                var length = res.body.items.length;
                length = maxResults;
                console.log(length);
////              res.body.name = res.body.name.toUpperCase();
            })
            .end(function(err,res){

               console.log(res.body.items[0].id);
               id = res.body.items[0].id;

//                console.log(err);

                done(err);

            })

    })


// Retrieve the id from last case, then use this id to get the book info

    it('Get the first book by id, return http status 200 - OK', function(done){

        this.timeout(10000);

        request.get('/' + id)
            .expect(200)
            .end(function(err,res){


//                console.log(res.body);
//                console.log(err);

                done(err);

            })

    })

})