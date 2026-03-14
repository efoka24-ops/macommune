export function createPageUrl(jsxFileName) {
    
    const pageName = jsxFileName.replace(/\.(jsx|js|tsx|ts)$/, '').toLowerCase();
  
  // Special case for home page
  if (pageName === 'home' || pageName === 'index') {
    return '/';
  }
  
  // Convert to kebab-case if needed (e.g., "ContactUs" → "contact-us")
  // But based on your usage, it seems you're using simple lowercase names
  
  return `/${pageName}`;
    
    // Direct mapping based on your usage
    /*
    switch (pageName) {
      case 'Home':
        return '/';
      case 'Program':
        return '/program';
      case 'Join':
        return '/join';
      case 'Projects':
        return '/projects';
      case 'About':
        return '/about';
      default:
        return `/${pageName.toLowerCase()}`;
    }
    */
}