import os
import json

# =========================
# CONFIGURAÇÕES
# =========================
ROOT_PATH_FRONTEND = r"C:\Users\Usuário\orquestradorpulseia\frontend"
ROOT_PATH_BACKEND = r"C:\Users\Usuário\orquestradorpulseia\orchestrator"
OUTPUT_FILE = "deploy_config.json"

# Pastas que queremos ignorar
IGNORE_DIRS = {"node_modules", ".git", "dist", "build", ".next", ".vscode", "__pycache__"}

# Arquivos de configuração relevantes
CONFIG_FILES = {
    "frontend": ["package.json", "vercel.json", ".env", "tsconfig.json"],
    "backend": ["fly.toml", "application.properties", "application.yml", ".env", "pom.xml", "build.gradle"]
}

ALLOWED_EXTENSIONS = {
    ".js", ".ts", ".jsx", ".tsx", ".html", ".css", ".scss",
    ".json", ".env", ".toml", ".yml", ".yaml", ".properties", ".md", ".txt"
}

# =========================
# FUNÇÕES
# =========================
def read_file_safe(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        return "<<Arquivo binário ou não legível>>"

def build_tree(path, allowed_files=None):
    tree = {
        "name": os.path.basename(path),
        "type": "directory",
        "children": []
    }

    for item in os.listdir(path):
        full_path = os.path.join(path, item)

        if os.path.isdir(full_path):
            if item in IGNORE_DIRS:
                continue
            tree["children"].append(build_tree(full_path, allowed_files))

        else:
            ext = os.path.splitext(item)[1]
            file_data = {
                "name": item,
                "type": "file",
                "extension": ext,
            }

            if (allowed_files and item in allowed_files) or ext in ALLOWED_EXTENSIONS:
                file_data["content"] = read_file_safe(full_path)
            else:
                file_data["content"] = "<<Ignorado>>"

            tree["children"].append(file_data)

    return tree

# =========================
# EXECUÇÃO PRINCIPAL
# =========================
def main():
    frontend_tree = build_tree(ROOT_PATH_FRONTEND, CONFIG_FILES["frontend"])
    backend_tree = build_tree(ROOT_PATH_BACKEND, CONFIG_FILES["backend"])

    output = {
        "frontend": {
            "root_path": os.path.abspath(ROOT_PATH_FRONTEND),
            "files": frontend_tree
        },
        "backend": {
            "root_path": os.path.abspath(ROOT_PATH_BACKEND),
            "files": backend_tree
        }
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"✅ JSON de deploy combinado gerado com sucesso: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
