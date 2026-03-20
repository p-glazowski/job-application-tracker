export default function Footer() {
  const date = new Date();
  console.log(date.getFullYear);
  return (
    <footer className="flex items-center justify-center p-1 bg-pink-500 text-sm text-white font-bold mt-20">
      <h4>
        Created by Piotr Głazowski{' '}
        <span className="ml-0">&copy; {date.getFullYear()}</span>
      </h4>
    </footer>
  );
}
