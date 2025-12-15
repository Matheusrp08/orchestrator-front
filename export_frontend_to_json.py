import os
import json

ROOT_PATH = r"C:\Users\Usuário\orquestradorpulseia\frontend"
OUTPUT_FILE = "frontend_export.json"

# Pastas que não devem ser exportadas
IGNORE_DIRS = {
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    ".vscode"
}

# Extensões que normalmente fazem sentido exportar
ALLOWED_EXTENSIONS = {
    ".js", ".ts", ".jsx", ".tsx",
    ".html", ".css", ".scss",
    ".json", ".env",
    ".md", ".txt"
}


def read_file_safe(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        return "<<Arquivo binário ou não legível>>"


def build_tree(path):
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
            tree["children"].append(build_tree(full_path))

        else:
            ext = os.path.splitext(item)[1]
            file_data = {
                "name": item,
                "type": "file",
                "extension": ext,
            }

            if ext in ALLOWED_EXTENSIONS or item in ("package.json", "tsconfig.json"):
                file_data["content"] = read_file_safe(full_path)
            else:
                file_data["content"] = "<<Ignorado>>"

            tree["children"].append(file_data)

    return tree


if __name__ == "__main__":
    project_tree = build_tree(ROOT_PATH)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(project_tree, f, indent=2, ensure_ascii=False)

    print(f"✅ Projeto exportado com sucesso para {OUTPUT_FILE}")
