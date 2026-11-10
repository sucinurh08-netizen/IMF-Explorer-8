import { Link } from 'react-router-dom';

const modules = [
  { number: 1, title: 'Fenomena Air dan Minyak', path: '/module-1' },
  { number: 2, title: 'Pengantar Gaya Antarmolekul', path: '/module-2' },
  { number: 3, title: 'Gaya Dispersi London', path: '/module-3' },
  { number: 4, title: 'Gaya Dipol-Dipol', path: '/module-4' },
  { number: 5, title: 'Ikatan Hidrogen', path: '/module-5' },
  { number: 6, title: 'Elaborate: Penerapan Gaya Antarmolekul', path: '/module-6' },
  { number: 7, title: 'Evaluate: Evaluasi Pembelajaran', path: '/module-7' },
];

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Selamat datang di IMF Explorer
      </h1>

      <p className="mb-6">
        Aplikasi pembelajaran interaktif tentang gaya antarmolekul untuk kelas XI SMA/MA.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <Link
            key={module.number}
            to={module.path}
            className="block p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <h2 className="font-bold">
              Modul {module.number}
            </h2>
            <p>{module.title}</p>
            <span className="text-sm">Buka Modul →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}