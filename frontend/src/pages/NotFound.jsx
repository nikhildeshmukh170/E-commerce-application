import { Link } from "react-router-dom";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: TEXT & ACTIONS */}
        <div>
          <p className="text-[var(--brand-muted)] text-sm mb-2">
            Error 404
          </p>

          <h1 className="text-5xl md:text-6xl font-semibold text-[var(--brand-text)] leading-tight">
            This page <br /> isn’t here
          </h1>

          <p className="text-[var(--brand-muted)] mt-5 max-w-md">
            The page you’re trying to reach may have been moved,
            deleted, or never existed. Let’s help you find your way back.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="
                inline-flex items-center gap-2
                btn-primary
                px-6 py-3
                rounded-md
                font-medium
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
                border border-[var(--brand-border)]
                text-[var(--brand-text)]
                px-6 py-3
                rounded-md
                hover:bg-gray-50
                transition
              "
            >
              <FiSearch />
              Browse products
            </Link>
          </div>
        </div>

        {/* RIGHT: VISUAL ANCHOR */}
        <div className="relative">
          {/* Offset background layer */}
          <div className="absolute inset-0 card-brand translate-x-2 translate-y-2" />

          {/* Main card */}
          <div className="relative card-brand p-10">
            <div className="text-[var(--brand-muted)] text-sm mb-4">
              Lost but not broken
            </div>

            <div className="text-8xl font-bold text-[var(--brand-primary)]/20 leading-none">
              404
            </div>

            <p className="text-[var(--brand-muted)] mt-4 max-w-xs">
              Even the best journeys sometimes take a wrong turn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
