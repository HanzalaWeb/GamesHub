// main.js
let visibleCount = 30;
let searchTimeout;

function filterGames() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const selectedCategory = document.getElementById("categorySelect").value;
  const sortOrder = document.getElementById("sortSelect").value;
  const cards = document.querySelectorAll(".game-card");
  let cardsArray = Array.from(cards);

  // Sorting
  if (sortOrder === "newest") {
    cardsArray.sort((a, b) => new Date(b.dataset.release) - new Date(a.dataset.release));
  } else if (sortOrder === "oldest") {
    cardsArray.sort((a, b) => new Date(a.dataset.release) - new Date(b.dataset.release));
  }

  let shown = 0;
  let matchingCards = 0;

  cardsArray.forEach((card) => {
    const name = card.querySelector(".game-name").textContent.toLowerCase();
    const category = card.dataset.category;
    const matchesName = name.includes(searchValue);
    const matchesCategory = selectedCategory === "all" || category === selectedCategory;

    if (matchesName && matchesCategory) {
      matchingCards++;
      if (shown < visibleCount) {
        card.classList.remove("hidden");
        shown++;
      } else {
        card.classList.add("hidden");
      }
    } else {
      card.classList.add("hidden");
    }
  });

  // Show/hide load more and no results
  document.getElementById("loadMoreBtn").style.display =
    shown < matchingCards ? "inline-block" : "none";

  document.getElementById("no-results").style.display =
    matchingCards === 0 ? "block" : "none";
}

function loadMore() {
  visibleCount += 12;
  filterGames();
  window.scrollTo({
    top: document.body.scrollHeight - 800,
    behavior: "smooth"
  });
}

// Debounced search
document.getElementById("search").addEventListener("keyup", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    visibleCount = 30;
    filterGames();
  }, 300);
});

// Category change
document.getElementById("categorySelect").addEventListener("change", () => {
  visibleCount = 30;
  filterGames();
});

// Sort change
document.getElementById("sortSelect").addEventListener("change", () => {
  visibleCount = 30;
  filterGames();
});

// Dark mode toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// Initial load
window.onload = filterGames;
