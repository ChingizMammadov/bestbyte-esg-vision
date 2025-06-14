
import { CheckCircle } from "lucide-react";

export function EsgScoreSummaryCard({ esgOverall }: { esgOverall: number }) {
  return (
    <div className="flex-1 min-w-[140px] flex items-center gap-2 bg-white/80 px-5 py-2 rounded-lg border border-blue-100 shadow-inner">
      <CheckCircle
        className={
          "mr-2 w-7 h-7 " +
          (esgOverall >= 80
            ? "text-green-500"
            : esgOverall >= 60
            ? "text-yellow-500"
            : "text-red-500")
        }
      />
      <span className="font-medium text-gray-900/80 text-lg flex items-center">
        ESG Score:{" "}
        <span
          className={
            "font-black text-2xl ml-2 " +
            (esgOverall >= 80
              ? "text-green-600"
              : esgOverall >= 60
              ? "text-yellow-500"
              : "text-red-500")
          }
        >
          {esgOverall}
        </span>
        <span className="font-bold text-gray-600 ml-1 text-base">/100</span>
      </span>
      <span
        className={
          "ml-4 rounded px-2 py-1 text-xs font-semibold shadow-lg " +
          (esgOverall >= 80
            ? "bg-green-500/90 text-white"
            : esgOverall >= 60
            ? "bg-yellow-400/90 text-gray-900"
            : "bg-red-500/90 text-white")
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
