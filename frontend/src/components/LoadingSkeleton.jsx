import React from "react";

export default function LoadingSkeleton({ type = "card" }) {
  if (type === "card") {
    return (
      <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        <div className="relative h-56 w-full overflow-hidden bg-slate-700">
          <div className="skeleton h-full w-full" />
        </div>
        <div className="p-5 space-y-3">
          <div className="skeleton-line w-3/4 h-6" />
          <div className="skeleton-line w-full h-4" />
          <div className="skeleton-line w-1/2 h-4" />
          <div className="flex items-center gap-3 mt-4">
            <div className="skeleton-circle w-8 h-8" />
            <div className="skeleton-line w-1/4 h-4" />
          </div>
          <div className="skeleton-button mt-4" />
        </div>
      </div>
    );
  }

  if (type === "row") {
    return (
      <div className="w-full h-12 rounded-lg bg-slate-800 border border-slate-700 skeleton-row" />
    );
  }

  // default small box
  return <div className="skeleton w-full h-6 rounded" />;
}
