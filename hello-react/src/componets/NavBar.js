export default function NavBar({scrollPage,refs}) {
    return (
        <nav className="bg-slate-950 px-8 py-4 flex justify-between items-center sticky top-0">
            <a href="/" className="text-white text-xl font-bold">🚌 Buskhojo</a>
            <ul class="flex gap-6 list-none">
                <li><a href="/" className="text-gray-300 text-sm hover:text-white" onClick={(e)=>scrollPage(e,refs.searchBus)}>Search</a></li>
                <li><a href="/" className="text-gray-300 text-sm hover:text-white" onClick={(e)=>scrollPage(e,refs.schedules)}>Schedules</a></li>
                <li><a href="/" className="text-gray-300 text-sm hover:text-white" >Tracking</a></li>
                <li><a href="/" className="text-gray-300 text-sm hover:text-white">My Tickets</a></li>
            </ul>
        </nav>
    )
}