import "./Footer.css";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaYoutube, FaFacebookF, FaXTwitter, FaHeart } from "react-icons/fa6";

const groups = [
  { title: "COMPANY", links: [["About Us", "/about"], ["Careers", "/careers"], ["Blog", "/blog"], ["Press", "/press"], ["Contact Us", "/contact"], ["Terms & Conditions", "/terms"]] },
  { title: "FOR USERS", links: [["Browse Restaurants", "/restaurants"], ["Popular Cuisines", "/cuisines"], ["Offers & Deals", "/offers"], ["Track Order", "/orders"], ["Help & Support", "/support"], ["FAQs", "/faqs"]] },
  { title: "FOR RESTAURANTS", links: [["Add Restaurant", "/restaurant-partner"], ["Restaurant Dashboard", "/restaurant/dashboard"], ["Resources", "/restaurant-resources"], ["Pricing", "/restaurant-pricing"]] },
  { title: "FOR DELIVERY", links: [["Become a Delivery Partner", "/delivery-partner"], ["Delivery Dashboard", "/delivery"], ["Benefits", "/delivery-benefits"], ["Requirements", "/delivery-requirements"]] },
];

export default function Footer() {
  return <footer className="footer"><div className="footer-container">
    <div className="footer-logo"><h1>FoodExpress</h1><p>Good Food. Fast Delivery. Happy You.</p></div>
    <div className="footer-grid">
      {groups.map((group) => <div key={group.title}><h3>{group.title}</h3><ul>{group.links.map(([label, to]) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul></div>)}
      <div><h3>SOCIAL LINKS</h3><div className="social-icons">
        <a href="https://www.linkedin.com" aria-label="LinkedIn"><FaLinkedinIn /></a><a href="https://www.instagram.com" aria-label="Instagram"><FaInstagram /></a><a href="https://www.youtube.com" aria-label="YouTube"><FaYoutube /></a><a href="https://www.facebook.com" aria-label="Facebook"><FaFacebookF /></a><a href="https://x.com" aria-label="X"><FaXTwitter /></a>
      </div><div className="store-buttons"><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download FoodExpress on the App Store" /><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get FoodExpress on Google Play" /></div></div>
    </div>
    <hr />
    <div className="footer-bottom"><div><p>© 2026 FoodExpress. All rights reserved.</p><p className="founder">Founded with <FaHeart className="heart" /> by <strong>Neeraj Singh Kunwar</strong></p></div><div className="policy"><p>By continuing past this page, you agree to our <Link to="/terms">Terms of Service</Link>, <Link to="/privacy">Privacy Policy</Link> and <Link to="/content-policy">Content Policies</Link>.</p></div></div>
  </div></footer>;
}
