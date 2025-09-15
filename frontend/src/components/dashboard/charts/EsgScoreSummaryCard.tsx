
import { CheckCircle } from "lucide-react";

export function EsgScoreSummaryCard({ esgOverall }: { esgOverall: number }) {
  return (
    <div className="flex-1 min-w-[140px] flex flex-wrap sm:flex-nowrap items-center gap-2 bg-white/80 dark:bg-blue-800/10 px-3 sm:px-5 py-2 rounded-lg border border-blue-100 dark:border-blue-800 shadow-inner">
      <CheckCircle
        className={
          "mr-1 sm:mr-2 w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 " +
          (esgOverall >= 80
            ? "text-green-500"
            : esgOverall >= 60
            ? "text-yellow-500"
            : "text-red-500")
        }
      />
      <span className="font-medium text-gray-900/80 dark:text-white/80 text-base sm:text-lg flex items-center flex-wrap">
        <span className="mr-1">ESG Score:</span>{" "}
        <span
          className={
            "font-black text-xl sm:text-2xl ml-1 sm:ml-2 " +
            (esgOverall >= 80
              ? "text-green-600"
              : esgOverall >= 60
              ? "text-yellow-500"
              : "text-red-500")
          }
        >
          {esgOverall}
        </span>
        <span className="font-bold text-gray-600 dark:text-gray-300 ml-1 text-sm sm:text-base">/100</span>
      </span>
      <span
        className={
          "ml-auto rounded px-2 py-1 text-xs font-semibold shadow-lg whitespace-nowrap " +
          (esgOverall >= 80
            ? "bg-green-500/90 text-gray-900 dark:text-white"
            : esgOverall >= 60
            ? "bg-yellow-400/90 text-gray-900 dark:text-white"
            : "bg-red-500/90 text-gray-900 dark:text-white")
        }
      >
        {esgOverall >= 80
          ? "High"
          : esgOverall >= 60
          ? "Moderate"
          : "Low"}
      </span>
    </div>
  );
}
