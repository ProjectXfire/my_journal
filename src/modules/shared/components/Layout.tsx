import Head from "next/head";
import React, { FC } from "react";

interface Props {
  title: string;
  name: string;
  content: string;
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ title, name, content, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={name} content={content} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
};
