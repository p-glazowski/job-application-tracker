export default function NavBar() {
  return (
    <header className="border-b border-2 border-black/20 p-4">
      <nav className="px-20 mx-auto flex items-center justify-between">
        <div className="font-bold text-xl text-pink-600">Job Tracker</div>
        <ul className="text-gray-500 font-bold">
          <li>Sign In</li>
        </ul>
      </nav>
    </header>
  );
}
