'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import getUniqueStr from '@/lib/getUniqueStr';
import CopyDialog from './copyDialog';

export default function GameMain() {
  const router = useRouter();
  const searchParams = useSearchParams();  // クエリパラメーターを取得
  const pathname = usePathname();          // 現在のパス名を取得
  const uniqueVal = getUniqueStr();
  const [showDialog,setShowDialog] = useState<boolean>(false);
  const [post,setPost] = useState<string>("GUEST");
  const [playerId,setPlayerId] = useState<string>(uniqueVal);
  const [peopleNum,setPeopleNum] = useState<number>(0);

  useEffect(()=>{
    const getPost = searchParams.get('post');
    if(getPost){
      setPost(getPost!);
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('post');
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    }
  },[])

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('playerId', playerId);

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  }, [searchParams, pathname, router]);

  const issueUrl=()=>{
    const gameId = searchParams.get('gameId');
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_BASE_URL + "/gameMain?gameId=" + gameId);
    setShowDialog(true);
    const timer = setTimeout(() => {
      setShowDialog(false);
    }, 4000);
  }

  return (
    <div>
      {showDialog && <CopyDialog message="クリップボードにコピーしました" />}
      <h1>Game Main Page</h1>
      <p>人が参加しています</p>
      <p>Game ID: {searchParams.get('gameId')}</p>
      <p>Player ID: {searchParams.get('playerId')}</p>
      <p>Post: {post}</p>
      <button onClick={issueUrl}>入室用URLをコピー</button>
    </div>
  );
}
