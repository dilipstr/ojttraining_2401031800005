export default function SearchBus({ref}) {
    return (
        <div className="bg-slate-900 py-20 px-8 text-center" ref={ref}>
            <h1 className="text-white text-5xl font-bold mb-2">Find your next bus</h1>
            <p className="text-gray-400 mb-6">Real-time schedules & live tracking across all routes</p>
            <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto flex gap-3 flex-wrap items-end">
                <input type="text" placeholder="From — e.g. Ajmer" className="flex-1 min-w-36 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm" />
                <input type="text" placeholder="To — e.g. Jaipur" className="flex-1 min-w-36 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm" />
                <input type="date" className="flex-1 min-w-36 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm" />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold">Search</button>
            </div>
        </div>
    )
}