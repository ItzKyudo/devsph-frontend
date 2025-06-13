import React, { useState } from "react";


//EXAMPLE CARDS
const developers = [
  {
    id: 1,
    name: "Alice Cruz",
    title: "Frontend Developer",
    description: "Passionate about creating interactive UI with React.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    skills: ["React", "JavaScript", "CSS", "Tailwind"],
  },
  {
    id: 2,
    name: "Mark Rivera",
    title: "Full Stack Developer",
    description: "Building scalable web apps using MERN stack.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    skills: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    id: 3,
    name: "Joan Reyes",
    title: "Mobile App Developer",
    description: "Loves crafting native mobile experiences.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    skills: ["Flutter", "Dart", "Firebase"],
  },
  {
    id: 4,
    name: "Daniel Santos",
    title: "Backend Engineer",
    description: "Expert in APIs and databases.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    skills: ["Python", "Django", "PostgreSQL", "REST"],
  },
];

function Browse() {
  const [search, setSearch] = useState("");

  const filteredDevelopers = developers.filter((dev) =>
    dev.name.toLowerCase().includes(search.toLowerCase()) ||
    dev.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container browseSection">
      <h2>Find a Developer</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by name or skill..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <div className="developerCards">
        {filteredDevelopers.map((dev) => (
          <div className="developerCard" key={dev.id}>
            <img src={dev.image} alt={dev.name} />
            <h3>{dev.name}</h3>
            <div className="title">{dev.title}</div>
            <div className="description">{dev.description}</div>
            <div className="skills">
              <div className="skills-list">
                {dev.skills.map((skill, index) => (
                  <div className="skill" key={index}>{skill}</div>
                ))}
              </div>
            </div>
            <button className="contact-btn">Contact</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Browse;
