const searchBtn = document.querySelector(".searchBtn"),
  searchInp = document.querySelector(".searchBar input"),
  content = document.querySelector(".content");

searchBtn.addEventListener("click", () => {
  getUsers(searchInp.value);
});

function getUsers(user) {
  const noResult = document.querySelector(".noResult"),
    userImage = content.querySelector(".userImage img"),
    userImageTablet = content.querySelector(".userImageTablet img"),
    userName = content.querySelector(".userName"),
    userlink = content.querySelector(".userlink"),
    userJoinDate = content.querySelector(".userJoinDate"),
    userBio = content.querySelector(".userBio"),
    userFamous = content.querySelectorAll(".userFamous .famous"),
    links = content.querySelectorAll(".links .link");
  fetch(`https://api.github.com/users/${user}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((userObj) => {
      if (!userObj) {
        noResult.classList.add("isActive");
        content.classList.remove("isActive");
        return null;
      }
      noResult.classList.add("isActive");
      content.classList.remove("isActive");
      noResult.classList.remove("isActive");
      content.classList.add("isActive");
      userImage.src = userObj.avatar_url;
      userImageTablet.src = userObj.avatar_url;
      userName.innerText = userObj.name ? userObj.name : "No name";
      userlink.innerText = userObj.login;
      userlink.href = userObj.html_url;
      let joinDate = new Date(userObj.created_at);
      userJoinDate.innerText = `Joined ${joinDate.getDate()} ${whichMonth(
        joinDate.getMonth()
      )} ${joinDate.getFullYear()}`;
      if (userObj.bio) {
        userBio.innerText = userObj.bio;
        userBio.classList.remove("noBio");
      } else {
        userBio.innerText = "This profile has no bio";
        userBio.classList.add("noBio");
      }
      userFamous[0].lastElementChild.innerText = userObj.public_repos;
      userFamous[1].lastElementChild.innerText = userObj.followers;
      userFamous[2].lastElementChild.innerText = userObj.following;
      links[0].lastElementChild.innerText = userObj.location;
      links[1].lastElementChild.innerText = userObj.twitter_username;
      links[2].lastElementChild.innerText = userObj.blog;
      links[2].lastElementChild.href = "https://" + userObj.blog;
      links[3].lastElementChild.innerText = userObj.company;
      links.forEach((el, i) => {
        if (el.lastElementChild.innerText === "") {
          el.classList.add("isNotFined");
          el.lastElementChild.innerText = "Not Available";
        } else {
          el.classList.remove("isNotFined");
        }
      });
    });
}
function whichMonth(month) {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][month];
}

const theam = document.querySelector(".theam");
let headertheam = false;
theam.addEventListener("click", () => {
  if (headertheam) {
    document.body.classList.remove("white");
    headertheam = false;
    theam.classList.remove("dark");
  } else {
    document.body.classList.add("white");
    headertheam = true;
    theam.classList.add("dark");
  }
});
