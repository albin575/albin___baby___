const categories = ["All", "Wedding", "Portrait", "Travel", "Street", "Nature"];
const gallerySeeds = [
  "1519741497674-611481863552",
  "1492691527719-9d1e07e534b4",
  "1500530855697-b586d89ba3ee",
  "1524504388940-b1c1722653e1",
  "1520854221256-17451cc331bf",
  "1516589178581-6cd7833ae3b2",
  "1504593811423-6dd665756598",
  "1487412720507-e7ab37603c6f",
  "1511285560929-80b456fea0bc",
  "1517841905240-472988babdf9"
];

const categoryCopy = {
  Wedding: "Soft rituals, warm gold, quiet emotions.",
  Portrait: "Presence, light falloff, and intimate focus.",
  Travel: "Wide landscapes and slow-moving stories.",
  Street: "Unexpected frames from ordinary moments.",
  Nature: "Texture, atmosphere, and natural stillness."
};

const portfolioGrid = document.querySelector("#portfolioGrid");
const featuredWorks = document.querySelector("#featuredWorks");
const latestPosts = document.querySelector("#latestPosts");
const blogList = document.querySelector("#blogList");
const portfolioFilters = document.querySelector("#portfolioFilters");
const portfolioSearch = document.querySelector("#portfolioSearch");
const blogSearch = document.querySelector("#blogSearch");
const blogCategory = document.querySelector("#blogCategory");
const portfolioCount = document.querySelector("#portfolioCount");
const blogCount = document.querySelector("#blogCount");
const loadMorePhotos = document.querySelector("#loadMorePhotos");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxCategory = document.querySelector("#lightboxCategory");
const lightboxClose = document.querySelector("#lightboxClose");
const postModal = document.querySelector("#postModal");
const postModalImage = document.querySelector("#postModalImage");
const postModalMeta = document.querySelector("#postModalMeta");
const postModalTitle = document.querySelector("#postModalTitle");
const postModalContent = document.querySelector("#postModalContent");
const postModalClose = document.querySelector("#postModalClose");
const themeToggle = document.querySelector("#themeToggle");
const photoAdminForm = document.querySelector("#photoAdminForm");
const blogAdminForm = document.querySelector("#blogAdminForm");
const contactForm = document.querySelector(".contact-form");

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const locationTags = ["Kochi", "Munnar", "Varkala", "Jaipur", "Leh", "Fort Kochi", "Alleppey", "Goa"];
const moodTags = ["Moody", "Soft Light", "Golden Hour", "Monochrome", "Rain Story", "Quiet Luxury"];

const state = {
  portfolioCategory: "All",
  portfolioQuery: "",
  portfolioVisible: 20,
  blogQuery: "",
  blogCategory: "All"
};

const photoLibrary = Array.from({ length: 1500 }, (_, index) => {
  const category = categories[(index % (categories.length - 1)) + 1];
  const seed = gallerySeeds[index % gallerySeeds.length];
  const location = locationTags[index % locationTags.length];
  const mood = moodTags[index % moodTags.length];

  return {
    id: index + 1,
    title: ${category} Frame ${String(index + 1).padStart(4, "0")},
    category,
    location,
    mood,
    image: https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${800 + (index % 5) * 40}&q=80,
    alt: ${category} photography frame from ${location} with ${mood.toLowerCase()} mood
  };
});

const blogPosts = Array.from({ length: 1000 }, (_, index) => {
  const category = categories[(index % (categories.length - 1)) + 1];
  const seed = gallerySeeds[(index + 3) % gallerySeeds.length];
  const location = locationTags[(index + 2) % locationTags.length];
  const mood = moodTags[(index + 1) % moodTags.length];
  const month = monthNames[index % monthNames.length];
  const day = ((index % 27) + 1).toString().padStart(2, "0");
  const date = ${day} ${month} 2026;
  return {
    id: index + 1,
    title: ${category} Story ${String(index + 1).padStart(4, "0")},
    category,
    cover_image: https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=1200&q=80,
    date,
    tags: [category, location, mood],
    content: ${location}-ൽ പകർത്തിയ ഈ ${category.toLowerCase()} കഥ, light-ന്റെ rhythm-വും real emotion-ന്റെ texture-വും ചേർത്ത് എഴുതിയ visual journal ആണ്. ${mood} palette ഉപയോഗിച്ച് frame-കളെ കൂടുതൽ intimate ആക്കുകയും, story-യുടെ pace slow cinema പോലെ തോന്നുന്ന തരത്തിൽ edit ചെയ്യുകയും ചെയ്തു.
  };
});

function createFilterChips() {
  portfolioFilters.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = filter-chip${state.portfolioCategory === category ? " is-active" : ""};
    button.textContent = category;
    button.addEventListener("click", () => {
      state.portfolioCategory = category;
      state.portfolioVisible = 20;
      createFilterChips();
      renderPortfolio();
    });
    portfolioFilters.append(button);
  });
}

function populateBlogCategories() {
  categories
    .filter((category) => category !== "All")
    .forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      blogCategory.append(option);
    });
}

function getFilteredPhotos() {
  return photoLibrary.filter((photo) => {
    const matchCategory = state.portfolioCategory === "All"  photo.category === state.portfolioCategory;
    const query = state.portfolioQuery.trim().toLowerCase();
    const matchQuery =
      !query 
      photo.title.toLowerCase().includes(query) 
      photo.location.toLowerCase().includes(query) 
      photo.mood.toLowerCase().includes(query);

    return matchCategory && matchQuery;
  });
}

function renderFeaturedWorks() {
  featuredWorks.innerHTML = photoLibrary.slice(0, 3).map((photo) => `
    <article class="portfolio-card">
      <button type="button" data-photo-id="${photo.id}">
        <div class="portfolio-card-media">
          <img src="${photo.image}" alt="${photo.alt}" loading="lazy">
          <div class="portfolio-card-overlay">
            <span>${photo.location}</span>
          </div>
        </div>
        <div class="portfolio-card-copy">
          <p>${photo.category}</p>
          <h3>${photo.title}</h3>
        </div>
      </button>
    </article>
  `).join("");
}

function renderLatestPosts() {
  latestPosts.innerHTML = blogPosts.slice(0, 3).map((post) => `
    <article class="blog-preview-card">
      <button class="blog-trigger" type="button" data-post-id="${post.id}">
        <img src="${post.cover_image}" alt="${post.title}" loading="lazy">
        <div class="blog-preview-copy">
          <span class="blog-meta">${post.category} / ${post.date}</span>
          <h3>${post.title}</h3>
          <p>${post.content.slice(0, 115)}...</p>
        </div>
      </button>
    </article>
  `).join("");
}

function bindPhotoTriggers() {
  document.querySelectorAll("[data-photo-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const photo = photoLibrary.find((item) => item.id === Number(button.dataset.photoId));

      if (!photo) {
        return;
      }

      lightboxImage.src = photo.image;
      lightboxImage.alt = photo.alt;
      lightboxCategory.textContent = photo.category;
      lightboxTitle.textContent = `${photo.title} / ${photo.location}`;
      lightbox.showModal();
    });
  });
}

function renderPortfolio() {
  const filteredPhotos = getFilteredPhotos();
  const visiblePhotos = filteredPhotos.slice(0, state.portfolioVisible);
  portfolioGrid.innerHTML = visiblePhotos.map((photo) => `
    <article class="portfolio-card">
      <button type="button" data-photo-id="${photo.id}">
        <div class="portfolio-card-media">
          <img src="${photo.image}" alt="${photo.alt}" loading="lazy">
          <div class="portfolio-card-overlay">
            <span>${photo.location} / ${photo.mood}</span>
          </div>
        </div>
        <div class="portfolio-card-copy">
          <p>${photo.category}</p>
          <h3>${photo.title}</h3>
          <span>${categoryCopy[photo.category]}</span>
        </div>
      </button>
    </article>
  `).join("");

  portfolioCount.textContent = `${visiblePhotos.length} of ${filteredPhotos.length} frames loaded`;
  loadMorePhotos.hidden = visiblePhotos.length >= filteredPhotos.length;
  bindPhotoTriggers();
}

function getFilteredPosts() {
  return blogPosts.filter((post) => {
    const query = state.blogQuery.trim().toLowerCase();
    const matchCategory = state.blogCategory === "All"  post.category === state.blogCategory;
    const matchQuery =
      !query 
      post.title.toLowerCase().includes(query) 
      post.content.toLowerCase().includes(query) 
      post.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchCategory && matchQuery;
  });
}

function bindPostTriggers() {
  document.querySelectorAll(".blog-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      const post = blogPosts.find((item) => item.id === Number(button.dataset.postId));

      if (!post) {
        return;
      }

      postModalImage.src = post.cover_image;
      postModalImage.alt = post.title;
      postModalMeta.textContent = ${post.category} / ${post.date} / ${post.tags.join(" • ")};
      postModalTitle.textContent = post.title;
      postModalContent.textContent = ${post.content} ഈ article single blog page experience പോലെ fullscreen modal-ിൽ കാണിക്കുന്നതിനാൽ, long-form storytelling uninterrupted ആയി വായിക്കാൻ സാധിക്കും.;
      postModal.showModal();
    });
  });
}

function renderBlogPosts() {
  const filteredPosts = getFilteredPosts();

  blogList.innerHTML = filteredPosts.slice(0, 24).map((post) => `
    <article class="blog-card">
      <button class="blog-trigger" type="button" data-post-id="${post.id}">
        <img src="${post.cover_image}" alt="${post.title}" loading="lazy">
        <div class="blog-card-copy">
          <span class="blog-meta">${post.category} / ${post.date}</span>
          <h3>${post.title}</h3>
          <p>${post.content.slice(0, 150)}...</p>
        </div>
      </button>
    </article>
  `).join("");

  blogCount.textContent = `${filteredPosts.length} stories found`;
  bindPostTriggers();
}

function setupHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  let current = 0;

  setInterval(() => {
    slides[current].classList.remove("is-active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("is-active");
  }, 4500);
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupEvents() {
  portfolioSearch.addEventListener("input", (event) => {
    state.portfolioQuery = event.target.value;
    state.portfolioVisible = 20;
    renderPortfolio();
  });

  blogSearch.addEventListener("input", (event) => {
    state.blogQuery = event.target.value;
    renderBlogPosts();
  });

  blogCategory.addEventListener("change", (event) => {
    state.blogCategory = event.target.value;
    renderBlogPosts();
  });

  loadMorePhotos.addEventListener("click", () => {
    state.portfolioVisible += 20;
    renderPortfolio();
  });

  let loadingMore = false;
  window.addEventListener("scroll", () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 800;

    if (nearBottom && !loadMorePhotos.hidden && !loadingMore) {
      loadingMore = true;
      state.portfolioVisible += 12;
      renderPortfolio();
      window.setTimeout(() => {
        loadingMore = false;
      }, 120);
    }
  });

  lightboxClose.addEventListener("click", () => lightbox.close());
  postModalClose.addEventListener("click", () => postModal.close());

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
    document.body.dataset.theme = nextTheme;
    themeToggle.firstElementChild.textContent = nextTheme === "light" ? "Light" : "Dark";
  });

  photoAdminForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(photoAdminForm);

    photoLibrary.unshift({
      id: photoLibrary.length + 1,
      title: formData.get("title"),
      category: formData.get("category"),
      location: "New Upload",
      mood: "Curated",
      image: formData.get("image"),
      alt: ${formData.get("category")} photography upload
    });

    state.portfolioVisible += 1;
    renderFeaturedWorks();
    renderPortfolio();
    photoAdminForm.reset();
  });

  blogAdminForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(blogAdminForm);

    blogPosts.unshift({
      id: blogPosts.length + 1,
      title: formData.get("title"),
      category: formData.get("category"),
      cover_image: formData.get("image"),
      date: "Today",
      tags: [formData.get("category"), "Admin Upload", "Fresh Story"],
      content: formData.get("content")
    });

    renderLatestPosts();
    renderBlogPosts();
    blogAdminForm.reset();
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = contactForm.querySelector("button");
    const originalLabel = button.textContent;
    button.textContent = "Message Sent";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalLabel;
      button.disabled = false;
      contactForm.reset();
    }, 1800);
  });
}

createFilterChips();
populateBlogCategories();
renderFeaturedWorks();
renderLatestPosts();
renderPortfolio();
renderBlogPosts();
setupHeroSlider();
setupReveal();
setupEvents();
