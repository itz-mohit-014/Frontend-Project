const menuParent = document.querySelectorAll(".menu-list");
const leftToggleMenuBtn = document.querySelector("#menu-toggler");
const leftMenuList = document.querySelector(".side-left");
const rightMsgControlerBtn = document.querySelector("#msg-controler");
const rightMsgSideBox = document.querySelector(".side-right");
const dayNightThemeBtn = document.querySelector("#day-night-mode");

// share new post related
const postContentNewTextInput = document.getElementById("new-post-text");
const attachFile = document.getElementById("attach-file");
const shareNewPostBtn = document.getElementById("submit-btn");
const showPhotoUpload = document.querySelector(".post-categories-menu");

// post related
const postContainer = document.querySelector(".profile-post-container");
const posts = document.querySelectorAll(".post");
const postInteraction = document.querySelector(".post-interaction");
const removePost = document.querySelector(".remove-post");

// let bgBodyMain = document.documentElement.style.setProperty(
//   "--bg-body-main",
//   "#151727"
// );

//  theme color change
function toggleTheme(e) {
  // for Icon changing.
  const themeIcon = e.target;
  const bodyMain =
    document.documentElement.style.getPropertyValue("--bg-body-main");

  // for icon
  if (themeIcon.classList.contains("fa-regular")) {
    themeIcon.classList.replace("fa-regular", "fa-solid");
  } else {
    themeIcon.classList.replace("fa-solid", "fa-regular");
  }

  //  for change color value;
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

  toggle(e);
}

//  All menus state - active / inactive
function activeMenu(e) {
  if (e.target == e.currentTarget) {
    return;
  } else {
    // The  closest()  method is a very useful tool for finding elements in the DOM.
    let menuItems = Array.from(e.currentTarget.children);
    menuItems.forEach((item) => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    });
    const curListItem = e.target.closest("li");
    curListItem.classList.add("active");
    const sidebar = e.target.closest("aside");
    if (sidebar) {
      toggle(e);
    }
  }
}

function closeSideBar(sidebar) {
  sidebar.classList.toggle("show");
  if (sidebar.classList.contains("side-right")) {
    changeToggleIcon();
  } else {
    leftMenuIcon();
  }
}

//  toggle sidebar
function toggle(e) {
  const menuBtn = e.currentTarget;
  const showMenus = menuBtn.closest("aside");
  // left menu icon
  function leftMenuIcon() {
    leftToggleMenuBtn.classList.toggle("show");
  }

  // conver right msg icon to X ;
  function changeToggleIcon() {
    const closeIcon = rightMsgControlerBtn.children[0];
    if (closeIcon.classList.contains("fa-circle-left")) {
      closeIcon.setAttribute("class", "  fa-regular fa-comment-dots");
    } else {
      closeIcon.setAttribute("class", "  fa-regular fa-circle-left");
    }
  }
  if (showMenus.classList.contains("side-right")) {
    changeToggleIcon();
  } else {
    leftMenuIcon();
  }
  showMenus.classList.toggle("show");
}

//  to show heart in post
function showLikePost(e) {
  let postContent = e.currentTarget;
  const interactionContainer = postContent.nextElementSibling;
  const likeBtn = interactionContainer.children[1];
  const liked = () => {
    interactionContainer.classList.toggle("liked");
  };
  liked();
  setTimeout(liked, 500);
  interactionEffect(likeBtn);
}

//  to update interaction
const interactionEffect = (interactBox) => {
  let text = Number.parseInt(interactBox.children[1].innerText);
  let flag = interactBox.classList.contains("active");

  function defaultState() {
    interactBox.children[0].classList.replace("fa-solid", "fa-regular");
    interactBox.children[1].innerHTML = --text;
    interactBox.classList.toggle("active");
  }

  function activeState() {
    interactBox.children[0].classList.replace("fa-regular", "fa-solid");
    interactBox.children[1].innerHTML = ++text;
    interactBox.classList.toggle("active");
  }

  if (flag) {
    defaultState();
  } else {
    activeState();
  }
};

// interact
const interaction = (e) => {
  const clkElement = e.target.closest("div");
  if (clkElement == e.currentTarget) {
    return;
  } else {
    interactionEffect(clkElement);
  }
};

function enableBtn() {
  if (postContentNewTextInput.value == "") {
    shareNewPostBtn.disabled = true;
  } else {
    shareNewPostBtn.disabled = false;
  }
}

function showUploadFileOption(e) {
  const mainParent = e.currentTarget.parentElement;
  if (e.target == e.currentTarget) {
    return;
  } else {
    if (e.target == e.currentTarget.children[1]) {
      mainParent.children[2].classList.add("show");
    } else {
      if (!mainParent.lastElementChild.classList.contains("uploaded")) {
        mainParent.children[2].classList.remove("show");
      }
    }
  }
}

// Show uploaded file
function uploadFile(e) {
  const uploadedFileParent = e.currentTarget.parentElement;
  const inputFileEl = e.currentTarget;
  const uploadedFile = inputFileEl.files[0];
  const fileName = uploadedFile.name;

  // checker for show last file..
  if (uploadedFileParent.classList.contains("uploaded")) {
    for (let i = 0; i < uploadedFileParent.children.length; i++) {
      uploadedFileParent.children[i].classList.contains("show-uploaded-file")
        ? uploadedFileParent.children[i].remove()
        : null;
    }
    uploadedFileParent.classList.remove("uploaded");
    showFile();
  } else {
    showFile();
  }

  function showFile() {
    // // file reader object to read file
    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    reader.onload = function () {
      const fileWrapper = document.createElement("div");
      fileWrapper.classList.add("show-uploaded-file");
      const label = inputFileEl.nextElementSibling;
      // first char capital
      label.innerHTML = `${fileName.slice(0, 1).toUpperCase()}${fileName.slice(
        1
      )} 
    <i class="fa-solid fa-cloud-arrow-up upload-file-icon"></i>`;
      const image = document.createElement("img");
      image.src = reader.result;

      fileWrapper.appendChild(image);
      uploadedFileParent.appendChild(label);
      uploadedFileParent.appendChild(fileWrapper);
      uploadedFileParent.classList.add("uploaded");
    };
  }
}

//  for adding more New Post **************

function shareNewPost() {
  const date = new Date();
  let curHour = date.getHours();
  const newPost = document.createElement("div");
  newPost.setAttribute("class", " post profile-info-card");
  const uploadedFileParent = attachFile.parentElement;
  newPost.innerHTML = `
    <div class="user-post-header">
      <div class="left-user">
        <span class="user-profile"></span>
        <div class="user-name">
          <p class="name">
            <strong> Mohit </strong>create new
            <a href="#" class="category link">album</a>
          </p>
          <p class="post-time">${curHour} hour ago</p>
        </div>
      </div>
      <div class="right-more-action remove-post">
        <i class="fa-solid fa-remove"></i>
      </div>
    </div>

  `;

  function createPostContent() {
    const divPostContainer = document.createElement("div");
    divPostContainer.classList.add("post-content");
    const createSharedPost = document.createElement("p");
    createSharedPost.classList.add("about-post-desc");

    if (uploadedFileParent.classList.contains("uploaded")) {
      const divImg = document.createElement("div");
      divImg.classList.add("post-image");
      divImg.innerHTML = uploadedFileParent.lastElementChild.outerHTML;

      createSharedPost.innerText = `${postContentNewTextInput.value}`;
      createSharedPost.appendChild(divImg);
    } else {
      createSharedPost.innerText = `${postContentNewTextInput.value} `;
    }

    // createSharedPost.innerHTML = `${postContentNewTextInput.value} `;
    divPostContainer.appendChild(createSharedPost);
    newPost.appendChild(divPostContainer);
  }

  function createPostInteraction() {
    const createPostInteractionWrapper = document.createElement("div");
    createPostInteractionWrapper.classList.add("post-interaction");
    createPostInteractionWrapper.innerHTML = `
    <i class="fa-solid fa-heart like-icon show-like-icon"></i>
    <div class="like interact-mode">
    <i class="fa-regular fa-heart"></i>
    <span class="interaction-count">0</span>
    </div>
    <div class="comment interact-mode">
    <i class="fa-regular fa-comment"></i>
    <span class="interaction-count">0</span>
    </div>
    <div class="share interact-mode">
    <i class="fa-regular fa-share-from-square"></i>
    <span class="interaction-count">0</span>
    </div> 
    `;
    newPost.appendChild(createPostInteractionWrapper);
  }
  createPostContent();
  createPostInteraction();

  postContainer.appendChild(newPost);
  postContentNewTextInput.value = "";

  if (uploadedFileParent.classList.contains("uploaded")) {
    for (let i = 0; i < uploadedFileParent.children.length; i++) {
      uploadedFileParent.children[i].classList.contains("show-uploaded-file")
        ? uploadedFileParent.children[i].remove()
        : null;
    }
    uploadedFileParent.classList.remove("uploaded");
    uploadedFileParent.children[1].innerHTML =
      '<i class="fa-solid fa-cloud-arrow-up upload-file-icon"></i>';
  }

  enableBtn();

  // Attach event listeners to the new post
  const postContent = newPost.querySelector(".post-content");
  const postInteraction = newPost.querySelector(".post-interaction");
  const removePost = newPost.querySelector(".remove-post");

  postContent.addEventListener("dblclick", showLikePost);
  postInteraction.addEventListener("click", interaction);
  removePost.addEventListener("click", removeSharedPost);
}

//  for remove existing post
function removeSharedPost(e) {
  const post = e.currentTarget.parentElement.parentElement;
  if (post == postContainer.firstElementChild) {
    postContainer.firstElementChild.classList.add("alert");
    setTimeout(() => {
      postContainer.firstElementChild.classList.remove("alert");
    }, 1500);
    return;
  } else {
    post.remove();
  }
}

//  *************** all event listener  ******************

postInteraction.addEventListener("click", interaction);
posts.forEach((eachPost) => {
  eachPost.children[1].addEventListener("dblclick", showLikePost);
});

dayNightThemeBtn.addEventListener("click", toggleTheme);

leftToggleMenuBtn.addEventListener("click", toggle);
rightMsgControlerBtn.addEventListener("click", toggle);

menuParent.forEach((ul) => {
  ul.addEventListener("click", activeMenu);
});

postContentNewTextInput.addEventListener("input", enableBtn);
showPhotoUpload.addEventListener("click", showUploadFileOption);
attachFile.addEventListener("change", uploadFile);
shareNewPostBtn.addEventListener("click", shareNewPost);
removePost.addEventListener("click", removeSharedPost);
