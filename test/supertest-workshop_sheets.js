var request = require('supertest')

var spreadsheetId = '1oWJuCpcrZEvi-rlnWqvl3bc1PTSbOw40NXbDp6kKWE4'
var range = 'Sheet1!A1:D5'
var request = request('https://sheets.googleapis.com/v4/spreadsheets/'+spreadsheetId+'/values/'+range);
var accessToken = 'Bearer ya29.Ci8mA1FqoJcLtCKxwa0BoVyS6yCga74O3Se7D0FBXYUd9EbTrIDo9qdq5lFNo3Pt3Q'

var requestBody = {
                     "range": "Sheet1!A1:D5",
                     "majorDimension": "ROWS",
                     "values": [
                       ["Item", "Cost", "Stocked", "Ship Date"],
                       ["Wheel", "$20.50", "4", "3/1/2016"],
                       ["Door", "$15", "2", "3/15/2016"],
                       ["Engine", "$100", "1", "30/20/2016"],
                       ["Totals", "=SUM(B2:B4)", "=SUM(C2:C4)", "=MAX(D2:D4)"]
                     ]
                   }

describe('GOOGLE SHEETS API',function(){

    it('PUT a line to goole sheet - return 200', function(done){

        this.timeout(10000);

        request.put('?valueInputOption=USER_ENTERED')
            .set('Authorization', accessToken)
            .set('Content-Type', 'application/json')
            .send(requestBody)
            .expect(200)

            .end(function(err,res){

                console.log(res);
                console.log(err);
                done(err);
            })

    })

})