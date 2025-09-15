function calculate() {

    // YOUR CODE GOES HERE
    let num1 = document.getElementById("number1");
    let num2 = document.getElementById("number2");
    num1 = parseInt(num1.value);
    num2 = parseInt(num2.value);
    // console.log(num1);
    // console.log(num2);

    let tally = 0;
    
    if (num1 < num2) {
        for (let i = num1; i <= num2; i++) {
            tally += i;
        }
    }
    else {
        for (let i = num2; i <= num1; i++) {
            tally += i;
        }
    }
    // console.log(tally);
    let res = document.getElementById("result");
    res.innerHTML = "<b>your number is " + tally + "</b>";

}