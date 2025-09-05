import { useMemo, useState } from 'react';

const tabs = ['C++', 'Python', 'Java'];

const codeSamples = {
  'C++': `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // Example: detect if a knight on d4 forks c2 and e2\n  pair<int,int> knight = {3,3}; // 0-indexed: d4\n  vector<pair<int,int>> targets = {{2,1}, {4,1}}; // c2, e2\n  int dx[8] = {1,2,2,1,-1,-2,-2,-1};\n  int dy[8] = {2,1,-1,-2,-2,-1,1,2};\n  auto attacks = [&](pair<int,int> p){\n    set<pair<int,int>> s;\n    for(int i=0;i<8;i++) s.insert({p.first+dx[i], p.second+dy[i]});\n    return s;\n  };\n  auto a = attacks(knight);\n  bool fork = a.count(targets[0]) && a.count(targets[1]);\n  cout << (fork ? "FORK" : "NO FORK") << "\n";\n  return 0;\n}`,
  'Python': `# Example: detect if a knight on d4 forks c2 and e2\nknight = (3, 3)  # 0-indexed: d4\ntargets = {(2, 1), (4, 1)}  # c2, e2\ndirs = [(1,2),(2,1),(2,-1),(1,-2),(-1,-2),(-2,-1),(-2,1),(-1,2)]\nattacks = {(knight[0]+dx, knight[1]+dy) for dx,dy in dirs}\nprint('FORK' if targets.issubset(attacks) else 'NO FORK')`,
  'Java': `import java.util.*;\npublic class Main {\n  static Set<String> attacks(int x, int y){\n    int[] dx = {1,2,2,1,-1,-2,-2,-1};\n    int[] dy = {2,1,-1,-2,-2,-1,1,2};\n    Set<String> s = new HashSet<>();\n    for(int i=0;i<8;i++) s.add((x+dx[i])+","+(y+dy[i]));\n    return s;\n  }\n  public static void main(String[] args){\n    Set<String> a = attacks(3,3); // d4\n    boolean fork = a.contains("2,1") && a.contains("4,1"); // c2, e2\n    System.out.println(fork ? "FORK" : "NO FORK");\n  }\n}`
};

// Minimal client-side highlighter (regex-based) to avoid external deps.
function highlight(code, lang) {
  if (lang === 'C++') return highlightCpp(code);
  if (lang === 'Python') return highlightPy(code);
  if (lang === 'Java') return highlightJava(code);
  return escapeHtml(code);
}

function escapeHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

const kw = {
  cpp: /\b(alignas|alignof|and|and_eq|asm|atomic_cancel|atomic_commit|atomic_noexcept|auto|bitand|bitor|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|operator|or|or_eq|private|protected|public|register|reinterpret_cast|required|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|xor|xor_eq)\b/g,
  py: /\b(and|as|assert|async|await|break|class|continue|def|del|elif|else|except|False|finally|for|from|global|if|import|in|is|lambda|None|nonlocal|not|or|pass|raise|return|True|try|while|with|yield)\b/g,
  java: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while|true|false)\b/g,
};

function colorize(code, regex){
  return code
    .replace(/(&)/g,'&amp;').replace(/</g,'&lt;')
    .replace(/\b([0-9]+)\b/g, '<span class="text-amber-300">$1</span>')
    .replace(/(\"[^\"\n]*\"|\'[^\'\n]*\')/g, '<span class="text-emerald-300">$1</span>')
    .replace(/(\/\/.*?$)/gm, '<span class="text-neutral-400">$1</span>')
    .replace(/(#.*?$)/gm, '<span class="text-neutral-400">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-neutral-400">$1</span>')
    .replace(regex, '<span class="text-sky-300">$1</span>');
}

function highlightCpp(code){
  return colorize(code, kw.cpp);
}
function highlightPy(code){
  return colorize(code, kw.py);
}
function highlightJava(code){
  return colorize(code, kw.java);
}

export default function CodeModule() {
  const [active, setActive] = useState('C++');

  const highlighted = useMemo(() => ({
    __html: highlight(codeSamples[active], active)
  }), [active]);

  return (
    <div className="w-full flex flex-col">
      <div className="inline-flex items-center rounded-lg overflow-hidden border border-neutral-800 self-start mb-3">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-4 py-2 text-sm font-medium transition ${
              active === t ? 'bg-neutral-800 text-white' : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="relative bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-7 bg-gradient-to-r from-fuchsia-600/30 via-indigo-600/30 to-sky-600/30 pointer-events-none" />
        <pre className="p-4 md:p-6 overflow-auto text-[13px] leading-6">
          <code dangerouslySetInnerHTML={highlighted} />
        </pre>
      </div>
    </div>
  );
}
