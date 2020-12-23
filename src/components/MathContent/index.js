import React from 'react';

//https://levelup.gitconnected.com/adding-katex-and-markdown-in-react-7b70694004ef

import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const _mapProps = (props) => ({
	...props,
	escapeHtml: false,
	plugins: [
		RemarkMathPlugin
	],
	renderers: {
		...props.renderers,
		math: ({ value }) => <BlockMath>{value}</BlockMath>,
		inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>
	}
});

const MathContent = (props) => <ReactMarkdown {..._mapProps(props)} />;

export default MathContent;