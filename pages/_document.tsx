import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="泽智合工贸有限公司 - 专业高端厨卫解决方案提供商，提供优质地漏、厨卫配件产品" />
        <meta name="keywords" content="地漏,厨卫配件,泽智合,不锈钢地漏,防臭地漏,隐形地漏,OEM制造商" />
        <meta name="author" content="泽智合工贸有限公司" />
        <meta property="og:title" content="泽智合工贸有限公司 - 专业高端厨卫解决方案" />
        <meta property="og:description" content="专业高端厨卫解决方案提供商，提供优质地漏、厨卫配件产品" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.png" />
        <meta name="robots" content="index, follow" />
        <title>泽智合工贸有限公司 | 专业高端厨卫解决方案</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}