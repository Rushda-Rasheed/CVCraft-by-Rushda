import React, { useState, useRef, useEffect } from 'react';
import CVForm from '../components/CVForm';

export default function Builder() {
  const [formData, setFormData] = useState({});
  const [template, setTemplate] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const cvRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    const storedData = localStorage.getItem('cvData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-screen form */}
      <CVForm setFormData={setFormData} />
    </div>
  );
}
