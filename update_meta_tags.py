import os
import re

updates = {
    'index.html': {
        'title': 'Luxury Interior Designers | Serving Davanagere, Shivamogga, Hubli & More',
        'desc': "Ratnakala Interiors — Central Karnataka's premier interior design studio crafting timeless luxury spaces across Davanagere, Harihara, Chitradurga, Shimoga, Haveri, Hubli-Dharwad, Hampi, Chikkamagaluru, and Ballari."
    },
    'about.html': {
        'title': 'About Ratnakala Interiors | Top Interior Designers in Central Karnataka',
        'desc': 'Learn about Ratnakala Interiors, the leading luxury interior design studio based in Davanagere, serving Shimoga, Chitradurga, Hubli-Dharwad, Bellary and beyond.'
    },
    'services.html': {
        'title': 'Interior Design Services | Davanagere, Shimoga, Hubli-Dharwad',
        'desc': 'Explore our bespoke interior design services across Central Karnataka. We offer 3D visualization, space planning, bespoke furniture, and complete renovations.'
    },
    'portfolio.html': {
        'title': 'Interior Design Portfolio | Project Gallery Karnataka',
        'desc': 'View our extensive portfolio of luxury residential and commercial interior design projects crafted in Davanagere, Shimoga, Hubli-Dharwad, Chitradurga, and beyond.'
    },
    'design-ideas.html': {
        'title': 'Interior Design Ideas & Inspiration | Ratnakala Interiors',
        'desc': 'Discover trending interior design ideas, modern bedroom concepts, and luxury kitchen inspirations from the leading designers in Central Karnataka.'
    },
    'blog.html': {
        'title': 'Interior Design Blog | Insights from Experts',
        'desc': 'Read the latest interior design trends, tips, and insights from the expert team at Ratnakala Interiors serving Davanagere, Shimoga, Hubli, and Bellary.'
    },
    'blog-post.html': {
        'title': 'Interior Design Article | Ratnakala Interiors',
        'desc': 'Read our in-depth article on interior design strategies, aesthetics, and implementation tips directly from our Central Karnataka studio experts.'
    },
    'contact.html': {
        'title': 'Contact Ratnakala Interiors | Interior Design Studio',
        'desc': 'Get in touch with Ratnakala Interiors. Visit our design studios in Davanagere and Channagiri, or contact us for projects in Shimoga, Hubli-Dharwad, Chitradurga, Hampi, and Ballari.'
    },
    'trialllll.html': { # updating just in case
        'title': 'Luxury Interior Designers | Serving Davanagere, Shivamogga, Hubli & More',
        'desc': "Ratnakala Interiors — Central Karnataka's premier interior design studio crafting timeless luxury spaces across Davanagere, Harihara, Chitradurga, Shimoga, Haveri, Hubli-Dharwad, Hampi, Chikkamagaluru, and Ballari."
    }
}

for filename, meta in updates.items():
    if not os.path.exists(filename):
        print(f"File {filename} not found.")
        continue
        
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace title
    title_pattern = r'<title>.*?</title>'
    if re.search(title_pattern, content, re.IGNORECASE | re.DOTALL):
        content = re.sub(title_pattern, f'<title>{meta["title"]}</title>', content, flags=re.IGNORECASE | re.DOTALL)
    else:
        print(f"No <title> tag found in {filename}")

    # Replace description
    desc_pattern = r'<meta\s+name="description"\s+content="[^"]*"\s*>'
    if re.search(desc_pattern, content, re.IGNORECASE):
        content = re.sub(desc_pattern, f'<meta name="description" content="{meta["desc"]}">', content, flags=re.IGNORECASE)
    else:
        # Some are multi-line
        desc_pattern_multi = r'<meta\s+name="description"\s*\n?\s*content="[^"]*"\s*>'
        if re.search(desc_pattern_multi, content, re.IGNORECASE):
            content = re.sub(desc_pattern_multi, f'<meta name="description" content="{meta["desc"]}">', content, flags=re.IGNORECASE)
        else:
            print(f"No description meta tag found in {filename}")
            
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {filename}")
