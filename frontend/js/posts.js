const API = 'https://linkedin-backend-r9nq.onrender.com/api';

// 🔍 Debug log (you can remove later)
console.log("Token:", localStorage.getItem('token'));
console.log("User:", localStorage.getItem('user'));

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

// 🧠 Strict login validation
if (!token || token === "null" || token === "undefined" || !user?.name) {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  alert("Please log in first!");
  window.location.href = 'login.html';
}

// 🧾 Show user info
document.getElementById('user-info').innerText = user?.name || 'Guest';

// 📰 Load feed
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
loadFeed();

// 📝 Handle post submission
const postForm = document.getElementById('postForm');
postForm.addEventListener('submit', async e => {
  e.preventDefault();
  const content = document.getElementById('content').value.trim();

  if (!content) return alert('Post content cannot be empty!');

  try {
    const res = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });

    if (res.ok) {
      document.getElementById('content').value = '';
      loadFeed();
    } else if (res.status === 401 || res.status === 403) {
      alert('Session expired. Please log in again.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'login.html';
    } else {
      alert('Failed to post.');
    }
  } catch (err) {
    console.error("Error posting content:", err);
  }
});
