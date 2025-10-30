const API = 'https://linkedin-backend-r9nq.onrender.com/api';

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

// ✅ Strict login validation
if (!token || token === "null" || token === "undefined" || !user?.name) {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  alert("Please log in first!");
  window.location.href = 'login.html';
}

// 🧠 Show user info on navbar
document.getElementById('user-info').innerText = user?.name || 'Guest';

// ✅ Load feed
async function loadFeed() {
  try {
    const res = await fetch(`${API}/posts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error(`Failed to load feed: ${res.status}`);
    const posts = await res.json();

    const feed = document.getElementById('feed');
    if (!Array.isArray(posts)) throw new Error('Posts response is not an array');

    feed.innerHTML = posts.map(p => `
      <div class="post">
        <h4>${p.name}</h4>
        <p>${p.content}</p>
        <small>${new Date(p.created_at).toLocaleString()}</small>
      </div>
    `).join('');
  } catch (err) {
    console.error("Error loading feed:", err);
  }
}

// ✅ Handle new post submission
document.getElementById('post-btn')?.addEventListener('click', async () => {
  const content = document.getElementById('post-content').value.trim();
  if (!content) return alert("Please enter something to post!");

  try {
    const res = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });

    if (!res.ok) throw new Error(`Failed to post: ${res.status}`);
    document.getElementById('post-content').value = '';
    await loadFeed(); // reload feed after posting
  } catch (err) {
    console.error("Error creating post:", err);
  }
});

// ✅ Load feed on page load
loadFeed();
