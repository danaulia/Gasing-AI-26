// pdf-report.js — Stealth Recon
// PDF Export Utility using jsPDF + html2canvas for Zenith Prime Labs

window.exportStealthReconPDF = async function(state) {
  const { jsPDF } = window.jspdf;
  const element = document.getElementById('pdf-content');
  if (!element) {
    alert('Elemen laporan tidak ditemukan!');
    return;
  }

  // Simulasikan progress download
  const btn = document.getElementById('export-pdf-btn');
  const originalText = btn.innerHTML;
  btn.innerHTML = `<span style="animation:spin 1s linear infinite;display:inline-block;margin-right:0.25rem;">⚙️</span> Rendering PDF...`;
  btn.disabled = true;

  try {
    // Render area tersembunyi sementara agar layout stabil
    const renderArea = document.getElementById('pdf-render-area');
    renderArea.innerHTML = element.outerHTML;
    const targetElement = renderArea.firstElementChild;
    targetElement.style.position = 'relative';
    targetElement.style.left = '0';
    targetElement.style.top = '0';

    // Tambah delay kecil untuk pemuatan gambar base64 / blob
    await new Promise(resolve => setTimeout(resolve, 800));

    const canvas = await html2canvas(targetElement, {
      scale: 2, // Kualitas HD
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width / 2, canvas.height / 2] // Sesuai aspek rasio render skala 2
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width / 2, canvas.height / 2);
    const safeName = (state.targetName || 'target').toLowerCase().replace(/\s+/g, '_');
    pdf.save(`stealth_recon_report_${safeName}.pdf`);

    // Reset render area
    renderArea.innerHTML = '';
  } catch (error) {
    console.error('PDF Export Error:', error);
    alert('Gagal mengekspor PDF: ' + error.message);
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
};
