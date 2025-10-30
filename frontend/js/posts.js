const API = 'https://linkedin-backend-r9nq.onrender.com/api';
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');

// 🧠 Check login
if (!token || !user?.id) {
  alert("Please login first!");
  window.location.href = './login.html';
}

// ✅ Show user info
document.getElementById('user-info').innerText = user.username || 'Guest';

// ✅ Load feed
async function loadFeed() {
  try {
    const res = await fetch(`${API}/posts`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Failed to load feed: ${res.status}`);

    const posts = await res.json();
    const feed = document.getElementById('feed');

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

// ✅ Handle new post
document.getElementById('postForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = document.getElementById('content').value.trim();
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
    document.getElementById('content').value = '';
    await loadFeed();
  } catch (err) {
    console.error("Error creating post:", err);
  }
});

// ✅ Load feed when page opens
loadFeed();
