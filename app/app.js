const express = require('express');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 80;

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'argocd-demo-not-for-production',
  resave: false,
  saveUninitialized: false,
}));

app.get('/', (req, res) => {
  const banner = '<div style="background:#0369a1;color:white;padding:8px 16px;border-radius:6px;display:inline-block;margin-bottom:20px;">session-demo v2</div>';

  if (req.session.username) {
    if (!req.session.loginTime) req.session.loginTime = new Date().toISOString();
    res.send(`
      <html><body style="font-family: sans-serif; padding: 40px;">
        ${banner}
        <h1>Welcome, ${req.session.username}!</h1>
        <p>Session started at: ${req.session.loginTime}</p>
        <form method="POST" action="/logout">
          <button type="submit">Log out</button>
        </form>
      </body></html>
    `);
  } else {
    res.send(`
      <html><body style="font-family: sans-serif; padding: 40px;">
        ${banner}
        <h1>Log in</h1>
        <form method="POST" action="/login">
          <input type="text" name="username" placeholder="username" required />
          <button type="submit">Log in</button>
        </form>
      </body></html>
    `);
  }
});

app.post('/login', (req, res) => {
  req.session.username = req.body.username;
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

app.listen(port, () => console.log(`session-demo listening on port ${port}`));
