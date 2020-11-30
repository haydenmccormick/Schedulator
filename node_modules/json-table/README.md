# json table

[![Build Status](https://travis-ci.org/DataGarage/node-json-table.png?branch=master)](https://travis-ci.org/DataGarage/node-json-table)

Json table is an easy way to preview your json data in table

## Install

Install via npm 

```
npm install json-table
```

## Include

```
var json_tb = require('json-table');
```


## Usage


```javascript
var json_tb_out = new json_tb('sample.json', {
  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
}, function(table) {
	table.show() // **have to call show() function to print out the table**
})
```
or
```javascript
var json_tb_out = new json_tb(<JSON object>, config, callback);
```

- Arguments:
	* **json file, or json object (json)** : the first argument can be a json file or a json object
	* **configure of the table (object)** : `optional` see detail in https://github.com/LearnBoost/cli-table 
	* **callback (function)** : callback function



## Example

Here is a sample json 

```json
[{
    
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
}
...
...

]
```

will convert into table like

![preview](https://raw2.github.com/DataGarage/node-json-table/master/sample/img/preview.png)


## License

MIT [@chilijung](http://github.com/chilijung)
