(function () { 
    var root = document.documentElement; 
    
    // 1. Load saved theme, default to "light" if nothing is stored
    var savedTheme = "light";
    try {
        savedTheme = localStorage.getItem("theme") || "light";
    } catch (e) {}
    root.dataset.theme = savedTheme;

    // Set the current year
    document.getElementById("yr").textContent = new Date().getFullYear(); 
    
    // Theme toggle logic
    document.getElementById("theme").addEventListener("click", function () { 
        // Determine the next theme based on the current active theme
        var currentTheme = root.dataset.theme || "light";
        var next = currentTheme === "dark" ? "light" : "dark"; 
        
        root.dataset.theme = next; 
        try { 
            localStorage.setItem("theme", next); 
        } catch (e) {} 
    }); 
    
    // Mobile menu logic
    var menu = document.getElementById("menu"); 
    document.getElementById("burger").addEventListener("click", function () { 
        menu.classList.toggle("open"); 
    }); 
    menu.addEventListener("click", function () { 
        menu.classList.remove("open"); 
    }); 
})();
