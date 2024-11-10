export const FlowchartEmbed = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-16 sm:mt-32 mb-8 sm:mb-32">
      <div className="px-4 sm:px-8">
        <div className="p-2 sm:p-4 border border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 rounded-2xl sm:rounded-[32px] relative">
          <div className="relative bg-white dark:bg-black dark:border-neutral-700 border border-neutral-200 rounded-xl sm:rounded-[24px] overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: "calc(56.67% + 60px)" }}>
              <iframe
                src="/flowcharts/mm_004.html?link_target=parent"
                className="absolute inset-0 w-full h-full rounded-xl border border-neutral-200 dark:border-neutral-800 sm:py-7.5 sm:px-10"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 