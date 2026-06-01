export default function Features() {
    return (
        <section className="p-8">
            <h2 className="text-lg font-bold mb-6">✨ Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border-2 border-gray-200"><div className="text-2xl mb-2">📍</div><h3 className="font-bold text-sm mb-2">Live GPS Tracking</h3><p className="text-xs text-gray-500 leading-relaxed">See your bus on a live map updated every 15 seconds.</p></div>
                <div className="bg-white rounded-xl p-5 border-2 border-gray-200"><div className="text-2xl mb-2">⏰</div><h3 className="font-bold text-sm mb-2">Real-time Schedules</h3><p className="text-xs text-gray-500 leading-relaxed">Accurate times with live delay notifications.</p></div>
                <div className="bg-white rounded-xl p-5 border-2 border-gray-200"><div className="text-2xl mb-2">🔔</div><h3 className="font-bold text-sm mb-2">Smart Alerts</h3><p className="text-xs text-gray-500 leading-relaxed">Get notified when your bus is approaching or delayed.</p></div>
                <div className="bg-white rounded-xl p-5 border-2 border-gray-200"><div className="text-2xl mb-2">🎫</div><h3 className="font-bold text-sm mb-2">Ticket Booking</h3><p className="text-xs text-gray-500 leading-relaxed">Book & pay for tickets directly with QR code passes.</p></div>
            </div>
        </section>
    )
}