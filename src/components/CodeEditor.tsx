import { useEffect, useState } from "react";
import AceEditor from "react-ace";

import ace from "ace-builds/src-noconflict/ace";

ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/"
);
ace.config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js"
);
ace.config.setModuleUrl(
  "ace/mode/javascript",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/mode-javascript.js"
);


import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";

import { api } from "~/utils/api";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

export default function CodeEditor () {
  const [rawCode, setRawCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const runCodeMutation = api.example.runCode.useMutation();

  useEffect(() => {
    switch (language) {
      case 'javascript':
        setRawCode(`console.info("Hello, JavaScript...")`);
        break
      case 'python':
        setRawCode(`print("Hello, Python...!")`);
        break
    }
  }, [language])

  return (
    <div>
      <AceEditor
        setOptions={{ useWorker: true }}
        value={rawCode}
        mode={language}
        theme="github"
        onChange={(rawCode) => setRawCode(rawCode)}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
      <select onChange={e => setLanguage(e.target.value)}>
        {['javascript', 'python'].map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button
        className="text-slate-50 rounded-full p-2 border-gray-50"
        disabled={runCodeMutation.isLoading}
        onClick={async (e) => {
          e.preventDefault();

          await runCodeMutation.mutateAsync({ rawCode, language })
        }}
      >
        Run
      </button>
    </div>
  )
}
