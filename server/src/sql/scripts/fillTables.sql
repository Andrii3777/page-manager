-- Insert pages into the page table
INSERT INTO
    page (
        title,
        metaDescription,
        content,
        urlSlug
    )
VALUES
-- About Us
(
    'About Us',
    'Learn more about us on this page.',
    '<h1>About Us</h1><p>Our company is built on values of integrity, innovation, and excellence. Our team of experts is committed to providing the best solutions for our clients.</p><h2>Our Mission</h2><p>To deliver outstanding products and services that exceed customer expectations.</p><h2>Our Vision</h2><p>To be a global leader in our industry by fostering innovation and sustainability.</p>',
    'about'
),

-- Contact Page
(
    'Contact',
    'Contact us through this page.',
    '<h1>Contact Us</h1><p>If you have any questions or concerns, feel free to contact us. We value your feedback and are here to assist you.</p><h2>Contact Information</h2><p>Email: support@company.com</p><p>Phone: +1 (555) 123-4567</p><h2>Our Location</h2><p>123 Business Street, Suite 456<br>Cityville, State, 78901</p>',
    'contact'
),

-- Services Page
(
    'Our Services',
    'Explore the wide range of services we offer.',
    '<h1>Our Services</h1><p>We provide top-notch services designed to meet the unique needs of our clients. From consultation to implementation, we\'ve got you covered.</p><h2>Key Services</h2><ul><li>Custom software development</li><li>IT consulting</li><li>Cloud solutions</li><li>Data analytics</li></ul><p>Our team is equipped with the latest tools and technologies to deliver high-quality results.</p>',
    'services'
),

-- Blog Page
(
    'Blog',
    'Stay updated with the latest news and articles.',
    '<h1>Our Blog</h1><p>Welcome to our blog! Here, we share insights, tips, and stories from our industry. Stay informed with our latest articles:</p><ul><li><a href="/blog/tech-trends">Tech Trends to Watch</a></li><li><a href="/blog/productivity-tips">Productivity Tips for Professionals</a></li><li><a href="/blog/customer-success">Customer Success Stories</a></li></ul><p>Check back often for new content!</p>',
    'blog'
),

-- FAQ Page
(
    'FAQ',
    'Find answers to frequently asked questions here.',
    '<h1>Frequently Asked Questions</h1><p>Have questions? We have answers! Browse through our FAQs to find what you need:</p><h2>General Questions</h2><ul><li><strong>What is your return policy?</strong><br>We offer a 30-day return policy for all purchases.</li><li><strong>How can I contact support?</strong><br>You can reach us via email at support@company.com or call us at +1 (555) 123-4567.</li></ul><h2>Technical Questions</h2><ul><li><strong>What platforms do you support?</strong><br>We support Windows, macOS, iOS, and Android.</li><li><strong>How do I reset my password?</strong><br>Click on the "Forgot Password" link on the login page and follow the instructions.</li></ul>',
    'faq'
),

-- Testimonials Page
(
    'Testimonials',
    'See what our customers have to say.',
    '<h1>Customer Testimonials</h1><p>We value our customers and their feedback. Here\'s what they have to say:</p><blockquote><p>"The service was exceptional! Highly recommend."</p><footer>- Jane Doe</footer></blockquote><blockquote><p>"Their team went above and beyond to deliver the perfect solution."</p><footer>- John Smith</footer></blockquote><blockquote><p>"Amazing experience from start to finish. Will definitely be back!"</p><footer>- Sarah Lee</footer></blockquote>',
    'testimonials'
),

-- Careers Page
(
    'Careers',
    'Join our team and grow your career.',
    '<h1>Careers at Our Company</h1><p>Looking for a challenging and rewarding career? Join our team and be a part of a company that values innovation and collaboration.</p><h2>Current Openings</h2><ul><li>Software Engineer</li><li>Project Manager</li><li>Marketing Specialist</li></ul><p>We offer competitive salaries, excellent benefits, and opportunities for professional growth.</p><p><a href="/careers/apply">Apply Now</a></p>',
    'careers'
);