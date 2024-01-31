const toggleSidebar = document
  .getElementById("toggle-sibebar")
  .addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");
    e.currentTarget.parentElement.classList.toggle("active");
  });
