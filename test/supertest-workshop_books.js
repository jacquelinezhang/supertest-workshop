var request = require('supertest')('https://www.googleapis.com/books/v1/volumes');
var chai = require('chai');
var expect = require('chai').expect;


// Test Google Books API
describe('GOOGLE BOOKS API - VOLUMES',function(){

    var id;

    // Get book list that name includes "test", return http status 200 - OK
    it('Get book list that name includes "test", return http status 200 - OK', function(done){
        request.get('/?q=test')

            .expect(200)

            .end(function(err,res){

//                console.log(res);
                done(err);

            })

    })



    // Get book list that name includes "cucumber", return http status 200 - OK
    it('Get book list that name includes "cucumber", return http status 200 - OK', function(done){

        var bookname = 'cucumber'
        var maxResults = 1

        this.timeout(10000);

        request.get('/')

            .query({
                q: bookname,
                maxResults: maxResults
            })

            .expect(200)

            .expect(function(res) {

                expect(res.body.items[0].volumeInfo.title.toLowerCase()).to.contain(bookname);
                expect(res.body.items.length).be.at.most(maxResults);
//                expect(res.body.items[0].id).to.includes(res.body.items[0].selfLink);
                expect(res.body).to.have.any.keys('kind', 'totalItems', 'items');
                expect(res.body).to.include.keys('kind', 'totalItems', 'items');

            })

            .end(function(err,res){

               id = res.body.items[0].id;

               done(err);

            })

    })


    // Retrieve the id from last case, then use this id to get the book info
    it('Get the first book by id, return http status 200 - OK', function(done){

        this.timeout(10000);

        request.get('/' + id)
            .expect(200)

            .expect(function(res){

                expect(res.body.id).to.equal(id)

            })

            .end(function(err,res){

//                console.log(res.body);
//                console.log(err);

                done(err);

            })

    })

})