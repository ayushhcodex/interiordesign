import os
import re

def process_file(filepath):
    print(f"Processing {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Replace .html in href="something.html"
    def repl_href(m):
        # m.group(1) is the whole URL inside the quotes
        url = m.group(1)
        # only replace .html at the end or before ? or #
        new_url = re.sub(r'\.html(?=[#?]|$)', '', url)
        return 'href="' + new_url + '"'

    content = re.sub(r'href="([^"]*\.html[^"]*)"', repl_href, content)

    # single quotes href
    def repl_href_single(m):
        url = m.group(1)
        new_url = re.sub(r'\.html(?=[#?]|$)', '', url)
        return "href='" + new_url + "'"

    content = re.sub(r"href='([^']*\.html[^']*)'", repl_href_single, content)

    # window.location='something.html'
    def repl_loc_single(m):
        url = m.group(1)
        new_url = re.sub(r'\.html(?=[#?]|$)', '', url)
        return "window.location='" + new_url + "'"
        
    content = re.sub(r"window\.location='([^']*\.html[^']*)'", repl_loc_single, content)

    # window.location="something.html"
    def repl_loc_double(m):
        url = m.group(1)
        new_url = re.sub(r'\.html(?=[#?]|$)', '', url)
        return 'window.location="' + new_url + '"'
        
    content = re.sub(r'window\.location="([^"]*\.html[^"]*)"', repl_loc_double, content)

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
