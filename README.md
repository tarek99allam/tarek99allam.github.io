# Tarek Allam — IoT Engineer Digital Business Card & Portfolio 🚀

A modern, ultra-fast, and responsive digital business card / personal portfolio website designed specifically for scanning via a **QR code** on your physical business card.

Hosted 100% free with **GitHub Pages** with zero build tools or dependencies needed.

---

## 📱 Features

- **Mobile-First & Ultra-Fast**: Instant loading on mobile data when scanned from a business card.
- **One-Tap "Save to Contacts"**: Directly downloads a `.vcf` vCard contact file to save your phone, email, and title to iPhone and Android contacts with 1 tap.
- **Direct Interactive Actions**:
  - 📞 **Call**: One tap to call `+201206013114`
  - 💬 **WhatsApp**: Direct chat link prefilled with a polite introduction message.
  - ✉️ **Email**: Direct link to email `tarek99allam@gmail.com`
  - 📋 **Copy to Clipboard**: Tap any contact row to copy with toast confirmation.
- **IoT & Embedded Focus**:
  - Highlights both **Hardware (HW)** (Microcontrollers, Schematics, Sensors, PCB prototyping) and **Software (SW)** (C/C++, Python, MQTT, RTOS, Cloud).
- **Built-in QR Code Generator**: Modal showing the live QR code ready for download and print.
- **Futuristic IoT Dark Aesthetic**: Sleek glassmorphism, circuit grid accents, and cyber-cyan glow.

---

## 🛠️ Step-by-Step: How to Host on GitHub Pages (Free)

### 1. Create a Repository on GitHub
1. Go to [GitHub.com](https://github.com/) and click **New Repository**.
2. Name the repository:
   - Option A (Recommended for custom domain or user site): `tarekallam.github.io` (or your GitHub username: `<your-username>.github.io`)
   - Option B: Any project name like `card` or `iot-portfolio`
3. Keep it **Public** (required for free GitHub Pages).
4. Do **not** initialize with README or license (you already have them here).

### 2. Push this Code to GitHub
Run the following commands in this directory:

```bash
git add .
git commit -m "Initial commit: Tarek Allam IoT business card"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Open your repository on GitHub.
2. Go to **Settings** (tab at the top) > **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
4. Click **Save**.
5. Wait 1-2 minutes. Your site will be live at:
   `https://<YOUR_GITHUB_USERNAME>.github.io/<REPO_NAME>/`

---

## 🖨️ How to Print the QR Code on Your Business Card

1. Once your site is live on GitHub Pages, visit your URL on your phone or laptop.
2. Click the **QR Card** button on the website.
3. Click **Download QR Code** to save a high-resolution PNG of the QR code.
4. Hand this image to your printing press or graphic designer to place on your physical business card!

---

## ✏️ Customization (Optional)

In [`index.html`](file:///home/tito/Documents/antigravity/fervent-kepler/index.html):
- **LinkedIn Link**: Change `href="https://linkedin.com/in/"` to your exact LinkedIn handle.
- **GitHub Link**: Change `href="https://github.com/"` to your exact GitHub profile.
- **Profile Picture**: If you'd like to replace the "TA" initials badge with your photo, replace the `<span class="avatar-initials">TA</span>` inside `.avatar-core` with `<img src="your-photo.jpg" alt="Tarek Allam" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`.
