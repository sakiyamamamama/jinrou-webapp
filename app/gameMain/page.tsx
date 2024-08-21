'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import getUniqueStr from '@/lib/getUniqueStr';

export default function GameMain() {
  const router = useRouter();
  const searchParams = useSearchParams();  // クエリパラメーターを取得
  const pathname = usePathname();          // 現在のパス名を取得
  const uniqueVal = getUniqueStr();
  const [post,setPost] = useState<string>();
  const [playerId,setPlayerId] = useState<string>(uniqueVal);

  const removeQueryParam = (param:string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(param); // パラメーターを削除

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    const gameId = searchParams.get('gameId');
    if (gameId) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('playerId', playerId);
      
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [searchParams, pathname, router]);

  const issueUrl=()=>{
    const gameId = searchParams.get('gameId');
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_BASE_URL + "/gameMain?gameId=" + gameId);
  }

  return (
    <div>
      <h1>Game Main Page</h1>
      <p>Game ID: {searchParams.get('gameId')}</p>
      <p>Player ID: {searchParams.get('playerId')}</p>
      <button onClick={issueUrl}>入室用URLをコピー</button>
    </div>
  );
}
