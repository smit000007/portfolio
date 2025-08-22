# Smit Malaviya - Hacker-Style Portfolio Website

A professional, responsive portfolio website with a cybersecurity/hacker aesthetic featuring dark theme, neon accents, and interactive animations.

## 🎯 Features

### Design & Aesthetics
- **Dark Theme**: Professional black background with cybersecurity vibes
- **Neon Accents**: Green (#00ff41) and blue (#00d4ff) glowing elements
- **Monospace Fonts**: JetBrains Mono and Orbitron for authentic hacker feel
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Terminal Windows**: Styled sections that look like hacker dashboards

### Interactive Elements
- **Typing Animation**: Dynamic text that cycles through cybersecurity keywords
- **Counter Animations**: Animated statistics with smooth counting effects
- **Matrix Rain Effect**: Subtle background animation with Japanese characters
- **Glitch Effects**: Hover animations on titles and key elements
- **Smooth Scrolling**: Seamless navigation between sections
- **Mobile Navigation**: Hamburger menu with smooth transitions

### Sections
1. **Hero Section**: Large intro with typing animation and action buttons
2. **About Me**: Terminal-style window with command-line interface
3. **Stats**: Animated counters showing experience and achievements
4. **Skills**: Four main skill categories with glowing cards
5. **Projects**: Hacker-style project cards with hover effects
6. **Certifications & Achievements**: Professional certifications and TryHackMe badges with rarity indicators
7. **Connect**: Social media and professional platform links
8. **Contact**: Terminal-style contact form with email alternative

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. The website will load with all animations and effects

### File Structure
```
portfolio/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
├── assets/
│   └── resume/
│       └── smit-malaviya-resume.pdf  # Resume PDF file
└── README.md           # This documentation
```

## 🎨 Customization

### Colors
The color scheme is defined in CSS variables at the top of `styles.css`:

```css
:root {
    --bg-primary: #0a0a0a;        /* Main background */
    --bg-secondary: #111111;      /* Secondary background */
    --accent-green: #00ff41;      /* Primary neon green */
    --accent-blue: #00d4ff;       /* Secondary neon blue */
    --accent-cyan: #00ffff;       /* Cyan accent */
    --accent-purple: #8a2be2;     /* Purple accent */
}
```

### Content Updates
- **Personal Info**: Update name, title, and description in `index.html`
- **Statistics**: Modify the `data-target` attributes in the stats section
- **Projects**: Add or modify project cards in the projects section
- **Skills**: Update skill descriptions and tags
- **Certifications**: Update certification names and descriptions in the certifications section
- **Badges**: Update TryHackMe badges and rarity percentages
- **Resume**: Replace `assets/resume/smit-malaviya-resume.pdf` with your actual resume
- **Social Links**: Update all social media URLs in the connect section
- **Contact**: Change email address and social media links

### Animations
- **Typing Speed**: Adjust `typingSpeed` variables in `script.js`
- **Counter Speed**: Modify the `speed` variable in `initCounterAnimation()`
- **Matrix Rain**: Change character set and timing in `initMatrixRain()`

## 🎮 Interactive Features

### Keyboard Shortcuts
- **Escape**: Close mobile navigation menu
- **Konami Code** (↑↑↓↓←→←→BA): Activates enhanced matrix rain effect

### Hover Effects
- **Buttons**: Glowing borders and transform effects
- **Cards**: Lift animations with glow effects
- **Links**: Color transitions and text shadows
- **Titles**: Glitch effect on hover

### Mobile Features
- **Responsive Navigation**: Hamburger menu for mobile devices
- **Touch Optimized**: All interactive elements work on touch devices
- **Performance**: Optimized animations for mobile performance

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Advanced styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: No frameworks, pure JavaScript for all interactions
- **Font Awesome**: Icons for social media and UI elements
- **Google Fonts**: JetBrains Mono and Orbitron typography

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- **Debounced Scroll Events**: Optimized for 60fps performance
- **Intersection Observer**: Efficient scroll-based animations
- **CSS Animations**: Hardware-accelerated animations where possible
- **Lazy Loading**: Elements animate only when visible

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

### Mobile Optimizations
- Simplified navigation with hamburger menu
- Stacked layouts for better mobile viewing
- Touch-friendly button sizes
- Optimized animations for mobile performance

## 🎯 SEO & Accessibility

### SEO Features
- Semantic HTML structure
- Meta tags for social sharing
- Descriptive alt text for images
- Clean URL structure with anchor links

### Accessibility
- Keyboard navigation support
- Screen reader friendly structure
- High contrast color scheme
- Focus indicators for interactive elements

## 🚀 Deployment

### Static Hosting
The website can be deployed to any static hosting service:

1. **GitHub Pages**: Push to a GitHub repository and enable Pages
2. **Netlify**: Drag and drop the folder to Netlify
3. **Vercel**: Connect your repository for automatic deployment
4. **AWS S3**: Upload files to an S3 bucket with static website hosting

### Custom Domain
1. Purchase a domain name
2. Configure DNS settings to point to your hosting provider
3. Update any absolute URLs in the code if necessary

## 🔒 Security Considerations

### Form Security
- The contact form is currently a demo implementation
- For production use, implement proper form handling with:
  - CSRF protection
  - Input validation
  - Rate limiting
  - Secure email delivery

### Content Security
- All external resources use HTTPS
- Font Awesome and Google Fonts are loaded from CDN
- No external scripts or tracking code included

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements that could benefit others, consider submitting a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Font Awesome** for the comprehensive icon library
- **Google Fonts** for the excellent typography options
- **CSS Grid and Flexbox** for modern layout capabilities
- **Intersection Observer API** for efficient scroll animations

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out through the contact form on the website or create an issue in the repository.

---

**Built with ❤️ and ☕ for the cybersecurity community**
