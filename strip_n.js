var fs = require('fs');
var inputArray = fs.readFileSync('myphonenums.txt', (err)=> {
    if (err) throw err;

}).toString().split("\n");

let newArray = inputArray.map(el => el.replace(
    /\\n/g, " "
))
newArray.forEach(e=>{

    fs.appendFile('myphonenums_new.txt', e+'\n', function (err) {
        if (err) throw err;
        // console.log('Saved to file', {sixFig});
      })
})