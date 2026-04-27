# Convert-Avatar-WebP.ps1
# =====================================================
# Script untuk mengkonversi avatar.jpg ke format WebP
# Membutuhkan: ImageMagick (magick) atau cwebp
# =====================================================

$InputFile  = "$PSScriptRoot\assets\images\avatar.jpg"
$OutputFile = "$PSScriptRoot\assets\images\avatar.webp"

Write-Host "`n=== WebP Avatar Converter ===" -ForegroundColor Cyan
Write-Host "Input : $InputFile"
Write-Host "Output: $OutputFile"

# Cek ukuran file asal
$originalSize = (Get-Item $InputFile).Length
Write-Host "`nUkuran asal : $([math]::Round($originalSize / 1KB, 1)) KB" -ForegroundColor Yellow

# --- Coba konversi dengan ImageMagick (magick) ---
$magickPath = Get-Command "magick" -ErrorAction SilentlyContinue
if ($magickPath) {
    Write-Host "`n[1/2] Menggunakan ImageMagick..." -ForegroundColor Green
    & magick "$InputFile" -quality 82 -define webp:lossless=false "$OutputFile"
}
# --- Fallback: coba cwebp dari libwebp ---
elseif (Get-Command "cwebp" -ErrorAction SilentlyContinue) {
    Write-Host "`n[1/2] Menggunakan cwebp..." -ForegroundColor Green
    & cwebp -q 82 "$InputFile" -o "$OutputFile"
}
# --- Fallback: Node.js dengan sharp jika tersedia ---
elseif (Get-Command "node" -ErrorAction SilentlyContinue) {
    Write-Host "`n[1/2] Mencoba via Node.js + sharp..." -ForegroundColor Green
    $nodeScript = @"
try {
    const sharp = require('sharp');
    sharp('$($InputFile.Replace('\','\\'))').webp({ quality: 82 }).toFile('$($OutputFile.Replace('\','\\'))', (err, info) => {
        if (err) { console.error('sharp error:', err.message); process.exit(1); }
        console.log('Berhasil! Output:', JSON.stringify(info));
    });
} catch(e) {
    console.error('sharp tidak tersedia:', e.message);
    process.exit(1);
}
"@
    $tmpScript = "$env:TEMP\convert_webp.js"
    $nodeScript | Out-File -FilePath $tmpScript -Encoding UTF8
    & node $tmpScript
    Remove-Item $tmpScript -ErrorAction SilentlyContinue
}
else {
    Write-Host "`n[PERHATIAN] Tidak ada tool konversi yang ditemukan." -ForegroundColor Red
    Write-Host "Silakan install salah satu:"
    Write-Host "  - ImageMagick : https://imagemagick.org/script/download.php#windows"
    Write-Host "  - libwebp     : https://developers.google.com/speed/webp/download"
    Write-Host "  - Node.js + sharp: npm install -g sharp-cli"
    Write-Host "`nAlternatif online: https://squoosh.app (drag-and-drop, export ke WebP)"
    exit 1
}

# Cek hasil
if (Test-Path $OutputFile) {
    $newSize = (Get-Item $OutputFile).Length
    $saving  = [math]::Round((1 - $newSize / $originalSize) * 100, 1)
    Write-Host "`n[SUKSES] File WebP berhasil dibuat!" -ForegroundColor Green
    Write-Host "Ukuran baru : $([math]::Round($newSize / 1KB, 1)) KB"
    Write-Host "Penghematan : $saving%" -ForegroundColor Cyan
} else {
    Write-Host "`n[GAGAL] File WebP tidak terbuat. Periksa pesan error di atas." -ForegroundColor Red
}
