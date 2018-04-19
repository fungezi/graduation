// foo()
var a = true;
foo()
if(a){
    var foo = function() {
        console.log("a")
    }
}else{
    var foo = function () {
        console.log("b")
    }
}

