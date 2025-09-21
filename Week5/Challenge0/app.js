/* Task 6 - API call */
function get_all_drinks() {
    console.log("[START] get_all_drinks()");

    // const api_endpoint_url = 'drinks.json'; // local file
    const api_endpoint_url = 'http://localhost/is216/Week5/InClass/DrinksAPI/api/drink/read.php'; // external API

    axios.get(api_endpoint_url).
    then(response => {
        console.log("Axios call completed successfully!");

        // console.log(response.data.records);

        
        let section_results = document.getElementById('results');

        // Build a string of Bootstrap cards
        let result_str = ``;
        let drinks_array = response.data.records; // Array of drink objects
        // console.log(drinks_array); // Array of drink objects

        /*
        Loop through each array (using bootstrap)


        */

        // Task 4 - Display Drinks
        //   Each drink is a Bootstrap card
        // Replace all the hard-coded strings with actual values as read from the JSON file
        for(let drink of drinks_array) { // drink is an object

            // console.log(drink);

            result_str += `
                <div class="col">
                    <div class="card h-100">
                        <img src="http://localhost/is216/week5/InClass/DrinksAPI/${drink.photo_url}" 
                             class="card-img-top"
                             alt="${drink.name}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${drink.name}
                            </h5>
                            <p class="card-text small text-muted mb-0">
                                ${drink.category} • ${drink.alcoholic}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }
        // console.log(result_str);

        // Inject the cards into the #results section
        section_results.innerHTML = result_str;
    }).
    catch(error => {
        console.log(error.message);

        // Task 5 - Data can't be loaded, display alert
        //   "Failed to load drinks data."
        // YOUR CODE GOES HERE
        let alert_str = `
        <div class="alert alert-danger" role="alert">
            Failed to load drinks data.
        </div>
        `;
        document.getElementById('alerts').innerHTML = alert_str;
    });

    console.log("[END] get_all_drinks()");
}


/* Task 7 - Category Dropdown Menu */
function populate_category_dropdown() {
    console.log("[START] populate_category_dropdown()");

    const api_endpoint_url = 'http://localhost/is216/Week5/InClass/DrinksAPI/api/drink/category.php'; // API endpoint

    axios.get(api_endpoint_url).
    then(response => {

        console.log("Axios call completed successfully!");

        // YOUR CODE GOES HERE
        

        let category_tag = document.getElementById('category');
        
        let categories = response.data.records;

        for (category of categories) {
            let option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            category_tag.appendChild(option);
        }



    }).
    catch(error => {
        console.log(error.message);
    });

    console.log("[END] populate_category_dropdown()");
}


/* Task 8 - Category Dropdown Event Listener */

let cat = document.getElementById('category');

cat.addEventListener('change', () => updateCategoryChoices(cat.value));



// function updateCategoryChoices
function updateCategoryChoices(category) {
    let results = document.getElementById('results');
    results.innerHTML = '';


    const api_endpoint_url = 'http://localhost/is216/week5/InClass/DrinksAPI/api/drink/search.php'; // API endpoint
    axios.get(api_endpoint_url).
    then(response => {
        // console.log(results);
        let drinks_array = response.data.records;
        for (let drink of drinks_array) {
            if (drink.category == category) {
                let coldiv = document.createElement('div');
                coldiv.className = 'col';
                coldiv.innerHTML = `
                    <div class="card h-100">
                        <img src="http://localhost/is216/week5/InClass/DrinksAPI/${drink.photo_url}" 
                            class="card-img-top"
                            alt="${drink.name}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${drink.name}
                            </h5>
                            <p class="card-text small text-muted mb-0">
                                ${drink.category} • ${drink.alcoholic}
                            </p>
                        </div>
                    </div>`;
                results.appendChild(coldiv);
                // console.log(coldiv);
            }

        }
        
    }).
    catch(error => {
        console.log(error.message);
    });
}


/* Task 9 - Alcoholic Dropdown Event Listener */

// Event listener -- change in alcoholic button
// get the value (alcoholic/ non alcoholic)
// if alcoholic else if non alcoholic else no-selected
// axios get request for al/non a/
// get response, change innerHTML of results

let alcoholic_tag = document.getElementById('alcoholic');

alcoholic_tag.addEventListener('change', function() {
    let alcoholic = alcoholic_tag.value;
    // console.log(alcoholic);

    
    let results = document.getElementById('results'); // results
    results.innerHTML = '';

    let api_endpoint_url = 'http://localhost/is216/week5/InClass/DrinksAPI/api/drink/search.php?a='; // API endpoint
    
    if (alcoholic == 'alcoholic' || alcoholic == 'nonalcoholic') {
        api_endpoint_url += alcoholic;
    }
    // console.log(api_endpoint_url);
    axios.get(api_endpoint_url).
        then(response => {
            // console.log(results); 
            let drinks_array = response.data.records;
            // console.log(drinks_array);
            for (let drink of drinks_array) {
                let coldiv = document.createElement('div');
                coldiv.className = 'col';
                coldiv.innerHTML = `
                    <div class="card h-100">
                        <img src="http://localhost/is216/week5/InClass/DrinksAPI/${drink.photo_url}" 
                            class="card-img-top"
                            alt="${drink.name}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${drink.name}
                            </h5>
                            <p class="card-text small text-muted mb-0">
                                ${drink.category} • ${drink.alcoholic}
                            </p>
                        </div>
                    </div>`;
                results.appendChild(coldiv);
                    // console.log(coldiv);
                }
            
        }).
        catch(error => {
            console.log(error.message);
        });
}
);



/* Task 10 - Name search input Event Listener */
let name_search_tag = document.getElementById('name_search');
console.log(name_search_tag);

name_search_tag.addEventListener('input', function() {
    let name = name_search_tag.value;
    // console.log(name);
    
    let results = document.getElementById('results'); // results
    results.innerHTML = '';

    let api_endpoint_url = 'http://localhost/is216/week5/InClass/DrinksAPI/api/drink/search.php?n='; // API endpoint
    
    api_endpoint_url += name;

    // console.log(api_endpoint_url);
    axios.get(api_endpoint_url).
        then(response => {
            // console.log(results); 
            let drinks_array = response.data.records;
            // console.log(drinks_array);
            for (let drink of drinks_array) {
                let coldiv = document.createElement('div');
                coldiv.className = 'col';
                coldiv.innerHTML = `
                    <div class="card h-100">
                        <img src="http://localhost/is216/week5/InClass/DrinksAPI/${drink.photo_url}" 
                            class="card-img-top"
                            alt="${drink.name}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${drink.name}
                            </h5>
                            <p class="card-text small text-muted mb-0">
                                ${drink.category} • ${drink.alcoholic}
                            </p>
                        </div>
                    </div>`;
                results.appendChild(coldiv);
                    // console.log(coldiv);
            }
            
        }).
        catch(error => {
            console.log(error.message);
        });
}
);




// DO NOT MODIFY THE BELOW LINES
get_all_drinks();
populate_category_dropdown();