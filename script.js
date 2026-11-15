/**
 * Tarek Allam - Digital Business Card Logic
 */

// Set Current Year dynamically
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  setupQrCode();
});

/**
 * Fast Save Contact Handler
 * 1. Web Share Level 2 (navigator.share with File): Directly triggers OS native Contact import sheet without disk download.
 * 2. Direct Navigation to tarek_allam.vcf (window.location.href): Mobile browsers pass .vcf straight to Contacts app.
 */
async function saveContact() {
  const vcardText = `BEGIN:VCARD
VERSION:3.0
N:Allam;Tarek;;;
FN:Tarek Allam (Tito)
ORG:IoT Engineering & Smart Home Solutions
TITLE:IoT Engineer & Smart Home Expert (HW/SW)
TEL;TYPE=CELL,VOICE,PREF:+201206013114
EMAIL;TYPE=INTERNET,PREF:tarek99allam@gmail.com
URL;TYPE=WORK:https://tarek99allam.github.io/
X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/tarek1999allam/
NOTE:IoT Engineer & Smart Home Expert | Hardware Design, Firmware, Zigbee & Automation
END:VCARD`;

  // 1. Try Web Share API Level 2 (Directly invokes iOS / Android Contacts Import)
  if (navigator.share && navigator.canShare) {
    try {
      const file = new File([vcardText], "Tarek_Allam.vcf", { type: "text/vcard" });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Tarek Allam",
          text: "Tarek Allam - IoT Engineer & Smart Home Expert"
        });
        showToast("Opening contacts...");
        return;
      }
    } catch (err) {
      if (err.name === "AbortError") {
        return; // User cancelled the native sheet
      }
      console.log("Web Share fallback:", err);
    }
  }

  // 2. Direct navigation to tarek_allam.vcf without forcing <a download>
  // Mobile Safari & Android Chrome automatically intercept .vcf and open the Contacts app directly.
  window.location.href = "tarek_allam.vcf";
  showToast("Opening contacts...");
}

/**
 * Copy Text to Clipboard with visual feedback
 */
function copyToClipboard(text, message) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(message || "Copied to clipboard!"))
      .catch(() => fallbackCopy(text, message));
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(message || "Copied to clipboard!");
  } catch (err) {
    showToast("Failed to copy");
  }
  document.body.removeChild(textArea);
}

/**
 * Toast notification
 */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  
  toast.textContent = message;
  toast.classList.add("show");
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/**
 * QR Code Modal Setup & Generation (Supports Direct Contact QR & Website QR)
 */
let currentTab = 'contact';

function setupQrCode() {
  switchQrTab('contact');
}

function switchQrTab(tab) {
  currentTab = tab;
  const tabContact = document.getElementById("tabContactQr");
  const tabWebsite = document.getElementById("tabWebsiteQr");
  const instruction = document.getElementById("qrInstructionText");
  const targetText = document.getElementById("qrTargetUrlText");
  const qrImage = document.getElementById("qrImage");
  const downloadBtn = document.getElementById("downloadQrBtn");

  if (!tabContact || !tabWebsite || !qrImage) return;

  if (tab === 'contact') {
    tabContact.classList.add("active");
    tabWebsite.classList.remove("active");
    instruction.textContent = "امسحه بكاميرا أي هاتف ليفتح جهات الاتصال ويسجل رقمك فوراً بدون فتح متصفح أو تنزيل!";
    
    // Direct VCard QR format recognized natively by iOS Camera & Android Google Lens
    const vcardString = `BEGIN:VCARD\nVERSION:3.0\nN:Allam;Tarek\nFN:Tarek Allam (Tito)\nORG:IoT & Smart Home\nTITLE:IoT Engineer & Smart Home Expert (HW/SW)\nTEL:+201206013114\nEMAIL:tarek99allam@gmail.com\nURL:https://tarek99allam.github.io/\nEND:VCARD`;
    
    targetText.textContent = "⚡ Direct Contact: Tarek Allam (+201206013114)";
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=450x450&margin=15&format=png&data=${encodeURIComponent(vcardString)}`;
    qrImage.src = qrUrl;
    if (downloadBtn) {
      downloadBtn.href = qrUrl;
      downloadBtn.setAttribute("download", "tarek-allam-contact-qr.png");
    }
  } else {
    tabWebsite.classList.add("active");
    tabContact.classList.remove("active");
    instruction.textContent = "امسحه بكاميرا الهاتف ليفتح موقعك الشخصي والداتا الخاصة بك بالكامل:";
    
    const siteUrl = "https://tarek99allam.github.io/";
    targetText.textContent = siteUrl;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=450x450&margin=15&format=png&data=${encodeURIComponent(siteUrl)}`;
    qrImage.src = qrUrl;
    if (downloadBtn) {
      downloadBtn.href = qrUrl;
      downloadBtn.setAttribute("download", "tarek-allam-website-qr.png");
    }
  }
}

function toggleQrModal() {
  const modal = document.getElementById("qrModal");
  if (modal) {
    modal.classList.toggle("active");
  }
}

function closeQrModalOnBackdrop(e) {
  if (e.target.id === "qrModal") {
    toggleQrModal();
  }
}
