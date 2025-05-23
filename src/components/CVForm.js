import { useRouter } from 'next/router';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CVForm({ setFormData }) {
  const { register, handleSubmit, control } = useForm();
  const router = useRouter();
  const [photoPreview, setPhotoPreview] = useState(null);

  const { fields: experiences, append: appendExperience, remove: removeExperience } = useFieldArray({ control, name: 'experience' });
  const { fields: projects, append: appendProject, remove: removeProject } = useFieldArray({ control, name: 'projects' });
  const { fields: certifications, append: appendCertification, remove: removeCertification } = useFieldArray({ control, name: 'certifications' });
  const { fields: languages, append: appendLanguage, remove: removeLanguage } = useFieldArray({ control, name: 'languages' });
  const {
  fields: educationFields,
  append: appendEducation,
  remove: removeEducation,
} = useFieldArray({
  control,
  name: "education",
});
   

  const onSubmit = (data) => {
    const formattedData = {
      name: data.name,
      title: data.title,
      photo: photoPreview,
      contact: {
        phone: data.phone,
        email: data.email,
        address: data.address,
      },
      socialLinks: {
        github: data.github,
        linkedin: data.linkedin,
        portfolio: data.portfolio,
        twitter: data.twitter,
        facebook: data.facebook,
      },
      about: data.about,
      experience: data.experience,
      education: data.education,
      projects: data.projects,
      certifications: data.certifications,
      skills: data.skills.split(',').map((s) => s.trim()),
      interests: data.interests.split(',').map((i) => i.trim()),
      languages: data.languages,
      references: data.refAvailable === 'on' ? [] : [
        {
          name: data.refName1,
          position: data.refPosition1,
          company: data.refCompany1,
          email: data.refEmail1,
        },
      ],
      refAvailableOnRequest: data.refAvailable === 'on',
      updatedAt: new Date().toISOString(),
    };

    setFormData(formattedData);
    localStorage.setItem('cvData', JSON.stringify(formattedData));
    toast.success('CV data saved successfully! Redirecting to template...');
    setTimeout(() => {
      router.push('/template');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6 p-6 bg-white rounded shadow-lg">
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-2">Personal Info</h2>
          <input
            type="file"
            {...register('photo')}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPhotoPreview(URL.createObjectURL(file));
            }}
            className="w-full p-2 border rounded"
          />
          <input {...register('name', { required: true })} placeholder="Full Name" className="w-full p-2 border rounded mt-2" />
          <input {...register('title')} placeholder="Professional Title" className="w-full p-2 border rounded mt-2" />
          <input {...register('phone')} placeholder="Phone" className="w-full p-2 border rounded mt-2" />
          <input type="email" {...register('email')} placeholder="Email" className="w-full p-2 border rounded mt-2" />
          <input {...register('address')} placeholder="Address" className="w-full p-2 border rounded mt-2" />
          <textarea {...register('about')} placeholder="About Me" className="w-full p-2 border rounded mt-2" />
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">Social Links</h2>
          <input {...register('github')} placeholder="GitHub" className="w-full p-2 border rounded" />
          <input {...register('linkedin')} placeholder="LinkedIn" className="w-full p-2 border rounded mt-2" />
          <input {...register('portfolio')} placeholder="Portfolio" className="w-full p-2 border rounded mt-2" />
          <input {...register('twitter')} placeholder="Twitter" className="w-full p-2 border rounded mt-2" />
          <input {...register('facebook')} placeholder="Facebook" className="w-full p-2 border rounded mt-2" />
        </section>

        {/* Education Section */}
         <section>
  <h2 className="text-xl font-semibold mb-2">Education</h2>
  {educationFields.map((edu, index) => (
    <div key={edu.id} className="border p-3 rounded space-y-2">
      {/* mb-4 border border-gray-300 p-3 rounded-md space-y-2" */}
      <input
        type="text"
        placeholder="Degree"
        {...register(`education.${index}.degree`)}
        className="block w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Institution"
        {...register(`education.${index}.institution`)}
        className="block w-full p-2 border rounded"
      />
      <input
        type="month"
        placeholder="Start Date"
        {...register(`education.${index}.startDate`)}
        className="block w-full p-2 border rounded"
      />
      <input
        type="month"
        placeholder="End Date"
        {...register(`education.${index}.endDate`)}
        className="block w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        {...register(`education.${index}.description`)}
        className="block w-full p-2 border rounded"
      />
      <button type="button" onClick={() => removeEducation(index)} className="text-red-600 hover:text-red-800 mt-1 hover:scale-105 transition duration-200">Remove</button>

    </div>
  ))}
  <button
    type="button"
    onClick={() => appendEducation({ degree: '', institution: '', startDate: '', endDate: '', description: '' })}
    className="bg-green-500  hover:bg-green-700 hover:scale-105 transition duration-300 text-white px-3 py-1 rounded"
  >
    Add Education
  </button>
</section>



        <section>
          <h2 className="text-xl font-bold mb-2">Skills & Interests</h2>
          <input {...register('skills')} placeholder="e.g. JavaScript, React" className="w-full p-2 border rounded" />
          <input {...register('interests')} placeholder="e.g. Reading, Traveling" className="w-full p-2 border rounded mt-2" />
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">Certifications</h2>
          {certifications.map((cert, index) => (
            <div key={cert.id} className="border p-3 rounded space-y-2">
              <input {...register(`certifications.${index}.title`)} placeholder="Title" className="w-full p-2 border rounded" />
              <input {...register(`certifications.${index}.authority`)} placeholder="Authority" className="w-full p-2 border rounded" />
              <input {...register(`certifications.${index}.year`)} placeholder="Year" className="w-full p-2 border rounded" />
              <button type="button" onClick={() => removeCertification(index)} className="text-red-600 hover:text-red-800 mt-1 hover:scale-105 transition duration-200">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendCertification({})} className="mt-2 px-3 py-1 bg-green-500  hover:bg-green-700 hover:scale-105 transition duration-300 text-white rounded">Add Certification</button>
        </section>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-2">Experience</h2>
          {experiences.map((exp, index) => (
            <div key={exp.id} className="border p-3 rounded space-y-2">
              <input {...register(`experience.${index}.position`)} placeholder="Position" className="w-full p-2 border rounded" />
              <input {...register(`experience.${index}.company`)} placeholder="Company" className="w-full p-2 border rounded" />
              <input type="month" {...register(`experience.${index}.from`)} placeholder="From" className="w-full p-2 border rounded" />
              <input type="month" {...register(`experience.${index}.to`)} placeholder="To" className="w-full p-2 border rounded" />
              <textarea {...register(`experience.${index}.description`)} placeholder="Description" className="w-full p-2 border rounded" />
              <button type="button" onClick={() => removeExperience(index)} className="text-red-600 hover:text-red-800 mt-1 hover:scale-105 transition duration-200">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendExperience({})} className="mt-2 px-3 py-1 bg-green-500 hover:bg-green-700 hover:scale-105 transition duration-300 text-white rounded">Add Experience</button>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">Projects</h2>
          {projects.map((proj, index) => (
            <div key={proj.id} className="border p-3 rounded space-y-2">
              <input {...register(`projects.${index}.name`)} placeholder="Project Name" className="w-full p-2 border rounded" />
              <input {...register(`projects.${index}.techStack`)} placeholder="Technologies Used" className="w-full p-2 border rounded" />
              <textarea {...register(`projects.${index}.description`)} placeholder="Project Description" className="w-full p-2 border rounded" />
              <button type="button" onClick={() => removeProject(index)} className="text-red-600 hover:text-red-800 mt-1 hover:scale-105 transition duration-200">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendProject({})} className="mt-2 px-3 py-1 bg-green-500  hover:bg-green-700 hover:scale-105 transition duration-300 text-white rounded">Add Project</button>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">Languages</h2>
          {languages.map((lang, index) => (
            <div key={lang.id} className="border p-3 rounded space-y-2">
              <input {...register(`languages.${index}.name`)} placeholder="Language" className="w-full p-2 border rounded" />
              <select {...register(`languages.${index}.level`)} className="w-full p-2 border rounded">
                <option value="">Select Proficiency</option>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>
              </select>
              <button type="button" onClick={() => removeLanguage(index)} className="text-red-600 hover:text-red-800 mt-1 hover:scale-105 transition duration-200">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendLanguage({})} className="mt-2 px-3 py-1 bg-green-500  hover:bg-green-700 text-white rounded hover:scale-105 transition duration-300">Add Language</button>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">References</h2>
          <label className="block mb-1">
            <input type="checkbox" {...register('refAvailable')} /> Available on Request
          </label>
          <input {...register('refName1')} placeholder="Reference Name" className="w-full p-2 border rounded mt-2" />
          <input {...register('refPosition1')} placeholder="Position" className="w-full p-2 border rounded mt-2" />
          <input {...register('refCompany1')} placeholder="Company" className="w-full p-2 border rounded mt-2" />
          <input {...register('refEmail1')} placeholder="Email" className="w-full p-2 border rounded mt-2" />
        </section>
        <button
            type="submit"
            className="w-full px-6 py-3  bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition duration-300"
          >
            🚀 Generate CV
          </button>
      </div>
    </form>
  );
}