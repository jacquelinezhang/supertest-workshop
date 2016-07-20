var request = require('supertest')
var request = request('https://www.googleapis.com/books/v1/volumes?q=cucumber');

describe('GOOGLE SHEETS API',function(){

    it('BOOKS API Get all book list - return 200', function(done){

        this.timeout(10000);

        request.put('/')
            .expect(200)
            .end(function(err,res){

                console.log(res);
                console.log(err);
                done(err);
            })

    })

})