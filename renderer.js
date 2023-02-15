window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".play").addEventListener("click", async () => {
    console.log(window);
    await window.versions.launch();
  });
});
