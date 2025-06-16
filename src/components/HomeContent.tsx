import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  return ( 
    <div className="homeContainer">
      <div className="homeContent">
        <div className="heroSection">
          <h1>Find Top Filipino Developers for Your Projects</h1>
          <p>DevsPH connects clients and businesses with skilled software developers in the Philippines. Post your project, browse portfolios, and hire the right talent for your needs.</p>
          <button className="cta-btn" onClick={() => navigate('/signup')}>Post a Project</button>
        </div>
        <div className="howItWorksSection">
          <h2>How DevsPH Works</h2>
          <ol>
            <li><strong>Post Your Project:</strong> Describe your requirements and what you need built.</li>
            <li><strong>Browse Developers:</strong> Explore verified developer profiles and portfolios.</li>
            <li><strong>Connect & Hire:</strong> Message developers, discuss your project, and hire the best fit.</li>
            <li><strong>Get Results:</strong> Collaborate and track progress until your project is delivered.</li>
          </ol>
        </div>
        <div className="showcaseSection">
          <h2>Featured Developers</h2>
          <p>Browse some of our top-rated developers ready to help you succeed.</p>
          <div className="projectShowcase">
            <div className="projectCard">
              <h4>Juan Dela Cruz</h4>
              <p>Full Stack Developer | React, Node.js, PHP</p>
              <span>5+ years experience • 20+ completed projects</span>
            </div>
            <div className="projectCard">
              <h4>Maria Santos</h4>
              <p>Mobile App Developer | Flutter, Android, iOS</p>
              <span>Expert in cross-platform apps</span>
            </div>
            <div className="projectCard">
              <h4>Jose Rizal</h4>
              <p>Backend Specialist | Python, Django, APIs</p>
              <span>API integrations & scalable systems</span>
            </div>
          </div>
          <button className="cta-btn"  onClick={() => navigate('/browse')}>Browse All Developers </button>
        </div>
        <div className="featuresSection">
          <h2>Why Choose DevsPH?</h2>
          <div className="featureCards">
            <div className="featureCard">
              <h3>Verified Talent</h3>
              <p>All developers are screened and their portfolios reviewed for quality.</p>
            </div>
            <div className="featureCard">
              <h3>Easy Communication</h3>
              <p>Message and collaborate with developers directly on the platform.</p>
            </div>
            <div className="featureCard">
              <h3>Secure Payments</h3>
              <p>Safe and transparent payment process for peace of mind.</p>
            </div>
          </div>
        </div>
        <div className="testimonialsSection">
          <h2>Success Stories</h2>
          <div className="testimonialCards">
            <div className="testimonialCard">
              <p>"We found the perfect developer for our startup app. The process was smooth and efficient!"</p>
              <span>- Carla, Startup Founder</span>
            </div>
            <div className="testimonialCard">
              <p>"DevsPH made it easy to connect with skilled programmers for our website revamp."</p>
              <span>- Miguel, Business Owner</span>
            </div>
          </div>
        </div>
        <div className="ctaSection">
          <h2>Ready to hire your next developer?</h2>
          <button className="cta-btn" onClick={() => navigate('/signup')}>Get Started</button>
        </div>
        <div className="forDevelopersSection">
          <h2>Are You a Developer?</h2>
          <p>Create your profile, showcase your skills, and get discovered by clients looking for talent like you.</p>
          <button className="cta-btn" onClick={() => navigate('/signup')}>Join as Developer</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
