import os
import json

# =========================
# CONFIGURAÇÕES
# =========================
ROOT_PATH_FRONTEND = r"C:\Users\Usuário\orquestradorpulseia\frontend"
ROOT_PATH_BACKEND = r"C:\Users\Usuário\orquestradorpulseia\orchestrator"
OUTPUT_FILE = "deploy_config_min_safe.json"

# Pastas a ignorar
IGNORE_DIRS = {"node_modules", ".git", "dist", "build", ".next", ".vscode", "__pycache__"}

# Arquivos essenciais para deploy
CONFIG_FILES = {
    "frontend": ["vercel.json", ".env"],
    "backend": ["fly.toml", ".env"]
}

# =========================
# FUNÇÕES
# =========================
def read_file_safe(path):
    try:
        # Ignora arquivos muito grandes
        if os.path.getsize(path) > 50_000:  # >50KB
            return "<<Arquivo muito grande>>"
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        return "<<Arquivo não legível>>"

def collect_configs(root_path, allowed_files):
    collected = {}
    for dirpath, dirnames, filenames in os.walk(root_path):
        # Remove pastas ignoradas
        dirnames[:] = [d for d in dirnames if d not in IGNORE_DIRS]

        for filename in filenames:
            if filename in allowed_files:
                full_path = os.path.join(dirpath, filename)
                relative_path = os.path.relpath(full_path, root_path)
                collected[relative_path] = read_file_safe(full_path)
    return collected

# =========================
# EXECUÇÃO PRINCIPAL
# =========================
def main():
    frontend_configs = collect_configs(ROOT_PATH_FRONTEND, CONFIG_FILES["frontend"])
    backend_configs = collect_configs(ROOT_PATH_BACKEND, CONFIG_FILES["backend"])

    output = {
        "frontend": {
            "root_path": os.path.abspath(ROOT_PATH_FRONTEND),
            "config_files": frontend_configs
        },
        "backend": {
            "root_path": os.path.abspath(ROOT_PATH_BACKEND),
            "config_files": backend_configs
        }
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False)

    print(f"✅ JSON de deploy seguro gerado: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
