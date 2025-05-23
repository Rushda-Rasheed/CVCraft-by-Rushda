import React, { forwardRef } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaTwitter,
  FaFacebook,
} from 'react-icons/fa';

const CVTemplate1 = forwardRef(({ data = {}, color = 'steelblue' }, ref) => {
  const {
    name = 'Your Name',
    title = 'Your Title',
    photo,
    contact = {},
    about,
    experience = [],
    education = [],
    projects = [],
    skills = [],
    interests = [],
    certifications = [],
    languages = [],
    references = [],
    socialLinks = {},
  } = data;

  const colorMap = {
    blue: 'text-blue-600 bg-blue-600',
    red: 'text-red-600 bg-red-600',
    green: 'text-green-600 bg-green-600',
    pink: 'text-pink-600 bg-pink-600',
    purple: 'text-purple-600 bg-purple-600',
    orange: 'text-orange-600 bg-orange-600',
    teal: 'text-teal-600 bg-teal-600',
    indigo: 'text-indigo-600 bg-indigo-600',
    gray: 'text-gray-700 bg-gray-700',
    black: 'text-black bg-black',
    emerald: 'text-emerald-500 bg-emerald-500',
    steelblue: 'text-[#4682b4] bg-[#4682b4]',
    slategray: 'text-[#708090] bg-[#708090]',
    rosybrown: 'text-[#bc8f8f] bg-[#bc8f8f]',
    lightcoral: 'text-[#f08080] bg-[#f08080]',
    cadetblue: 'text-[#5f9ea0] bg-[#5f9ea0]',
    darkseagreen: 'text-[#8fbc8f] bg-[#8fbc8f]',
    lightslategray: 'text-[#778899] bg-[#778899]',
    lightsteelblue: 'text-[#b0c4de] bg-[#b0c4de]',
    mistyrose: 'text-[#e4b4b4] bg-[#e4b4b4]',
    lavender: 'text-[#b57edc] bg-[#b57edc]',
    lightcyan: 'text-[#00aaaa] bg-[#00aaaa]',
    gainsboro: 'text-[#a9a9a9] bg-[#a9a9a9]',
    thistle: 'text-[#9b7fa0] bg-[#9b7fa0]',
    palegoldenrod: 'text-[#c5b358] bg-[#c5b358]',
    honeydew: 'text-[#a4d3a4] bg-[#a4d3a4]',
  };

  const textColor = colorMap[color]?.split(' ')[0] || 'text-black';
  const bgColor = colorMap[color]?.split(' ')[1] || 'bg-black';

  return (
       <div
  ref={ref}
  className="w-full flex flex-col lg:flex-row text-gray-900"
  style={{
    height: '1830px',
    backgroundColor: '#f3f4f6',
  }}
>
    
      {/* Main Content */}
      <div className="w-full lg:w-2/3 p-8 space-y-8 bg-white" style={{ height: '100%' }}>
        {/* About */}
        {about && (
          <section>
            <h2 className={`text-2xl font-bold mb-2 ${textColor}`}>About Me</h2>
            <p className="text-gray-700">{about}</p>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section>
            <h2 className={`text-2xl font-bold mb-2 ${textColor}`}>Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-xl font-semibold pt-3 uppercase">{exp.position} at {exp.company}</h3>
                <p className="text-base text-gray-600">{exp.from} - {exp.to}</p>
                <p className="text-gray-700 pt-2">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education?.some(e => e.degree || e.institution || e.year || e.description) && (
          <section>
            <h2 className={`text-2xl font-bold mb-2 ${textColor}`}>Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-xl font-semibold uppercase">{edu.degree}</h3>
                <p className="text-base text-gray-800">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
                <p className="text-gray-700 pt-2">{edu.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section>
            <h2 className={`text-2xl font-bold mb-2 ${textColor}`}>Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-xl font-semibold pt-3 uppercase">{proj.name}</h3>
                <p className="text-base text-gray-600">Tech Stack: {proj.techStack}</p>
                <p className="text-gray-700 pt-2">{proj.description}</p>
              </div>
            ))}
          </section>
        )}
        {certifications?.filter(cert => cert.title || cert.authority || cert.year).length > 0 && (
          <section >
            <h2 className={`text-2xl font-bold mb-2  ${textColor}`}>Certifications</h2>
            <div className="space-y-1 text-gray-700">
              {certifications.map((cert, i) => (
                <p key={i}>{cert.title} — {cert.authority} ({cert.year})</p>
              ))}
            </div>
          </section>
        )}


        {/* Interests */}
        {interests?.length > 0 && (
          <section>
            <h2 className={`text-2xl font-bold mb-2 ${textColor}`}>Interests</h2>
            <div className="space-y-1 text-gray-700">
              {interests.map((interest, i) => (
                <p key={i}>{interest}</p>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {references?.filter(ref => ref.name || ref.email || ref.position || ref.company).length > 0 && (
          <section>
            <h2 className={`text-2xl font-bold mb-2 ${textColor}`}>References</h2>
            <div className="space-y-2 text-gray-700">
              {references.map((ref, i) => (
                <div key={i}>
                  <p className="font-semibold uppercase">{ref.name}</p>
                  <p className="text-md text-gray-600">{ref.position} at {ref.company}</p>
                 <p className="text-lg text-gray-700">{ref.email}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
        {/* Sidebar */}
      <div className={`w-full lg:w-1/3 ${bgColor} text-white p-6 space-y-6`}style={{ height: '100%' }}>
        <div className="flex flex-col items-center text-center">
          {photo && (
            <img src={photo} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white mb-4" />
          )}
          <h1 className="text-3xl font-bold uppercase">{name}</h1>
          <p className="text-lg mt-1 uppercase">{title}</p>
        </div>

        {/* Contact */}
        <div className="space-y-2 text-md">
          {contact?.phone && <p><FaPhone className="inline mr-2" />{contact.phone}</p>}
          {contact?.email && <p><FaEnvelope className="inline mr-2" />{contact.email}</p>}
          {contact?.address && <p><FaMapMarkerAlt className="inline mr-2" />{contact.address}</p>}
        </div>

        {/* Social Links */}
        <div className="space-y-2 text-base break-words">
          {socialLinks?.github && <p className="flex items-center gap-2"><FaGithub /><a href={socialLinks.github} className="underline" target="_blank" rel="noreferrer">{socialLinks.github}</a></p>}
          {socialLinks?.linkedin && <p className="flex items-center gap-2"><FaLinkedin /><a href={socialLinks.linkedin} className="underline" target="_blank" rel="noreferrer">{socialLinks.linkedin}</a></p>}
          {socialLinks?.portfolio && <p className="flex items-center gap-2"><FaGlobe /><a href={socialLinks.portfolio} className="underline" target="_blank" rel="noreferrer">{socialLinks.portfolio}</a></p>}
          {socialLinks?.twitter && <p className="flex items-center gap-2"><FaTwitter /><a href={socialLinks.twitter} className="underline" target="_blank" rel="noreferrer">{socialLinks.twitter}</a></p>}
          {socialLinks?.facebook && <p className="flex items-center gap-2"><FaFacebook /><a href={socialLinks.facebook} className="underline" target="_blank" rel="noreferrer">{socialLinks.facebook}</a></p>}
        </div>

        {/* Skills */}
        {skills?.filter(skill => skill.trim()).length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold border-b border-white pb-1 mb-2">Skills</h3>
            <div className="space-y-1 text-base">
              {skills.map((skill, i) => (
                <p key={i}>{skill}</p>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold border-b border-white pb-1 mb-2">Languages</h3>
            <div className="space-y-1 text-base">
              {languages.map((lang, i) => (
                <p key={i}>{lang.name} — {lang.level}</p>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
});

export default CVTemplate1;
