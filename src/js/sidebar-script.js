const sb = document.querySelector(".sb");
const sbToggleBtn = document.querySelectorAll(".sb-toggle");
const themeBtn = document.querySelector(".theme-ch");
const themeIco = document.querySelector(".th-ico");
const themeLabel = document.querySelector(".theme-text");
const searchForm = document.querySelector(".search-form");

const modeBtn = document.getElementById("modeBtn");
const modeMenu = document.getElementById("modeMenu");
const modeText = document.getElementById("modeText");
const modeIcon = modeBtn?.querySelector(".mode-icon");

const savedTheme = localStorage.getItem("theme");
const sysPrefersDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
const shouldUseDarkTheme = savedTheme === "dark" || (!savedTheme && sysPrefersDark);

// ================= Helper =================
const updateThemeIco = () => {
    if (!themeIco && !themeLabel) return;

    const isDark = document.body.classList.contains("dark-theme");
    const sbClosed = sb.classList.contains("closed");

    if (themeIco) {
        themeIco.textContent = sbClosed
            ? (isDark ? "light_mode" : "dark_mode")
            : "dark_mode";
    }

    if (themeLabel && !sbClosed) {
        themeLabel.textContent = isDark ? "Dark Mode" : "Light Mode";
    }
};

const applyMode = (mode) => {
    const isDark = mode === "dark";
    document.body.classList.toggle("dark-theme", isDark);

    if (modeText) modeText.textContent = isDark ? "Dark" : "Light";
    if (modeIcon) modeIcon.textContent = isDark ? "dark_mode" : "light_mode";

    updateThemeIco();
};

// ================= Init Theme =================
applyMode(savedTheme || (sysPrefersDark ? "dark" : "light"));

// ================= Sidebar Toggle =================
sbToggleBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        sb.classList.toggle("closed");
        updateThemeIco();
    });
});

// ================= Search Form =================
searchForm?.addEventListener("click", () => {
    if (sb.classList.contains("closed")) {
        sb.classList.remove("closed");
        searchForm.querySelector("input")?.focus();
    }
});

// ================= Sidebar Theme Button =================
themeBtn?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    applyMode(isDark ? "dark" : "light");
});

// ================= Mode Dropdown =================
if (modeBtn && modeMenu && modeText) {
    modeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = modeMenu.style.display === "block";
        modeMenu.style.display = isOpen ? "none" : "block";
        modeBtn.classList.toggle("open", !isOpen); // تحريك الـ chevron
    });

    modeMenu.querySelectorAll("li").forEach(item => {
        item.addEventListener("click", () => {
            const selected = item.dataset.mode;
            applyMode(selected);
            localStorage.setItem("theme", selected);
            modeMenu.style.display = "none";
            modeBtn.classList.remove("open"); // إعادة الـ chevron للوضع الأصلي
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".mode-dropdown")) {
            modeMenu.style.display = "none";
            modeBtn.classList.remove("open"); // إعادة الـ chevron للوضع الأصلي
        }
    });
}

// ================= Default Sidebar State =================
if (window.innerWidth > 768) sb.classList.add("closed");