import { Link } from "react-router-dom";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: TEXT & ACTIONS */}
        <div>
          <p className="text-slate-500 text-sm mb-2">Error 404</p>

          <h1 className="text-5xl md:text-6xl font-semibold text-white leading-tight">
            This page <br /> isn’t here
          </h1>

          <p className="text-slate-400 mt-5 max-w-md">
            The page you’re trying to reach may have been moved,
            deleted, or never existed. Let’s help you find your way back.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="
                inline-flex items-center gap-2
                bg-slate-100
                text-slate-900
                px-6 py-3
                rounded-md
                font-medium
                hover:bg-white
                transition
              "
            >
              <FiArrowLeft />
              Back to home
            </Link>

            <Link
              to="/"
              className="
                inline-flex items-center gap-2
                border border-slate-700
                text-slate-300
                px-6 py-3
                rounded-md
                hover:bg-slate-800
                transition
              "
            >
              <FiSearch />
              Browse products
            </Link>
          </div>
        </div>

        {/* RIGHT: CREATIVE VISUAL */}
        <div className="relative">
          {/* Background panel */}
          <div className="absolute inset-0 bg-slate-800 border border-slate-700 rounded-2xl" />

          {/* Offset layer */}
          <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-10 translate-x-3 translate-y-3">
            <div className="text-slate-400 text-sm mb-4">
              Lost but not broken
            </div>

            <div className="text-8xl font-bold text-slate-700 leading-none">
              404
            </div>

            <p className="text-slate-400 mt-4 max-w-xs">
              Even the best journeys sometimes take a wrong turn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
