/**
 * LoadingSkeleton Component
 * Renders shimmering skeleton elements matching the dashboard's layout
 * to ensure a smooth loading transition without layout shifting.
 */
export default function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
        <div className="h-10 w-36 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>

      {/* KPI Cards Skeleton (6 items) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl space-y-3"
          >
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-7 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3.5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>

      {/* Section 1 Charts (Pie + Funnel) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie/Doughnut Chart Skeleton */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl h-[380px] flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3.5 w-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="flex items-center justify-around my-auto">
            <div className="w-40 h-40 rounded-full border-[16px] border-gray-200 dark:border-gray-900 flex items-center justify-center"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-4.5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Funnel Chart Skeleton */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 p-6 rounded-2xl h-[380px] flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3.5 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 my-auto w-full px-8">
            <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="w-4/5 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="w-3/5 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="w-2/5 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="w-1/5 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Section 2 Charts (Bar + Line) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl h-[360px] flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="h-5 w-44 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3.5 w-56 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-48 w-full bg-gray-100 dark:bg-gray-900 rounded-xl relative flex items-end justify-between p-4 gap-3">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-250 dark:bg-gray-750 rounded-t-lg flex-1"
                  style={{ height: `${20 + idx * 12}%` }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Section 3 Charts (Revenue + Lead Sources) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl h-[360px] flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="h-5 w-44 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3.5 w-56 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-48 w-full bg-gray-100 dark:bg-gray-900 rounded-xl"></div>
          </div>
        ))}
      </div>

      {/* Heatmap & Top Performers Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heatmap skeleton */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl h-[300px] flex flex-col justify-between">
          <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-36 w-full bg-gray-100 dark:bg-gray-900 rounded-xl"></div>
        </div>
        {/* Top Performers skeleton */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl h-[300px] flex flex-col justify-between">
          <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="space-y-3 mt-4">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-4.5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="h-4.5 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
