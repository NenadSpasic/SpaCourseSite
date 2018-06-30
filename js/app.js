// variables
const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');


// listeners

loadEventListeners();

function loadEventListeners() {
    //when a new course is added
    courses.addEventListener('click', buyCourse);

    // when the remove btn clicked 

    shoppingCartContent.addEventListener('click', removeCourse);

    // clear cart Btn
    clearCartBtn.addEventListener('click', clearCart);

    //document redy
    document.addEventListener('DOMContentLoaded', getCoursesFromLocalStorage);
}



// functions

function buyCourse(e) {
    e.preventDefault();

    // use delegation to find the course that was added
    if (e.target.classList.contains('add-to-cart')) {
        // read the course values
        const course = e.target.parentElement.parentElement;

        //read the values
        getCourseInfo(course);

    }

}

// read the HTML info of the selected course
function getCourseInfo(course) {
    //create an Object with course data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    // Insert into the shopping cart
    addIntoCart(courseInfo);

}
// display the selected course into the shopping cart
function addIntoCart(course) {
    // crate a <tr>
    const row = document.createElement('tr');

    // build the template
    row.innerHTML = `
        <tr>
                <td>
                    <img src="${course.image}" width=100>
                </td>
                <td>
                    ${course.title}
                </td>
                <td>
                    ${course.price}
                </td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
        </tr>
    `;
    // add into the shopping cart
    shoppingCartContent.appendChild(row);

    // add course into a storage
    saveIntoStorage(course);
}



//add courses into local storage
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    //add the course into array
    courses.push(course);

    //since storage only saves strings we need to convert JON into string
    localStorage.setItem('courses', JSON.stringify(courses));
}

// get courses from storage
function getCoursesFromStorage() {

    let courses;

    //if something exist on storage them we get the value, otherwise create an empty array
    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}


// remove course from the dom
function removeCourse(e) {
    let course, courseId;

    //remove from the DOM
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    //console.log(courseId);

    // remove from Local Storage
    removeCourseLoclStorage(courseId);

}
//remove from local storage
function removeCourseLoclStorage(id) {
    // get local storage data
    let coursesLS = getCoursesFromStorage();

    // loop throught the array and find index to remove
    coursesLS.forEach(function (courseLS, index) {
        if (courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });

    // add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//function to clear the cart
function clearCart() {
    // shoppingCartContent.innerHTML = ''; one way of doing it
    // but this is recommendet way
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    // Clear from local Storage
    clearLocalStorage();
}
//clear the whole local storage
function clearLocalStorage() {
    localStorage.clear();
}


//Loads when document is redy and print the courses into shoping cart

function getCoursesFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    //LOOP throught the courses and print into the cart
    coursesLS.forEach(function (course) {
        //create the <tr>
        const row = document.createElement('tr');

        //print the content
        row.innerHTML = `
                <tr>
                        <td>
                            <img src="${course.image}" width=100>
                        </td>
                        <td>${course.title}</td>
                        <td>${course.price}</td>
                        <td>
                            <a href="#" class="remove" data-id="${course.id}">X</a>
                        </td>
                </tr>
            `;
        shoppingCartContent.appendChild(row);
    });
}

// Call TOAST function
M.toast()