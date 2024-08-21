import Link from "next/link";
import {getAllPostIds, getPostsData} from "../../../lib/post";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const posts = getPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

type PostParams = {
  params: {
    id: string;
  };
};


export default function Post({params}:PostParams) {

  const { id } = params;
  const postData = getPostsData().find((post)=> post.id === id);

  if (!postData) {
    return {
      notFound: true, // これでNext.jsがカスタム404ページを表示
    };
  }

  return (
    <div>
      <h2 className="text-3xl text-red-700">{postData.title}</h2>
      <p>{postData.content}</p>
      <Link href="/">戻る</Link>
    </div>
  );
}
