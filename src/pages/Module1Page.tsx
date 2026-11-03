import React, { useState, useEffect } from 'react';
import { MODULE_1 } from '../data/module1';
import QuizPlaceholder from '../components/QuizPlaceholder';
import { MODULE_1_CONTENT } from '../data/module1Content';
import { useNavigate } from 'react-router-dom';

const Module1Page: React.FC = () => {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<any>(null);

  // Load any saved draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`draft-${MODULE_1.id}`);
      if (saved) setDraft(JSON.parse(saved));
    } catch (e) {
      console.warn('Failed to parse draft from localStorage');
    }
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="p-4">
      <button onClick={handleBack} className="mb-4 text-blue-600 underline">
        ← Kembali ke Beranda
      </button>
      <h1 className="text-2xl font-bold mb-2">{MODULE_1.title}</h1>
      <p className="mb-4">{MODULE_1.shortDesc}</p>
      <p className="italic mb-6">{MODULE_1.scientificNotes}</p>

      {/* ----- MATERI ----- */}
        {MODULE_1_CONTENT.map((sec, idx) => (
          <section key={idx} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{sec.title}</h2>
            <p className="whitespace-pre-line">{sec.body}</p>
            {sec.citation && (
              <p className="mt-1 text-sm text-gray-500">Sumber: {sec.citation}</p>
            )}
          </section>
        ))}
        {/* ----- QUIZ PLACEHOLDER (Honest marker for Meeting 3) ----- */}
      <QuizPlaceholder moduleId={MODULE_1.id} draft={draft} setDraft={setDraft} />
    </div>
  );
};

export default Module1Page;

