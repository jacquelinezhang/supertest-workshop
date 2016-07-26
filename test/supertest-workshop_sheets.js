var config = require('../config/host_config');
var url = config.host['sheets'];

var request = require('supertest')(url + '/spreadsheets');
var chai = require('chai');
var expect = require('chai').expect;

var spreadsheetId = '1gU8HQ72E7ECWqQYINSE2zhJlFiSpqMTVG3ShnzJQquE'
var accessToken = 'Bearer ya29.CjAsA4wPjOjKIuDbzyC99ALoR70RqSSXoq7M84nlQISmXey9txRmXsUH_xCMEukH-E8'

var sheetId;
var sheetName = 'juewen';


    var range = sheetName +'!A1:D4'
    var requestBody = {
                        "range": range,
                        "majorDimension": "ROWS",
                        "values": [
                          ["Item", "Cost", "Stocked", "Ship Date"],
                          ["Wheel", "$20.50", "4", "3/1/2016"],
                          ["Door", "$15", "2", "3/15/2016"],
                          ["Engine", "$100", "1", "30/20/2016"]
                        ]
                      }

describe('GOOGLE SHEETS API',function(){

    it('Add a new sheet', function(done){

        this.timeout(10000);

        var requestBody = {
                            "requests": [
                              {
                                "addSheet": {
                                  "properties": {
                                    "title": sheetName
                                  }
                                }
                              }
                            ]
                          }

        request.post('/' + spreadsheetId + ':batchUpdate')

        .set('Authorization', accessToken)
        .set('Content-Type', 'application/json')

        .send(requestBody)

        .expect(200)

        .expect(function(res){

            expect(res.body.spreadsheetId).to.equal(spreadsheetId);
            expect(res.body.replies[0].addSheet.properties.title).to.equal(sheetName);


        })

        .end(function(err, res){

            sheetId = res.body.replies[0].addSheet.properties.sheetId;
            done(err);

        })

    })


    it('Write to multiple ranges', function(done){
        this.timeout(10000);

        var requestBody = {
                            "valueInputOption": "USER_ENTERED",
                            "data": [
                              {
                                "range": sheetName + "!A1:A4",
                                "majorDimension": "COLUMNS",
                                "values": [
                                  ["AAAItem", "BBBWheel", "Door", "Engine"]
                                ]
                              },
                              {
                                "range": sheetName + "!B1:D2",
                                "majorDimension": "ROWS",
                                "values": [
                                  ["Cost", "Stocked", "Ship Date"],
                                  ["$20.50", "400", "3/1/2016"]
                                ]
                              }
                            ]
                          }

        request.post('/'+ spreadsheetId +'/values:batchUpdate')

        .set('Authorization', accessToken)
        .set('Content-Type', 'application/json')

        .send(requestBody)

        .expect(200)
        .expect(function(res){

            expect(res.body.spreadsheetId).to.equal(spreadsheetId)
            expect(res.body.responses.length).to.equal(2)

            for (var i=0; i<res.body.responses.length; i++)
            {

                expect(res.body.responses[i].updatedRange).to.contain(sheetName);

            }



        })

        .end(function(err,res){

            done(err);

        })

    })

    it('Write a single range', function(done){

        this.timeout(10000);

        request.put('/'+spreadsheetId+'/values/'+range)
            .query({
                valueInputOption:'USER_ENTERED'
            })

            .set('Authorization', accessToken)
            .set('Content-Type', 'application/json')
            .send(requestBody)
            .expect(200)

            .expect(function(res){

                expect(res.body.spreadsheetId).to.equal(spreadsheetId)
                expect(res.body.updatedRange).to.equal(range)


            })

            .end(function(err,res){

                done(err);
                return range;
                return requestBody;
            })

    })

    it('Read a single range', function(done){
        this.timeout(20000);

        request.get('/'+spreadsheetId+'/values/'+range)


            .set('Authorization', accessToken)

            .expect(200)

            .expect(function(res){


                expect(res.body).to.deep.equal(requestBody);

            })


            .end(function(err, res){

                done(err);

            })


    })



    it('Delete a sheet', function(done){

        this.timeout(20000)
//        console.log(sheetId)

        var requestBody = {
                            "requests": [
                              {
                                "deleteSheet": {
                                  "sheetId": sheetId
                                }
                              }
                            ]
                          }

        request.post('/' + spreadsheetId + ':batchUpdate')

        .set('Authorization', accessToken)
        .set('Content-Type', 'application/json')

        .send(requestBody)

        .expect(200)

        .expect(function(res){

            expect(res.body.spreadsheetId).to.equal(spreadsheetId);

        })

        .end(function(err,res){

//            console.log(res.body);
            done(err);

        })

    })

})