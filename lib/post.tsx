import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(),"posts");

export function getPostsData(){
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName)=>{
        const id:string = fileName.replace(/\.md$/, "");

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath,"utf8");
        const matterResult = matter(fileContents);

        const data:{title:string,content:string,thumbnail:string} = {title:matterResult.data.title,content:matterResult.content,thumbnail:matterResult.data.thumbnail}

        return {
            id,
            ...data,
        };
    });

    return allPostsData;
}

export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName)=>{
        return {
            params:{
                id:fileName.replace(/\.md$/,""),
            },
        };
    });
}

