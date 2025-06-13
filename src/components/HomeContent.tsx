
function Home() {
  return (
    <div className="homeContainer">
      <div className="homeContent">
        <div className="heroSection">
          <h1>Welcome to DevsPH</h1>
          <p>Hub for software developers in the Philippines. Find your developer today!</p>
          <button className="cta-btn">Get Started</button>
        </div>
        <div className="featuresSection">
          <h2>Why Join DevsPH?</h2>
          <div className="featureCards">
            <div className="featureCard">
              <h3>Connect</h3>
              <p>Join a vibrant community of Filipino developers to share ideas and collaborate.</p>
            </div>
            <div className="featureCard">
              <h3>Learn</h3>
              <p>Access tutorials, resources, and workshops to level up your coding skills.</p>
            </div>
            <div className="featureCard">
              <h3>Create</h3>
              <p>Build your profile and showcase your projects with tools and support from DevsPH.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
