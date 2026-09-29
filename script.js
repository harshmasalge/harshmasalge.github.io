(function () {
  var root = document.documentElement;
  document.getElementById("yr").textContent = new Date().getFullYear();
  document.getElementById("theme").addEventListener("click", function () {
    var light = root.dataset.theme
      ? root.dataset.theme === "light"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var next = dark ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
  var menu = document.getElementById("menu");
  document.getElementById("burger").addEventListener("click", function () { menu.classList.toggle("open"); });
  menu.addEventListener("click", function () { menu.classList.remove("open"); });
})();
