from PIL import Image
import os

input_path = r"assets\images\avatar.jpg"
output_path = r"assets\images\avatar.webp"

try:
    with Image.open(input_path) as img:
        img.save(output_path, "WEBP", quality=82, method=4)
    
    original_size = os.path.getsize(input_path)
    new_size = os.path.getsize(output_path)
    saving = round((1 - new_size / original_size) * 100, 1)
    
    print(f"[SUKSES] avatar.webp dibuat!")
    print(f"  Ukuran asal  : {round(original_size/1024,1)} KB")
    print(f"  Ukuran baru  : {round(new_size/1024,1)} KB")
    print(f"  Penghematan  : {saving}%")
except ImportError:
    print("[INFO] Pillow tidak tersedia. Menginstall...")
    import subprocess
    subprocess.run(["pip", "install", "Pillow", "--quiet"], check=True)
    # Coba lagi
    from PIL import Image
    with Image.open(input_path) as img:
        img.save(output_path, "WEBP", quality=82, method=4)
    print("[SUKSES] Konversi selesai!")
except Exception as e:
    print(f"[GAGAL] {e}")
