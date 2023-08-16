import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import "./App.css";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
const markdown = `
Just a link: https://reactjs.com.

# A demo of \`react-markdown\`

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`h1\`)
* Has a lot of plugins

## Syntax highlighting

Here is an example of a plugin to highlight code:
[ \`rehype-highlight\`](https://github.com/rehypejs/rehype-highlight).

\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

ReactDOM.render(
  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{'# Your markdown here'}</ReactMarkdown>,
  document.querySelector('#content')
)
\`\`\`


`;

const App = () => {
  return (
    <div className="container mx-auto lg:px-10 lg:py-10 py-5 px-5">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold text-blue-500">Hello Markdown!</h1>

        <ReactMarkdown
          className="markdown-body"
          children={markdown}
          remarkPlugins={[remarkGfm]}
          components={CodeBlock}
        />
      </div>
    </div>
  );
};

const CodeBlock = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={a11yDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export default App;
