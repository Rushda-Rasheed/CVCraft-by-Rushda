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

const CVTemplate4 = forwardRef(({ data, color }, ref) => {
  const {
    name,
    title,
    photo,
    contact,
    about,
    experience,
    education,
    projects,
    skills,
    interests,
    certifications,
    languages,
    references,
    socialLinks,
  } = data || {};

  const colorMap = {
    blue: 'text-blue-600',
    red: 'text-red-600',
    green: 'text-green-600',
    pink: 'text-pink-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    teal: 'text-teal-600',
    indigo: 'text-indigo-600',
    gray: 'text-gray-700',
    black: 'text-black',
    emerald: 'text-emerald-500',
    steelblue: 'text-[#4682b4]',
    slategray: 'text-[#708090]',
    rosybrown: 'text-[#bc8f8f]',
    lightcoral: 'text-[#f08080]',
    cadetblue: 'text-[#5f9ea0]',
    darkseagreen: 'text-[#8fbc8f]',
    lightslategray: 'text-[#778899]',
    lightsteelblue: 'text-[#b0c4de]',
    mistyrose: 'text-[#e4b4b4]',
    lavender: 'text-[#b57edc]',
    lightcyan: 'text-[#00aaaa]',
    gainsboro: 'text-[#a9a9a9]',
    thistle: 'text-[#9b7fa0]',
    palegoldenrod: 'text-[#c5b358]',
    honeydew: 'text-[#a4d3a4]',
  };

  const textColor = colorMap[color] || 'text-black';
  const bgColor = colorMap[color]?.replace('text-', 'bg-') || 'bg-black';

  return (
    <div ref={ref} className="min-h-screen w-full"   >
      {/* Header */}
      <div className={`flex flex-col items-center gap-4 py-6 px-4 ${bgColor} text-white`}>
        {photo && (
          <img src={photo} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white" />
        )}
        <div className="text-center">
          {name && <h1 className="text-4xl font-extrabold uppercase">{name}</h1>}
          {title && <p className="text-2xl uppercase">{title}</p>}
          <div className="mt-2 space-y-1 text-lg">
            {contact?.phone && <p><FaPhone className="inline mr-2" />{contact.phone}</p>}
            {contact?.email && <p><FaEnvelope className="inline mr-2" />{contact.email}</p>}
            {contact?.address && <p><FaMapMarkerAlt className="inline mr-2" />{contact.address}</p>}
          </div>
          

        </div>
      </div>

     
           {/* Body */}
           <div className="bg-white w-full px-6 py-6 space-y-8">
             {about && (
               <section className="p-4 rounded shadow bg-white">
                 <h2 className={`text-3xl font-semibold mb-3 ${textColor}`}>About Me</h2>
                 <p className="text-lg text-gray-800">{about}</p>
               </section>
             )}
     
             {experience?.length > 0 && (
               <section className="p-4 rounded shadow bg-white">
                 <h2 className={`text-3xl font-semibold mb-3 ${textColor}`}>Experience</h2>
                 {experience.map((exp, i) => (
                   <div key={i} className="mb-4">
                     <h3 className="text-2xl font-bold uppercase pt-3">{exp.position} at {exp.company}</h3>
                     <p className="text-md text-gray-600">{exp.from} - {exp.to}</p>
                     <p className="text-lg text-gray-700 pt-2">{exp.description}</p>
                   </div>
                 ))}
               </section>
             )}
     
             
             {Array.isArray(education) &&
       education.filter(edu =>
         (edu.degree && edu.degree.trim() !== '') ||
         (edu.institution && edu.institution.trim() !== '') ||
         (edu.year && edu.year.toString().trim() !== '') ||
         (edu.description && edu.description.trim() !== '')
       ).length > 0 && (
         <section className="p-4 rounded shadow bg-white">
           <h2 className={`text-3xl font-semibold mb-3 ${textColor}`}>Education</h2>
           {education.map((edu, i) => {
             const hasContent =
               (edu.degree && edu.degree.trim() !== '') ||
               (edu.institution && edu.institution.trim() !== '') ||
               (edu.from && edu.to.toString().trim() !== '') ||
               (edu.description && edu.description.trim() !== '');
             
             return hasContent ? (
               <div key={i} className="mb-4">
                 <h3 className="text-2xl font-bold uppercase">{edu.degree}</h3>
                 <p className="text-md text-gray-800">{edu.institution}  
       </p>
              <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
                 <p className="text-lg text-gray-700 pt-2">{edu.description}</p>
               </div>
             ) : null;
           })}
         </section>
     )}
     
     
             {projects?.length > 0 && (
               <section className="p-4 rounded shadow bg-white">
                 <h2 className={`text-3xl font-semibold mb-3 ${textColor}`}>Projects</h2>
                 {projects.map((proj, i) => (
                   <div key={i} className="mb-4">
                     <h3 className="text-2xl font-bold uppercase pt-3">{proj.name}</h3>
                     <p className="text-md text-gray-600">Tech Stack: {proj.techStack}</p>
                     <p className="text-lg text-gray-700 pt-2">{proj.description}</p>
                   </div>
                 ))}
               </section>
             )}
     
             {skills?.filter(skill => skill.trim()).length > 0 && (
               <section className="p-4 rounded shadow bg-white">
                 <h2 className={`text-3xl font-semibold mb-3 ${textColor}`}>Skills</h2>
                 <p className="text-lg text-gray-700">{skills.join(', ')}</p>
               </section>
             )}
     
             {interests?.filter(i => i.trim()).length > 0 && (
               <section className="p-4 rounded shadow bg-white">
                 <h2 className={`text-3xl font-semibold mb-3 ${textColor}`}>Interests</h2>
                 <p className="text-lg text-gray-700">{interests.join(', ')}</p>
               </section>
             )}
     
             {certifications?.filter(cert => cert.title || cert.authority || cert.year).length > 0 && (
               <section className="p-4 rounded shadow bg-white">
                 <h2 className={`text-3xl font-semibold mb-3 ${textColor}`}>Certifications</h2>
                 {certifications.map((cert, i) => (
                   <div key={i} className="mb-3">
                     <h3 className="text-2xl font-bold">{cert.title}</h3>
                     <p className="text-md text-gray-600">{cert.authority} — {cert.year}</p>
                   </div>
                 ))}
               </section>
             )}
     
             {languages?.filter(lang => lang.name || lang.level).length > 0 && (
               <section className="p-4 rounded shadow bg-white">
                 <h2 className={`text-3xl font-semibold mb-3 uppercase ${textColor}`}>Languages</h2>
                 {languages.map((lang, i) => (
                   <p key={i} className="text-lg text-gray-700">{lang.name} — {lang.level}</p>
                 ))}
               </section>
             )}
     
             {references?.filter(ref => ref.name || ref.email || ref.position || ref.company).length > 0 && (
               <section className="p-4 rounded shadow bg-white">
                 <h2 className={`text-3xl font-semibold mb-3 ${textColor}`}>References</h2>
                 {references.map((ref, i) => (
                   <div key={i} className="mb-3">
                     <h3 className="text-2xl font-bold uppercase" >{ref.name}</h3>
                     <p className="text-md text-gray-600">{ref.position} at {ref.company}</p>
                     <p className="text-lg text-gray-700">{ref.email}</p>
                   </div>
                 ))}
               </section>
             )}
             {(socialLinks?.github || socialLinks?.linkedin || socialLinks?.portfolio || socialLinks?.twitter || socialLinks?.facebook) && (
       <div className="p-4 rounded shadow bg-white">
         <h2 className={`text-3xl font-semibold mb-3 ${textColor}`}>Social Links</h2>
         <div className="flex flex-col gap-3 text-lg">
           {socialLinks?.github && (
             <div className="flex items-center gap-3">
               <FaGithub className={`${textColor} text-xl`} />
               <a
                 href={socialLinks.github}
                 target="_blank"
                 rel="noreferrer"
                 className={`hover:underline break-all ${textColor}`}
               >
                 {socialLinks.github}
               </a>
             </div>
           )}
           {socialLinks?.linkedin && (
             <div className="flex items-center gap-3">
               <FaLinkedin className={`${textColor} text-xl`} />
               <a
                 href={socialLinks.linkedin}
                 target="_blank"
                 rel="noreferrer"
                 className={`hover:underline break-all ${textColor}`}
               >
                 {socialLinks.linkedin}
               </a>
             </div>
           )}
           {socialLinks?.portfolio && (
             <div className="flex items-center gap-3">
               <FaGlobe className={`${textColor} text-xl`} />
               <a
                 href={socialLinks.portfolio}
                 target="_blank"
                 rel="noreferrer"
                 className={`hover:underline break-all ${textColor}`}
               >
                 {socialLinks.portfolio}
               </a>
             </div>
           )}
           {socialLinks?.twitter && (
             <div className="flex items-center gap-3">
               <FaTwitter className={`${textColor} text-xl`} />
               <a
                 href={socialLinks.twitter}
                 target="_blank"
                 rel="noreferrer"
                 className={`hover:underline break-all ${textColor}`}
               >
                 {socialLinks.twitter}
               </a>
             </div>
           )}
           {socialLinks?.facebook && (
             <div className="flex items-center gap-3">
               <FaFacebook className={`${textColor} text-xl`} />
               <a
                 href={socialLinks.facebook}
                 target="_blank"
                 rel="noreferrer"
                 className={`hover:underline break-all ${textColor}`}
               >
                 {socialLinks.facebook}
               </a>
             </div>
           )}
         </div>
       </div>
     )}
     
           </div>
         </div>
       );
     });
     
     export default CVTemplate4;
     
     
     