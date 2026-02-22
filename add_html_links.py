import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
page_names = [f[:-5] for f in html_files if f != 'index.html'] + ['index'] # handle all html pages

def process_file(filepath):
    print(f"Processing {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    for page in page_names:
        # Exact match
        content = re.sub(rf'href="{page}"', f'href="{page}.html"', content)
        content = re.sub(rf"href='{page}'", f"href='{page}.html'", content)
        
        # Match with hash or query params
        content = re.sub(rf'href="{page}([#?].*?)"', rf'href="{page}.html\1"', content)
        content = re.sub(rf"href='{page}([#?].*?)'", rf"href='{page}.html\1'", content)
        
        # exact window.location
        content = re.sub(rf'window\.location="{page}"', f'window.location="{page}.html"', content)
        content = re.sub(rf"window\.location='{page}'", f"window.location='{page}.html'", content)

        # with hash/query params
        content = re.sub(rf'window\.location="{page}([#?].*?)"', rf'window.location="{page}.html\1"', content)
        content = re.sub(rf"window\.location='{page}([#?].*?)'", rf"window.location='{page}.html\1'", content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'sanity' in root:
        continue
    for file in files:
        if file.endswith('.html') or file.endswith('.js'):
            process_file(os.path.join(root, file))
