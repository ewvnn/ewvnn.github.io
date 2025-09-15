// Task 1
// Add an event listner to the button (the user drags his mouse over the button)
myButton = document.getElementById('justin-btn');

myButton.addEventListener('mouseover', function() {
    res = document.getElementById('result');
    res.innerText = "Welcome to my Heart";
    res.style.backgroundColor = 'pink';
    res.style.color = 'blue';
});
myButton.addEventListener('mouseout', function() {
    res = document.getElementById('result');
    res.innerText = "Dont leave my heart";
    res.style.backgroundColor = 'black';
    res.style.color = 'red';
});

// Task 2
// Add an event listner to the button (the user drags his mouse out of the button)
