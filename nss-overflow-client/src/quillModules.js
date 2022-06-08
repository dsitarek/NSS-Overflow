import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

hljs.configure({
  languages: [
    'javascript',
    'ts',
    'sql',
    'ruby',
    'python',
    'cs',
    'cpp',
    'java',
    'php',
    'css',
    'graphql',
    'html',
    'xml',
    'json',
  ],
});

const modules = {
  toolbar: [
    [{ size: ['normal', 'small', 'large', 'huge'] }],
    [{ color: [] }],
    ['code-block'],
    ['bold', 'italic'],
    ['blockquote', 'link'],
    [({ list: 'ordered' }, { list: 'bullet' })],
  ],

  clipboard: {
    matchVisual: false,
  },
  syntax: { highlight: (text) => hljs.highlightAuto(text).value },
};

const bubbleModule = {
  syntax: { highlight: (text) => hljs.highlightAuto(text).value },
};

export { modules, bubbleModule };
