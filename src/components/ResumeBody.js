import React from 'react';
const githubSVG = require('../assets/github.svg');
const linkedinSVG = require('../assets/linkedin.svg');
const gmailSVG = require('../assets/gmail.svg');
const downloadIcon = require('../assets/downloadIcon.svg');
const educationIcon = require('../assets/educationIcon.svg');
const techskillsIcon = require('../assets/techskillsIcon.svg');
const certificationsIcon = require('../assets/certificationsIcon.svg');
const profilePicColor = require('../assets/andrea-picture-color.jpg');
const pdf = require('../assets/Andrea-Takamiya-Resume.pdf');

const ResumeBody = props => {
  return (
    <div className="resume-container">
      <div className="resume-body-container">
        <div className="sidebar-container">
          <div className="picture">
            <img src={profilePicColor} width="250px" alt="Andrea Takamiya" />
          </div>
          <p className="address-block">
            <span>
              <a href="mailto:takamiya.andrea@gmail.com" target="_blank" rel="noopener noreferrer">
              <img src={gmailSVG} height="18px" alt="Email Andrea" /> Takamiya.Andrea@Gmail.com</a>
            </span>
            <span>
              <a href="https://github.com/andimiya" target="_blank" rel="noopener noreferrer">
              <img src={githubSVG} height="18px" alt="Check out my code" /> Github.com/Andimiya</a>
            </span>
            <span>
              <a href="https://www.linkedin.com/in/andreatakamiya"  target="_blank" rel="noopener noreferrer">
              <img src={linkedinSVG} height="18px" alt="Connect on LinkedIn" />  LinkedIn.com/AndreaTakamiya</a>
            </span>
            <span>
              <a href={pdf} target="_blank" rel="noopener noreferrer">
              <img src={downloadIcon} height="24px" alt="Download Resume" />  Download Resume</a>
            </span>
          </p>
          <hr />
          <div className="header-with-icon">
            <img src={educationIcon} height="32px" alt="Education" />
            <h2 className="education">Education</h2>
          </div>
          <h4 className="full-stack-javascript-developer">Full Stack Javascript Developer</h4>
          <p><a href="http://www.devleague.com" target="_blank" rel="noopener noreferrer">DEVLEAGUE</a><br />Honolulu, Hawaii<br />Nov 2016 - May 2017  </p>
          <h4 className="bachelor-of-arts-in-business-administration">Bachelor of Arts in Business Administration</h4>
          <p>Concentration in Marketing and International Business<br />University of Oregon: 2005 – 2007<br />University of Hawaii at Manoa: 2008 – 2009  </p>
          <hr />
          <div className="header-with-icon">
            <img src={techskillsIcon} height="32px" alt="Technical Skills" />
            <h2 className="technical-skills">Technical Skills</h2>
          </div>
          <h4 className="languages">Languages</h4>
          <p>JavaScript, HTML5, CSS, SQL</p>
          <h4 className="frontend-">Frontend</h4>
          <p>HTML5, CSS3, SASS, Javascript, ES6, React, Redux</p>
          <h4 className="server-side-proficiencies">Server-Side</h4>
          <p>NodeJS, Express, Sequelize</p>
          <h4 className="database-proficiencies">Database</h4>
          <p>PostgreSQL</p>
          <h4 className="web-skills">Web Skills</h4>
          <ul>
          <li>Responsive/Mobile First Web Development</li>
          <li>Relational - and Non-Relational Database Modeling</li>
          <li>RESTful API Development</li>
          <li>API Integration</li>
          <li>Shell Scripting</li>
          </ul>
          <h4 className="other-skills-and-certifications">Marketing and Other Skills</h4>
          <ul>
          <li>Adobe Sitecatalyst (Omniture)</li>
          <li>Adobe Test &amp; Target</li>
          <li>Farelogix Merchandising System </li>
          <li>Microsoft Sharepoint CMS</li>
          <li>Web layouts and wire-framing</li>
          <li>Adobe Photoshop CS6</li>
          <li>Adobe Illustrator CS6</li>
          <li>Google AdWords</li>
          </ul>
          <hr />
          <div className="header-with-icon">
            <img src={certificationsIcon} height="24px" alt="Certifications" />
            <h2 className="technical-skills">Certifications</h2>
          </div>
            <p>
            Sitecore CMS ( Sitecore Certified)
            Sitecore OMS (Sitecore Certified)
            Sitecore DMS (Sitecore Certified)
            </p>
        </div>
        <div className="right-panel-container">
          <h2 className="professional-experience">Professional Experience</h2>
          <h3 className="project-manager">Project Manager</h3>
          <p><a href="https://sudokrew.com" target="_blank" rel="noopener noreferrer">Sudokrew Solutions</a> | Honolulu, HI | 2016 - Present</p>
          <ul>
            <li>Improved workflows internally for Sudokrew developers as well as externally for Sudokrew clients by applying agile methodology techniques to allow developers to stay focused and increase productivity.</li>
            <li>Ensured that project requirements and deliverables were clearly communicated between clients and the Sudokrew team.</li>
            <li>Improved client relationships by facilitating frequent discussions around prioritization and budgeting to ensure that client expectations were clearly communicated.</li>
          </ul>
          <h3 className="online-experience-manager">Online Experience Manager</h3>
          <p><a href="https://www.hawaiianairlines.com/" target="_blank" rel="noopener noreferrer">Hawaiian Airlines</a> | Honolulu, HI | 2014 – 2016</p>
          <ul>
            <li>Received a quick promotion from Web Producer to Online Experience Manager and engaged with a team of over two hundred to successfully decommission the old HawaiianAirlines.com websites and launch seven multi-currency, multi-lingual websites for the airline.</li>
            <li>Worked through many risks and challenges that arose during the span of the project such as the movement from waterfall to agile methodologies, adoption of new systems and platforms, defining roles and responsibilities across the project, and working with many offshore team members.</li>
            <li>Managed the needs of the airline and its many stakeholders against the priorities of IT, government regulations and project timelines to ensure everyone was working towards a clear vision, hitting milestones set by the business, and accomplishing the goals of the project.</li>
          </ul>
          <h3 className="web-producer">Web Producer</h3>
          <p><a href="https://www.hawaiianairlines.com/" target="_blank" rel="noopener noreferrer">Hawaiian Airlines</a> | Honolulu, HI | 2013 - 2014</p>
          <ul>
            <li>Took on the role of Web Producer for the <a href="https://www.hawaiianairlines.com">HawaiianAirlines.com</a> re-platforming project as a step up from my previous Advertising Coordinator position. Gathered requirements, defined work flows, and worked with IT to ensure effective solutions.</li>
            <li>Quickly adopted new systems such as our Farelogix pricing and inventory management system and Sitecore content management system to ensure business-side expertise of those new tools.</li>
            <li>Communicated project status and timelines to multiple business units across the organization to ensure that business vision and expectations were in alignment across the program.</li>
          </ul>
          <h3 className="advertising-coordinator">Advertising Coordinator</h3>
          <p><a href="https://www.hawaiianairlines.com/" target="_blank" rel="noopener noreferrer">Hawaiian Airlines</a> | Honolulu, HI | 2012 - 2013</p>
          <ul>
            <li>Managed digital advertising for the airline, including Display Advertising, Paid Search, Travel Search and Affiliate Marketing. Met very aggressive return on investment metrics and improved the Affiliate Marketing program to 250% revenue increases year over year.</li>
            <li>Led teams across the globe to launch digital marketing efforts internationally for Australia, New Zealand, Korea, Japan and Taiwan. This included search engine marketing in foreign languages, country-specific creative, analytics across multiple platforms, multi-lingual teams and coordination across GSA, PR, marketing agencies and Hawaiian Airlines.</li>
            <li>Managed SEO strategies and operations including contracting of an SEO vendor, site strategy, implementation, and measuring effectiveness of the optimization</li>
          </ul>
          <h3 className="online-marketing-administrator">Online Marketing Administrator</h3>
          <p>Outrigger Hotels and Resorts | Honolulu, HI | 2010 - 2012</p>
          <ul>
            <li>Heavily involved in the Outrigger website redesign process which included development of new site architecture, writing detailed business use cases, researching design and layout options, using various developer tools for QA, troubleshooting, developing content, optimizing for SEO as the CMS was in development.</li>
            <li>Worked closely between developers and Outrigger stakeholders to understand and communicate business use cases between both parties. This included prioritization of issues/bug fixes by weighing level of developer effort versus business need and communicating to all parties any limitations and timelines.</li>
            <li>Utilized Omniture analytics software for general marketing analytics and decision-making when testing creative concepts. Worked with Omniture analytics back-end architecture, naming conventions, SAINT classifications and page code during the redesign to ensure accurate tagging and no data loss.</li>
          </ul>
          <hr />
          <h2 className="development-experience">Development Experience</h2>
          <h3 className="devleague">DevLeague</h3>
          <p>Full Stack Developer Bootcamp</p><p>Nov 2016 - May 2017  </p>
          <ul>
          <li>Immersed myself in learning how to build full-stack applications in Javascript for 20-30 hours per week, while keeping up with my full-time day job as a Project Manager.</li>
          <li>Ventured beyond the typical bootcamp curriculum by learning Shell scripting to automate the collection and cleaning of data and insertion into databases, and DevOps tasks such as setting servers and databases for production.</li>
          <li>Created life-long friendships and learned the importance of working as a team through group projects and pair-programming.</li>
          </ul>
          <hr />
          <h3 className="buoy-call-web-application">Buoy Call Web Application</h3>
          <p><a href="https://github.com/andimiya/buoy-call">Github</a> | <a href="https://buoycall.org">BuoyCall.org</a><br />April 2017<br />Collaborated with 3 other students to create an application which found and displayed historical buoy data as well plotted both buoys and sharks on a map. Users were able to interact with the application by clicking on any buoy to view graphed data, and could also select a shark on the map and name it by making a five dollar donation.</p>
          <h4 className="contributions-to-this-project-include-">Contributions to this project include:</h4>
          <ul>
          <li>Creating the database schemas for our buoy data and buoy coordinates data.</li>
          <li>Writing of bash scripts to collect data from various webpages, create csv files, adjust headers and file contents to be importable into our database, then import the data into PostgreSQL.</li>
          <li>Stripe implementation on both the server-side and client-side so our application could receive real credit card donations.</li>
          <li>Deployment of the application which involved nginx, pm2, the configuration and setup of two Digital Ocean droplets (one for our database and one for our application), and  implementation of LetsEncrypt.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeBody;
