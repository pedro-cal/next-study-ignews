import Head from 'next/head'
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import styles from './styles.module.scss';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';

type Post = {
   slug: string;
   title: string;
   excerpt: string;
   updatedAt: string;
}

interface PostsProps {
   posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
   return (
      <>
         <Head>
            <title>Posts | ig.news</title>
         </Head>
         
         <main className={styles.mainBox}>
            <div className={styles.postsBox}>
               {posts && posts.map(post => (
                  <a href="#" key={post.slug}>
                     <time>{post.updatedAt}</time>
                     <strong>{post.title}</strong>
                     <p>{post.excerpt}</p>
                  </a>
               ))}
            </div>
         </main>
      </>
   )
}

export const getStaticProps: GetStaticProps = async () => {
   const prismic = getPrismicClient();

   const response = await prismic.query([
      Prismic.predicates.at('document.type', 'post'),
   ], {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
   });

   const posts = response.results.map((post, i) => {
      return {
         slug: post.uid,
         title: post.data.title,
         excerpt: post.data?.content[i]?.body.find(content => content.type === 'paragraph')?.text ?? '',
         updatedAt: new Date(post.last_publication_date).toLocaleString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
         }),
      }
   })

   return {
      props: {
         posts,
      },
   }
}
