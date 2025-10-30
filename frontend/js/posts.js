const API = "https://linkedin-backend-r9nq.onrender.com/api";

// ✅ Check Login
const user = JSON.parse(localStorage.getItem("loggedUser"));
if (!user) {
  alert("Please login first!");
  window.location.href = "login.html";
}

// ✅ Display username
document.getElementById("user-info").innerText = user.name || "User";

// ✅ Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
});

// ✅ Handle Post Creation
const postForm = document.getElementById("postForm");
const feed = document.getElementById("feed");

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const content = document.getElementById("content").value.trim();

  if (!content) return alert("Post content cannot be empty!");

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        author: user.name,
        email: user.email,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById("content").value = ""; // clear textarea
      addPostToFeed(data.post || { content, author: user.name });
    } else {
      alert(data.error || "Failed to post");
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
});

// ✅ Load existing posts from backend
async function loadPosts() {
  try {
    const res = await fetch(`${API}/posts`);
    const data = await res.json();

    if (res.ok) {
      feed.innerHTML = "";
      data.forEach((p) => addPostToFeed(p));
    } else {
      feed.innerHTML = "<p>Failed to load posts.</p>";
    }
  } catch (err) {
    console.error("Error fetching posts:", err);
    feed.innerHTML = "<p>Error loading posts.</p>";
  }
}

// ✅ Display post on the page
function addPostToFeed(post) {
  const div = document.createElement("div");
  div.classList.add("post");
  div.innerHTML = `
    <div class="post-author"><i class="bi bi-person-circle"></i> ${post.author || "Anonymous"}</div>
    <div class="post-content">${post.content}</div>
  `;
  feed.prepend(div); // newest post first
}

// Load posts initially
loadPosts();
