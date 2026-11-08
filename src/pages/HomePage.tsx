
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Selamat datang di IMF Explorer</h1>
      <p className="mb-4">
        Aplikasi pembelajaran interaktif tentang gaya antarmolekul untuk kelas XI SMA/MA.
      </p>
      <Link
        to="/module-1"
        className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        → Modul 1: Fenomena Air &amp; Minyak
      </Link>
    </div>
  );
}

