import { GetServerSideProps } from "next";
import { getSession, GetSessionParams } from "next-auth/react";
import { getPrismicClient } from "../../services/prismic";
import Head from "next/head";
import { PrismicRichText } from "@prismicio/react";

import styles from './post.module.scss'

interface PostProps {
   post: {
      slug: string;
      title: string;
      content: any;
      updatedAt: string;
   },
}

export default function Post({ post }: PostProps ) {
   return (
      <>
         <Head>
            <title>{post.title} | Ignews</title>
         </Head>

         <main className={styles.mainBox}>
            <article className={styles.post}>
               <h1>{post.title}</h1>
               <time>{post.updatedAt}</time>
               <div className={styles.postContent}>
                  <PrismicRichText field={post.content} />
               </div>
            </article>
         </main>
      </>
   );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
   const session: any = getSession({ req });
   const { slug } = params;

   if (!session.activeSubscription) {
      return {
         redirect: {
            destination: '/',
            permanent: false,
         }
      }
   }

   const prismic = getPrismicClient(req);

   const response = await prismic.getByUID('post', String(slug), {});

   const post = {
      slug,
      title: response.data.title,
      content: response.data.content,
      updatedAt: new Date(response.last_publication_date).toLocaleString('pt-BR', {
         day: '2-digit',
         month: 'long',
         year: 'numeric',
      }),
   };

   return {
      props: {
         post,
      },
   }
}