// SHOW LOGIN PAGE
function showLogin(){

    document.getElementById("startPage").classList.add("hidden");

    document.getElementById("loginPage").classList.remove("hidden");
}

// LOGIN FUNCTION
function login(){

    let username =
    document.getElementById("username").value;

    let password =
    document.getElementById("password").value;

    // CURRENT LOGIN DETAILS
    let correctUser = "admin";
    let correctPass = "1234";

    if(username === correctUser &&
       password === correctPass){

        document.getElementById("loginPage")
        .classList.add("hidden");

        document.getElementById("dashboard")
        .classList.remove("hidden");

    }else{

        document.getElementById("message")
        .innerHTML =
        "Invalid Username or Password";
    }
}

// OPEN REGISTRATION PAGE
function openRegister(){

    hideAll();

    document.getElementById("registerPage")
    .classList.remove("hidden");
}

// REGISTER FACULTY
function registerFaculty(){

    let id =
    document.getElementById("facultyId").value;

    let name =
    document.getElementById("facultyName").value;

    let dept =
    document.getElementById("facultyDept").value;

    let email =
    document.getElementById("facultyEmail").value;

    let faculty = {
        id:id,
        name:name,
        dept:dept,
        email:email
    };

    let facultyList =
    JSON.parse(localStorage.getItem("facultyData"))
    || [];

    facultyList.push(faculty);

    localStorage.setItem(
        "facultyData",
        JSON.stringify(facultyList)
    );

    alert("Faculty Registered Successfully");

    document.getElementById("facultyId").value="";
    document.getElementById("facultyName").value="";
    document.getElementById("facultyDept").value="";
    document.getElementById("facultyEmail").value="";
}

// OPEN PROFILE PAGE
function openProfile(){

    hideAll();

    document.getElementById("profilePage")
    .classList.remove("hidden");

    let facultyList =
    JSON.parse(localStorage.getItem("facultyData"))
    || [];

    let output = "";

    facultyList.forEach(function(faculty){

        output += `
        <div class="profile-card">
            <h3>${faculty.name}</h3>
            <p><b>ID:</b> ${faculty.id}</p>
            <p><b>Department:</b> ${faculty.dept}</p>
            <p><b>Email:</b> ${faculty.email}</p>
        </div>
        `;
    });

    document.getElementById("profileList")
    .innerHTML = output;
}

// OPEN SEARCH PAGE
function openSearch(){

    hideAll();

    document.getElementById("searchPage")
    .classList.remove("hidden");
}

// SEARCH FACULTY
// SEARCH FACULTY
function searchFaculty() {

    const search = document.getElementById("searchInput")
    .value.toLowerCase();

    const result = document.getElementById("searchResult");

    result.innerHTML = "";

    const faculty = facultyRecords.find(f =>
        f.id.toLowerCase() === search ||
        f.name.toLowerCase() === search
    );

    if (faculty) {

        result.innerHTML = `
        
        <div class="profile-card">

            <img src="${faculty.photo}" 
            class="profile-img">

            <h3>${faculty.name}</h3>

            <p><b>ID:</b> ${faculty.id}</p>
            <p><b>Department:</b> ${faculty.dept}</p>
            <p><b>Email:</b> ${faculty.email}</p>

            <button class="delete-btn"
            onclick="deleteFaculty('${faculty.id}')">
                Delete Record
            </button>

        </div>
        `;

    } else {

        result.innerHTML = `
        <p style="color:red;">
            Faculty Record Not Found
        </p>
        `;
    }
}


// DELETE FACULTY
function deleteFaculty(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this record?"
    );

    if (confirmDelete) {

        facultyRecords = facultyRecords.filter(
            faculty => faculty.id !== id
        );

        document.getElementById("searchResult")
        .innerHTML = `
        <p style="color:green;">
            Faculty Record Deleted Successfully
        </p>
        `;
    }
}

// LOGOUT
function logout(){

    hideAll();

    document.getElementById("loginPage")
    .classList.remove("hidden");

    alert("Logout Successful");
}

// BACK TO DASHBOARD
function goDashboard(){

    hideAll();

    document.getElementById("dashboard")
    .classList.remove("hidden");
}

// HIDE ALL PAGES
function hideAll(){

    document.getElementById("dashboard")
    .classList.add("hidden");

    document.getElementById("registerPage")
    .classList.add("hidden");

    document.getElementById("profilePage")
    .classList.add("hidden");

    document.getElementById("searchPage")
    .classList.add("hidden");
}
/* =========================
   LOAD SAVED DATA
========================= */

let facultyRecords = JSON.parse(
localStorage.getItem("facultyRecords")
) || [];

// REGISTER FACULTY
/* =========================
   REGISTER FACULTY
========================= */

function registerFaculty() {

    const id =
    document.getElementById("facultyId").value;

    const name =
    document.getElementById("facultyName").value;

    const dept =
    document.getElementById("facultyDept").value;

    const email =
    document.getElementById("facultyEmail").value;

    const photoInput =
    document.getElementById("photo");

    const file = photoInput.files[0];

    if (!id || !name || !dept || !email || !file) {

        alert("Please fill all fields");

        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {

        const faculty = {

            id: id,

            name: name,

            dept: dept,

            email: email,

            photo: e.target.result
        };

        /* ADD DATA */
        facultyRecords.push(faculty);

        /* SAVE TO LOCAL STORAGE */
        localStorage.setItem(
            "facultyRecords",
            JSON.stringify(facultyRecords)
        );

        alert("Faculty Registered Successfully");

        /* CLEAR FIELDS */

        document.getElementById("facultyId").value = "";

        document.getElementById("facultyName").value = "";

        document.getElementById("facultyDept").value = "";

        document.getElementById("facultyEmail").value = "";

        document.getElementById("photo").value = "";
    };

    reader.readAsDataURL(file);
}

// OPEN PROFILE PAGE
function openProfile() {

    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("profilePage").classList.remove("hidden");

    const profileList = document.getElementById("profileList");

    profileList.innerHTML = "";

    facultyRecords.forEach(faculty => {

        profileList.innerHTML += `
            <div class="profile-card">

                <img src="${faculty.photo}" 
                alt="Profile Photo"
                class="profile-img"style="width:200px;height:200px;border-radius:50%">

                <h3>${faculty.name}</h3>

                <p><b>ID:</b> ${faculty.id}</p>
                <p><b>Department:</b> ${faculty.dept}</p>
                <p><b>Email:</b> ${faculty.email}</p>

            </div>
        `;
    });
}
/* =========================
   DELETE FACULTY
========================= */

function deleteFaculty(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this record?"
    );

    if (confirmDelete) {

        facultyRecords = facultyRecords.filter(
            faculty => faculty.id !== id
        );

        /* UPDATE LOCAL STORAGE */

        localStorage.setItem(
            "facultyRecords",
            JSON.stringify(facultyRecords)
        );

        document.getElementById("searchResult")
        .innerHTML = `
        <p style="color:lightgreen;">
            Faculty Record Deleted Successfully
        </p>
        `;
    }
}
/* =========================
   AUTO LOAD SAVED DATA
========================= */

window.onload = function(){

facultyRecords =
JSON.parse(
localStorage.getItem("facultyRecords")
) || [];

}
