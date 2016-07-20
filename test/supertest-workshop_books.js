var request = require('supertest')
var request = request('https://www.googleapis.com/books/v1/volumes');
var bookname = 'cucumber'
var maxResults = 1



// Test Google Books API
describe('GOOGLE BOOKS API',function(){

    // Get book list that name includes "cucumber", return http status 200 - OK
    it('Get book list that name includes "cucumber", return http status 200 - OK', function(done){

        this.timeout(10000);

        request.get('?q='+bookname+'&maxResults='+maxResults)
            .expect(200)
            .end(function(err,res){


                console.log(res.body);

                //How to print the info under items?
                console.log(res.body.items.id);
                console.log(res.body.items.selfLink);

                console.log(err);

                done(err);

            })

    })

})