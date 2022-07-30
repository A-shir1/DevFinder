const username = document.querySelector(".userName");
const searchInput = document.querySelector(".searchInput");
const errorMsg = document.querySelector(".errorMsg");
const searchBar = document.querySelector("#searchBar");
const submitButt = document.querySelector(".submitButton");
const form = document.querySelector("form");
const loginID = document.querySelector(".loginID");
const userBio = document.querySelector(".userBio");
const dp = document.querySelector(".dp");
const repos = document.querySelector(".repos");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const locationDiv = document.querySelector(".location");
const accLink = document.querySelector(".accLink");
const twitterAcc = document.querySelector(".twitterAcc");
const company = document.querySelector(".company");

let textValue;

submitButt.disabled = true;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const resData = await getUserData();
    changeUsername(resData);
    changeLoginID(resData);
    changeDP(resData);
    changeUserBio(resData);
    changeStats(resData);
    changeSocial(resData);
});

const getUserData = async () => {
    try{
        const res = await axios.get(`https://api.github.com/users/${textValue}`);
        return res.data;
    } catch (e) {
        alert("SOMETHING WENT WRONG!!!");
    }

}

const changeUsername = (resData) => {
    let resName = resData.name;
    let nameArray;
    if (resName)
        nameArray = resName.split(" ");
    if (nameArray.length === 1){
        let lastName = nameArray[nameArray.length - 1];
        username.innerHTML = `<span class="headerAcc">${lastName}</span>`;
    }
    else{
        let firstName = nameArray[0], lastName = nameArray[nameArray.length - 1];
        username.innerHTML = `${firstName} <span class="headerAcc">${lastName}</span>`;
    }
}

const changeLoginID = (resData) => {
    let id = resData.login;
    loginID.innerText = id;
}

const changeDP = (resData) => {
    let imgURL = resData.avatar_url;
    dp.src = imgURL;
}

const changeUserBio = (resData) => {
    if (resData.bio !== null){
        let bio = resData.bio;
        userBio.innerText = bio;
    }
    else {
        userBio.innerText = "This user has no bio";
    }
        
}

const changeStats = (resData) => {
    let r = resData.public_repos, fr = resData.followers, fg = resData.following;
    repos.innerText = r;
    followers.innerText = fr;
    following.innerText = fg;
}

const changeSocial = (resData) => {
    let loc = resData.location, tw = resData.twitter_username, al = resData.html_url, desi = resData.company;
    if (resData.location === null){
        locationDiv.innerText = "Not specified"
    }
    else {
        locationDiv.innerText = loc;
    }
    
    if (resData.twitter_username === null){
        twitterAcc.innerText = "Not specified"
    }
    else {
        twitterAcc.innerText = tw;
    }

    if (resData.html_url === null){
        accLink.innerText = "Not specified"
    }
    else {
        accLink.innerText =  `@${al}`;
    }
    
    if (resData.company === null){
        company.innerText = "Not specified";
    }
    else {
        company.innerText = desi;
    }

}

searchInput.addEventListener("input", () => {
    textValue = searchInput.value;
});

searchInput.addEventListener("focusin", () => {
    searchBar.classList.add("focusSearch");
});

searchInput.addEventListener("focusout", () => {
    if (searchInput.value === ''){
        searchBar.classList.add("invalidInput");
        errorMsg.classList.remove("invisible");
        submitButt.disabled = true;
    }
    else{
        searchBar.classList.remove("focusSearch");
        searchBar.classList.remove("invalidInput");
        errorMsg.classList.add("invisible");
        submitButt.disabled = false;
    }
});