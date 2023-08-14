let editorHtml;
let editorCss;
let editorJs;

require.config({
  paths: {
    vs: "https://unpkg.com/monaco-editor@0.12.0/min/vs",
  },
});

window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(
  new Blob(
    [
      `
self.MonacoEnvironment = {
baseUrl: 'https://unpkg.com/monaco-editor@0.12.0/min/'
};
importScripts('https://unpkg.com/monaco-editor@0.12.0/min/vs/base/worker/workerMain.js');
`,
    ],
    { type: "text/javascript" }
  )
);

const makeCodeEditorHtml = (code, idContainer) => {
  require(["vs/editor/editor.main"], function () {
    editorHtml = monaco.editor.create(document.getElementById(idContainer), {
      value: [code].join("\n"),
      language: "html",
      theme: "vs-dark",
    });
    editorHtml.onDidChangeModelContent(() => {
      makePreview();
    });
  });
};

const makeCodeEditorCss = (code, idContainer) => {
  require(["vs/editor/editor.main"], function () {
    editorCss = monaco.editor.create(document.getElementById(idContainer), {
      value: [code].join("\n"),
      language: "css",
      theme: "vs-dark",
    });

    editorCss.onDidChangeModelContent(() => {
      makePreview();
    });
  });
};

const makeCodeEditorJs = (code, idContainer) => {
  require(["vs/editor/editor.main"], function () {
    editorJs = monaco.editor.create(document.getElementById(idContainer), {
      value: [code].join("\n"),
      language: "javascript",
      theme: "vs-dark",
    });
    editorJs.onDidChangeModelContent(() => {
      makePreview();
    });
  });
};
