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
 * Download/Save Contact as VCF
 */
function saveContact() {
  const vcardData = `BEGIN:VCARD
VERSION:3.0
N:Allam;Tarek;;;
FN:Tarek Allam
ORG:IoT & Embedded Systems
TITLE:IoT Engineer (HW/SW)
TEL;TYPE=CELL,VOICE,PREF:+201206013114
EMAIL;TYPE=INTERNET,PREF:tarek99allam@gmail.com
NOTE:IoT Engineer | Hardware Prototyping & Software Connectivity | Embedded Systems
URL:${window.location.href}
END:VCARD`;

  const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Tarek_Allam.vcf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showToast("Contact card downloaded!");
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
 * QR Code Modal Setup & Generation
 */
function setupQrCode() {
  // Determine site URL - if local file, provide instructions/fallback
  let currentUrl = window.location.href;
  if (currentUrl.startsWith("file://") || currentUrl.includes("localhost") || currentUrl.includes("127.0.0.1")) {
    currentUrl = "https://<your-username>.github.io/<repo-name>/";
  }

  const qrTargetUrlText = document.getElementById("qrTargetUrlText");
  const qrImage = document.getElementById("qrImage");
  const downloadQrBtn = document.getElementById("downloadQrBtn");

  if (qrTargetUrlText) {
    qrTargetUrlText.textContent = currentUrl;
  }

  // Use reliable high-resolution QR service
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=15&format=png&data=${encodeURIComponent(currentUrl)}`;

  if (qrImage) {
    qrImage.src = qrApiUrl;
  }

  if (downloadQrBtn) {
    downloadQrBtn.href = qrApiUrl;
    downloadQrBtn.target = "_blank";
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
