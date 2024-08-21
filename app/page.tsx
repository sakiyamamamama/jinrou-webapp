// app/page.tsx
import Link from "next/link";
import { getPostsData } from "../lib/post";
import getUniqueStr from "@/lib/getUniqueStr";

export default function Home() {
  // const allPostsData = getPostsData();
  const uniqueValue:string = getUniqueStr();

  return (
    <main>
      {/* <ul>
        {allPostsData.map(({ id,title,thumbnail }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`}></img>
              {title}
            </Link>
          </li>
        ))}
      </ul> */}
      <h2>人狼ゲーム</h2>
      <Link href={{ pathname: '/gameMain',query:{ gameId: `${uniqueValue}`}}}>プレイ</Link>
    </main>
  );
}
