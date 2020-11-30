var json_tb = require('..');
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
var json_tb_out = new json_tb(test_json, 
    {
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
             , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
             , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
             , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
    })
//var json_tb_path = new json_tb(__dirname + '/sample.json');
