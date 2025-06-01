"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void; }) {
  // Optional: Report to an error‐tracking service here
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 dark:bg-red-900 p-4">
      <h1 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4">
        Something went wrong.
      </h1>
      <p className="text-red-600 dark:text-red-200 mb-6">
        The page failed to load. Try refreshing?
      </p>
      <button
        onClick={() => reset()}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        Refresh
      </button>
    </div>
  );
}
