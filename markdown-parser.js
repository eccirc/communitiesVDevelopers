// Reusable Markdown Parser
// This script looks for a data-markdown attribute on elements or loads content.md by default

async function loadAndParseMarkdown() {
    try {
        // Find the content container
        const contentElement = document.getElementById('content');
        
        if (!contentElement) {
            console.error('No element with id="content" found');
            return;
        }

        // Get markdown file path from data attribute or use default
        const markdownFile = contentElement.getAttribute('data-markdown') || 'content.md';
        
        // Fetch the markdown file
        const response = await fetch(markdownFile);
        
        if (!response.ok) {
            throw new Error(`Failed to load ${markdownFile}: ${response.status}`);
        }
        
        const markdown = await response.text();
        
        // Configure marked options for clean HTML output
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false
        });
        
        // Convert markdown to HTML
        const html = marked.parse(markdown);
        
        // Insert the HTML into the page
        contentElement.innerHTML = html;
        
        console.log('Markdown loaded successfully from:', markdownFile);
        
    } catch (error) {
        console.error('Error loading markdown:', error);
        
        const contentElement = document.getElementById('content');
        if (contentElement) {
            contentElement.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #c00;">
                    <h2>Error Loading Content</h2>
                    <p>Could not load the markdown file. Please ensure the file exists in the same directory.</p>
                    <p style="color: #666; font-size: 0.9rem;">Error: ${error.message}</p>
                </div>
            `;
        }
    }
}

// Load markdown when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAndParseMarkdown);
} else {
    loadAndParseMarkdown();
}
