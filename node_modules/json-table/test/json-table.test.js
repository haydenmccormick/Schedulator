var json_tb = require('..');
var should = require('should');
var test_json = [{

    "Format": "0",
    "Valuie": "12345.6789",
    "B Fmt": "General",
    "VBA Fmt": "",
    "Fmt": "",
    "Macro": ""
}, {

    "Format": "1",
    "Valuie": "12346",
    "B Fmt": "0",
    "VBA Fmt": "12346",
    "Fmt": "0",
    "Macro": "12346"
}, {

    "Format": "2",
    "Valuie": "12345.68",
    "B Fmt": "0.00",
    "VBA Fmt": "12345.68",
    "Fmt": "0.00",
    "Macro": "12345.68"
}]

var test_obj = {

    "Format": "2",
    "Valuie": "12345.68",
    "B Fmt": "0.00",
    "VBA Fmt": "12345.68",
    "Fmt": "0.00",
    "Macro": "12345.68"
};


describe('check if the table is generated (input json object)', function() {

    it('should be a object (with settings)', function() {
        var json_tb_out = new json_tb(test_json, 
        {
                chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                 , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                 , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                 , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
        }, function(json_tb) {
             json_tb.should.be.instanceOf(Object)
             json_tb.table.should.be.instanceOf(Object)
        })
           
    })

    it('should be a object (without settings)', function() {
        var json_tb_out = new json_tb(test_json, function(json_tb) {
             json_tb.should.be.instanceOf(Object)
             json_tb.table.should.be.instanceOf(Object)
        })
           
    })

})

describe('check if passing an array will work', function() {
    it('should return a object (with settings)', function() {
        var json_tb_obj = new json_tb(test_obj, 
        {
                chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                 , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                 , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                 , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
        }, function(json_tb) {
             json_tb.should.be.instanceOf(Object)
             json_tb.table.should.be.instanceOf(Object)
       })
    })

    it('should be a object (without settings)', function() {
        var json_tb_out = new json_tb(test_obj, function(json_tb) {
             json_tb.should.be.instanceOf(Object)
             json_tb.table.should.be.instanceOf(Object)
        })
           
    })
})

describe('check if the table is generated (input file)', function() {
    it('should be a object (with settings)', function() {
        var json_tb_out = new json_tb('./sample/sample.json', 
        {
                chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                 , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                 , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                 , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
        }, function(json_tb) {
             json_tb.should.be.instanceOf(Object)
             json_tb.table.should.be.instanceOf(Object)
        })
    })

    it('should be a object (without settings)', function() {
        var json_tb_out = new json_tb('./sample/sample.json', function(json_tb) {
             json_tb.should.be.instanceOf(Object)
             json_tb.table.should.be.instanceOf(Object)
        })
           
    })
})