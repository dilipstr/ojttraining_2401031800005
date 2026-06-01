export default function Schedules({ data,ref }) {
    return (
        <section className="p-8" ref={ref}>
            <h2 className="text-lg font-bold mb-4">📅 Today's Schedule — Ajmer Bus Stand</h2>
            <table className="w-full bg-white rounded-xl overflow-hidden shadow-md">
                <thead><tr className="bg-slate-900 text-gray-300 text-xs uppercase tracking-wider"><th className="px-4 py-3 text-left">Route</th><th className="px-4 py-3 text-left">Destination</th><th className="px-4 py-3 text-left">Departs</th><th className="px-4 py-3 text-left">Arrives</th><th className="px-4 py-3 text-left">Type</th><th className="px-4 py-3 text-left">Fare</th><th className="px-4 py-3 text-left">Status</th></tr></thead>
                <tbody>
                    {
                        data.map((t) => <tr className="hover:bg-blue-50"><td className="px-4 py-3 border-b border-gray-200"><b>{t.route}</b></td><td className="px-4 py-3 border-b border-gray-200">{t.destination}</td><td className="px-4 py-3 border-b border-gray-200">{t.departs}</td><td className="px-4 py-3 border-b border-gray-200">{t.arrives}</td><td className="px-4 py-3 border-b border-gray-200">{t.type}</td><td className="px-4 py-3 border-b border-gray-200">{t.fare}</td><td className="px-4 py-3 border-b border-gray-200"><span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">{t.status}</span></td></tr>)
                    }
                </tbody>
            </table>
        </section>
    )
}