import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full p-8">
      <ul className="list-disc">
        <li>
          <Link href="/ex2">Exercise #2</Link>
        </li>
        <li>
          <Link href="/registers/use_hook_form">เฉลย Exercise #2</Link>
        </li>
      </ul>
    </div>
  );
}
