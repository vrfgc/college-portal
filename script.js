/* =========================================
   FIREBASE CONFIGURATION
========================================= */

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* FIREBASE CONFIG */

const firebaseConfig = {

    apiKey: "AIzaSyAsNhHkGkm_U-sIP3ag1bxN3ZJE9whlS0A",

    authDomain: "college-portal-3124e.firebaseapp.com",

    projectId: "college-portal-3124e",

    storageBucket: "college-portal-3124e.firebasestorage.app",

    messagingSenderId: "864264099084",

    appId: "1:864264099084:web:232645a9685761365ae529",

    measurementId: "G-G2HDDY7YKX"
};

/* INITIALIZE FIREBASE */

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


/* =========================================
   LOGIN PAGE
========================================= */

function showLogin() {

    document.getElementById("startPage")
    .classList.add("hidden");

    document.getElementById("loginPage")
    .classList.remove("hidden");
}


/* =========================================
   LOGIN FUNCTION
========================================= */

function login() {

    let username =
    document.getElementById("username").value;

    let password =
    document.getElementById("password").value;

    let correctUser = "admin";

    let correctPass = "1234";

    if (
        username === correctUser &&
        password === correctPass
    ) {

        hideAll();

        document.getElementById("dashboard")
        .classList.remove("hidden");

    } else {

        document.getElementById("message")
        .innerHTML =
        "Invalid Username or Password";
    }
}


/* =========================================
   OPEN REGISTER PAGE
========================================= */

function openRegister() {

    hideAll();

    document.getElementById("registerPage")
    .classList.remove("hidden");
}


/* =========================================
   REGISTER FACULTY
========================================= */

async function registerFaculty() {

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

    reader.onload = async function (e) {

        const photo = e.target.result;

        try {

            await addDoc(
                collection(db, "facultyRecords"),
                {
                    id: id,
                    name: name,
                    dept: dept,
                    email: email,
                    photo: photo
                }
            );

            alert("Faculty Registered Successfully");

            /* CLEAR INPUTS */

            document.getElementById("facultyId").value = "";

            document.getElementById("facultyName").value = "";

            document.getElementById("facultyDept").value = "";

            document.getElementById("facultyEmail").value = "";

            document.getElementById("photo").value = "";

        } catch (error) {

            console.log(error);

            alert("Error Saving Data");
        }
    };

    reader.readAsDataURL(file);
}


/* =========================================
   OPEN PROFILE PAGE
========================================= */

async function openProfile() {

    hideAll();

    document.getElementById("profilePage")
    .classList.remove("hidden");

    const profileList =
    document.getElementById("profileList");

    profileList.innerHTML = "";

    const querySnapshot =
    await getDocs(
        collection(db, "facultyRecords")
    );

    querySnapshot.forEach((docItem) => {

        const faculty = docItem.data();

        profileList.innerHTML += `

        <div class="profile-card">

            <img 
                src="${faculty.photo}" 
                class="profile-img"
                style="
                width:200px;
                height:200px;
                border-radius:50%;
                object-fit:cover;
                "
            >

            <h3>${faculty.name}</h3>

            <p><b>ID:</b> ${faculty.id}</p>

            <p><b>Department:</b> ${faculty.dept}</p>

            <p><b>Email:</b> ${faculty.email}</p>

        </div>
        `;
    });
}


/* =========================================
   OPEN SEARCH PAGE
========================================= */

function openSearch() {

    hideAll();

    document.getElementById("searchPage")
    .classList.remove("hidden");
}


/* =========================================
   SEARCH FACULTY
========================================= */

async function searchFaculty() {

    const search =
    document.getElementById("searchInput")
    .value.toLowerCase();

    const result =
    document.getElementById("searchResult");

    result.innerHTML = "";

    const querySnapshot =
    await getDocs(
        collection(db, "facultyRecords")
    );

    let found = false;

    querySnapshot.forEach((docItem) => {

        const faculty = docItem.data();

        if (
            faculty.id.toLowerCase().includes(search) ||
            faculty.name.toLowerCase().includes(search)
        ) {

            found = true;

            result.innerHTML = `

            <div class="profile-card">

                <img 
                    src="${faculty.photo}" 
                    class="profile-img"
                    style="
                    width:200px;
                    height:200px;
                    border-radius:50%;
                    object-fit:cover;
                    "
                >

                <h3>${faculty.name}</h3>

                <p><b>ID:</b> ${faculty.id}</p>

                <p><b>Department:</b> ${faculty.dept}</p>

                <p><b>Email:</b> ${faculty.email}</p>

                <button 
                    class="delete-btn"
                    onclick="deleteFaculty('${docItem.id}')"
                >
                    Delete Record
                </button>

            </div>
            `;
        }
    });

    if (!found) {

        result.innerHTML = `

        <p style="color:red;">
            Faculty Record Not Found
        </p>
        `;
    }
}


/* =========================================
   DELETE FACULTY
========================================= */

async function deleteFaculty(docId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this record?"
    );

    if (confirmDelete) {

        await deleteDoc(
            doc(db, "facultyRecords", docId)
        );

        document.getElementById("searchResult")
        .innerHTML = `

        <p style="color:lightgreen;">
            Faculty Record Deleted Successfully
        </p>
        `;
    }
}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    hideAll();

    document.getElementById("loginPage")
    .classList.remove("hidden");

    document.getElementById("message")
    .innerHTML = "";

    alert("Logout Successful");
}


/* =========================================
   BACK TO DASHBOARD
========================================= */

function goDashboard() {

    hideAll();

    document.getElementById("dashboard")
    .classList.remove("hidden");
}


/* =========================================
   HIDE ALL PAGES
========================================= */

function hideAll() {

    document.getElementById("loginPage")
    .classList.add("hidden");

    document.getElementById("dashboard")
    .classList.add("hidden");

    document.getElementById("registerPage")
    .classList.add("hidden");

    document.getElementById("profilePage")
    .classList.add("hidden");

    document.getElementById("searchPage")
    .classList.add("hidden");
}


/* =========================================
   MAKE FUNCTIONS GLOBAL
========================================= */

window.showLogin = showLogin;

window.login = login;

window.openRegister = openRegister;

window.registerFaculty = registerFaculty;

window.openProfile = openProfile;

window.openSearch = openSearch;

window.searchFaculty = searchFaculty;

window.deleteFaculty = deleteFaculty;

window.logout = logout;

window.goDashboard = goDashboard;
