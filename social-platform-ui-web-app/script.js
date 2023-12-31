const menuParent = document.querySelectorAll(".menu-list");
const rightMsgControlerBtn = document.querySelector("#msg-controler");
const leftToggleMenuBtn = document.querySelector("#menu-toggler");
const leftMenuList = document.querySelector(".side-left");
const rightMsgSideBox = document.querySelector(".side-right");
const post = document.querySelector(".post");
const postInteraction = document.querySelector(".post-interaction");
const dayNightThemeBtn = document.querySelector("#day-night-mode");

let bgBodyMain = document.documentElement.style.setProperty(
  "--bg-body-main",
  "#151727"
);

//  theme color change
function toggleTheme(e) {
  const themeIcon = e.target;
  if (themeIcon.classList.contains("fa-regular")) {
    themeIcon.classList.replace("fa-regular", "fa-solid");
  } else {
    themeIcon.classList.replace("fa-solid", "fa-regular");
  }

  let bodyMain =
    document.documentElement.style.getPropertyValue("--bg-body-main");

  if (bodyMain == "#fff") {
    document.documentElement.style.setProperty("--bg-body-main", "#151727");
    document.documentElement.style.setProperty(
      "--bg-body-secondary",
      "rgb(55, 62, 87)"
    );
    document.documentElement.style.setProperty("--color-base1", "#fff");
    document.documentElement.style.setProperty("--color-base2", "#c3c5d5");
    document.documentElement.style.setProperty("--color-base3", "#ccc8db");
  } else {
    document.documentElement.style.setProperty("--bg-body-main", "#fff");
    document.documentElement.style.setProperty(
      "--bg-body-secondary",
      "#c3c5d5"
    );
    document.documentElement.style.setProperty("--color-base1", "#151727");
    document.documentElement.style.setProperty(
      "--color-base2",
      "rgba(15, 14, 14)"
    );
    document.documentElement.style.setProperty(
      "--color-base3",
      "rgb(55, 62, 87)"
    );
  }
}

//  All menus state - active / inactive
function activeMenu(e) {
  if (e.target == e.currentTarget) {
    return;
  } else {
    let menuItems = Array.from(e.currentTarget.children);
    menuItems.forEach((item) => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    });
    // The  closest()  method is a very useful tool for finding elements in the DOM.
    const curListItem = e.target.closest("li");
    curListItem.classList.add("active");
  }
}

function toggle(e) {
  const menuBtn = e.currentTarget;
  const showMenus = menuBtn.closest("aside");
  menuBtn.classList.toggle("show");
  showMenus.classList.toggle("show");

  if (showMenus.classList.contains("side-right")) {
    changeToggleIcon();
  }

  if (showMenus.classList.contains("show")) {
    close(showMenus, menuBtn);
  }
}

// close menu if click outside.
function close(asideOpen, controlBtn) {
  function closeSideBar(e) {
    if (e.target == asideOpen) {
      //  checker works fine because of pseudo element took full width.
      asideOpen.classList.remove("show");
      controlBtn.classList.remove("show");
      if (asideOpen.classList.contains("side-right")) {
        changeToggleIcon();
      }
    } else {
      return;
    }
  }
  window.addEventListener("click", closeSideBar, false);
}

// conver msg icon to X ;
function changeToggleIcon() {
  const closeIcon = rightMsgControlerBtn.children[0];
  if (closeIcon.classList.contains("fa-circle-left")) {
    closeIcon.setAttribute("class", "  fa-regular fa-comment-dots");
  } else {
    closeIcon.setAttribute("class", "  fa-regular fa-circle-left");
  }
}

//  to show like heart
function showLikePost(e) {
  let postContent = e.currentTarget.children[1];
  const liked = () => {
    postContent.classList.toggle("liked");
  };
  liked();
  setTimeout(liked, 750);
}

//  to update interaction
let clickCount = 0;
const interactionEffect = (interactBox) => {
  let countLike = Number.parseInt(interactBox.children[1].innerText);
  if (clickCount == 1) {
    interactBox.children[0].classList.replace("fa-solid", "fa-regular");
    interactBox.children[1].innerHTML = --countLike;
    interactBox.classList.toggle("active");
    clickCount--;

    return;
  } else {
    interactBox.children[0].classList.replace("fa-regular", "fa-solid");
    let countLike = Number.parseInt(interactBox.children[1].innerText);
    interactBox.children[1].innerHTML = ++countLike;
    interactBox.classList.toggle("active");
    clickCount++;
  }
};

const interaction = (e) => {
  const clkElement = e.target.closest("div");
  if (clkElement == e.currentTarget) {
    return;
  } else {
    interactionEffect(clkElement);
  }
};

//  all event listener
leftToggleMenuBtn.addEventListener("click", toggle);
rightMsgControlerBtn.addEventListener("click", toggle);
postInteraction.addEventListener("click", interaction);
post.addEventListener("dblclick", showLikePost);
dayNightThemeBtn.addEventListener("click", toggleTheme);
menuParent.forEach((ul) => {
  ul.addEventListener("click", activeMenu, false);
});
