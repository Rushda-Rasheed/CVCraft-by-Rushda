'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import CVTemplate1 from '../components/CVTemplate1';
import CVTemplate2 from '../components/CVTemplate2';
import CVTemplate3 from '../components/CVTemplate3';
import CVTemplate4 from '../components/CVTemplate4';
import CVTemplate5 from '../components/CVTemplate5';
import ExportButton from '../components/ExportButton';

import toast, { Toaster } from 'react-hot-toast';

export default function TemplatePage() {
  const [formData, setFormData] = useState({});
  const [template, setTemplate] = useState(1);
  const [color, setColor] = useState('steelblue');
  const cvRef = useRef();
  const router = useRouter();

  const colorOptions = [
    'blue', 'red', 'green', 'pink', 'purple', 'orange', 'teal', 'indigo',
    'gray', 'black', 'steelblue', 'slategray', 'rosybrown', 'lightcoral',
    'cadetblue', 'darkseagreen', 'lightslategray', 'lightsteelblue',
    'mistyrose', 'lavender', 'lightcyan', 'gainsboro', 'thistle',
    'palegoldenrod', 'honeydew',
  ];

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('cvData'));
    if (savedData) {
      setFormData(savedData);
    } else {
      router.push('/builder');
    }
  }, []);

  const handleTemplateChange = (t) => {
    setTemplate(t);
    toast.success(`Template ${t} selected`);
  };

  const handleColorChange = (c) => {
    setColor(c);
    toast.success(`${capitalize(c)} theme applied`);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Toaster />
      <div className="max-w-screen-xl mx-auto">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Choose Your CV Template & Theme
          </h1>

          {/* Template Selector */}
          <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Template</h2>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((t) => (
                <button
                  key={t}
                  onClick={() => handleTemplateChange(t)}
                  className={`px-4 py-2 rounded-md font-semibold transition ${
                    template === t
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 hover:bg-gray-400 text-black'
                  }`}
                >
                  Template {t}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Theme Color</h2>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => handleColorChange(c)}
                  className="w-6 h-6 rounded-full border-2"
                  style={{
                    backgroundColor: c,
                    borderColor: color === c ? 'black' : '#ccc',
                    boxShadow: color === c ? '0 0 0 3px rgba(0,0,0,0.3)' : 'none',
                  }}
                  title={capitalize(c)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CV Preview */}
        {formData && (
          <>
            <div
              ref={cvRef}
              className="w-full min-h-screen overflow-hidden"
              style={{ margin: 0, padding: 0 }}
            >
              {template === 1 && <CVTemplate1 data={formData} color={color} />}
              {template === 2 && <CVTemplate2 data={formData} color={color} />}
              {template === 3 && <CVTemplate3 data={formData} color={color} />}
              {template === 4 && <CVTemplate4 data={formData} color={color} />}
              {template === 5 && <CVTemplate5 data={formData} color={color} />}

            </div>

            <div className="text-center p-4">
              <ExportButton cvRef={cvRef} />

            </div>
          </>
        )}
      </div>
    </div>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
