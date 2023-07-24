import React from "react";

function Footer() {
  return (
    <footer className="bg-primary mt-10 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-secondary mb-2">
              SkillFusion
            </h3>
            <p className="text-foreground">
              Connect, Share, Learn, and Grow together with SkillFusion.
            </p>
          </div>
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-secondary mb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-foreground hover:text-accent">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-foreground hover:text-accent">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-foreground hover:text-accent"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-foreground hover:text-accent"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-secondary mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-accent">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-foreground hover:text-accent">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-foreground hover:text-accent">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-foreground hover:text-accent">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-foreground">
            &copy; 2023 SkillFusion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

// <footer className="bg-primary px-4 py-8">
//   <div className="max-w-4xl mx-auto">
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       <div>
//         <h3 className="text-xl font-bold text-secondary mb-4">
//           Contact Us
//         </h3>
//         <p className="text-foreground">123 Gaming Street</p>
//         <p className="text-foreground">City, Country</p>
//         <p className="text-foreground">Email: info@example.com</p>
//         <p className="text-foreground">Phone: +1 (123) 456-7890</p>
//       </div>
//       <div>
//         <h3 className="text-xl font-bold text-secondary mb-4">
//           Quick Links
//         </h3>
//         <ul className="space-y-2">
//           <li>
//             <a href="/" className="text-foreground hover:text-accent">
//               Home
//             </a>
//           </li>
//           <li>
//             <a href="/about" className="text-foreground hover:text-accent">
//               About Us
//             </a>
//           </li>
//           <li>
//             <a
//               href="/services"
//               className="text-foreground hover:text-accent"
//             >
//               Services
//             </a>
//           </li>
//           <li>
//             <a
//               href="/contact"
//               className="text-foreground hover:text-accent"
//             >
//               Contact Us
//             </a>
//           </li>
//         </ul>
//       </div>
//       <div>
//         <h3 className="text-xl font-bold text-secondary mb-4">Follow Us</h3>
//         <div className="flex space-x-4">
//           <a href="#" className="text-foreground hover:text-accent">
//             <i className="fab fa-facebook fa-lg"></i>
//           </a>
//           <a href="#" className="text-foreground hover:text-accent">
//             <i className="fab fa-twitter fa-lg"></i>
//           </a>
//           <a href="#" className="text-foreground hover:text-accent">
//             <i className="fab fa-instagram fa-lg"></i>
//           </a>
//           <a href="#" className="text-foreground hover:text-accent">
//             <i className="fab fa-linkedin fa-lg"></i>
//           </a>
//         </div>
//       </div>
//       <div>
//         <h3 className="text-xl font-bold text-secondary mb-4">
//           About Our Company
//         </h3>
//         <p className="text-foreground">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
//           commodo nunc eu elit tristique, id commodo libero faucibus.
//         </p>
//       </div>
//     </div>
//   </div>
// </footer>
