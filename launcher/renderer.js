window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".play").addEventListener("click", async () => {
    await window.versions.launch(
      document.querySelector(".select_version").selectedOptions[0].textContent
    );
  });
});
