#  GitHub Issue Tracker

> **GitHub Issue Tracker** is a clean and responsive web application to track and manage project issues. Filter by status, search by keyword, and view detailed issue information — all in a simple and intuitive interface.

---

## 🌐 Live Demo

🔗 [Github Issue Tracker](https://github-issue-tracker-app.vercel.app/) 
---

##  Preview

[View Image](./assets/issue-tracker.png)

---

##  Features

-  **Login Page** — Simple authentication with demo credentials
-  **Issue Dashboard** — View all project issues in a card grid layout
-  **Filter by Status** — Toggle between All / Open / Closed issues
-  **Search Issues** — Search issues by title in real-time
-  **Label Badges** — Color-coded labels (Bug, Help Wanted, Enhancement, Documentation)
-  **Priority Indicators** — High / Medium / Low priority badges
-  **Issue Detail Modal** — Click any card to see full issue details
-  **Loading Spinner** — Shown while fetching data from API
-  **Fully Responsive** — Works on mobile, tablet & desktop

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
|  **HTML5** | Page structure |
|  **Tailwind CSS v4** | Utility-first styling (via CDN) |
|  **DaisyUI v5** | UI Component library |
|  **Vanilla JavaScript** | DOM manipulation & API calls |
|  **Font Awesome 7** | Icons |
|  **Geist** | Typography (Google Fonts) |
|  **REST API** | Live issue data from external server |

---

## 📁 Project Structure

```
github-issue-tracker/
├── assets/
│   ├── github-logo.png
│   ├── favicon-github.png
│   ├── Aperture.png
│   ├── Open-Status.png
│   └── Closed-Status.png
│
├── styles/
│   ├── style.css              # Custom CSS (font, btn-primary color)
│   └── tailwind_init.css      # Tailwind import
│
├── script/
│   ├── home.js                # Issue fetching, filtering, search, modal
│   └── login.js               # Login validation & redirect
│
├── index.html                 # Login page
└── home.html                  # Issue dashboard
```

---

##  Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/IamPial/github-issue-tracker.git
cd github-issue-tracker
```

**2. Open in browser**

`index.html` ফাইলটি browser-এ open করো অথবা VS Code Live Server দিয়ে চালাও।

```
index.html → home.html
```

> ⚠️ API calls সঠিকভাবে কাজ করতে **Live Server** ব্যবহার করো, সরাসরি ফাইল open করলে CORS issue হতে পারে।

---

## 🔐 Demo Credentials

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `admin123` |

---

## 🌐 API Reference

Base URL: `https://phi-lab-server.vercel.app/api/v1/lab`

| Endpoint | Method | Description |
|---|---|---|
| `/issues` | GET | সব issues fetch করে |
| `/issue/:id` | GET | একটি নির্দিষ্ট issue fetch করে |
| `/issues/search?q=keyword` | GET | Keyword দিয়ে issues search করে |

---

## ⚙️ Key Functionality

### Login (`login.js`)
- Username ও password validation
- সঠিক credentials দিলে `home.html`-এ redirect

### Issue Dashboard (`home.js`)
- **`loadIssues()`** — পেজ লোডে সব issues fetch করে
- **`showActive(id)`** — All / Open / Closed ফিল্টার করে
- **`showAllIssues(issues)`** — Issues কার্ড হিসেবে render করে
- **`generateBadgeStatus(labels)`** — Label অনুযায়ী colored badge তৈরি করে
- **`loadSingleIssues(id)`** — একটি issue-এর details fetch করে
- **`displayModal(obj)`** — Modal-এ issue details দেখায়
- **`searchIssues(text)`** — API-তে search request পাঠায়

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)

---

<p align="center">Made with ❤️ | GitHub Issue Tracker 🐛</p>
