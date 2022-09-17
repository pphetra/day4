import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <ul>
        <li>
          <Link href="/ex1">Exercise #1</Link>
        </li>
      </ul>
    </div>
  );
}
