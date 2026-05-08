export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#111827]">
      {/* 导航栏骨架 */}
      <div className="h-16 border-b border-[#1f2933] animate-pulse" />
      
      <main className="max-w-7xl mx-auto px-6 py-28">
        {/* 标题骨架 */}
        <div className="mb-8">
          <div className="h-10 bg-[#1f2933] rounded w-1/4 mb-4 animate-pulse" />
          <div className="h-6 bg-[#1f2933] rounded w-1/2 animate-pulse" />
        </div>

        {/* 分类筛选骨架 */}
        <div className="flex gap-2 mb-8">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-10 w-24 bg-[#1f2933] rounded-full animate-pulse" />
          ))}
        </div>

        {/* 产品网格骨架 - 3列 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="border border-[#1f2933] rounded-2xl overflow-hidden bg-[#1f2933]/60 animate-pulse">
              {/* 图片占位 */}
              <div className="h-48 bg-[#374151]" />
              {/* 文字占位 */}
              <div className="p-4 space-y-3">
                <div className="h-4 bg-[#374151] rounded w-1/3" />
                <div className="h-5 bg-[#374151] rounded w-full" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-[#374151] rounded w-1/4" />
                  <div className="h-4 bg-[#374151] rounded w-1/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
