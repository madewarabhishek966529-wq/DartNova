/**
 * Dart & Flutter Lightweight Syntax Highlighter
 * Colorizes Dart code tokens for display in HTML pre/code elements
 */

export function highlightDart(code) {
  if (!code) return '';

  // Escape HTML characters first
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Storage for protected strings and comments
  const placeholders = [];
  const protect = (match, className) => {
    const id = `___TOKEN_${placeholders.length}___`;
    placeholders.push(`<span class="${className}">${match}</span>`);
    return id;
  };

  // 1. Comments
  html = html.replace(/\/\/.*/g, (m) => protect(m, 'token-comment'));
  html = html.replace(/\/\*[\s\S]*?\*\//g, (m) => protect(m, 'token-comment'));

  // 2. Strings
  html = html.replace(/(['"])(?:(?!\1|\\).|\\.)*\1/g, (m) => protect(m, 'token-string'));
  html = html.replace(/'''[\s\S]*?'''/g, (m) => protect(m, 'token-string'));

  // 3. Annotations (@override, @required, etc.)
  html = html.replace(/@\w+/g, '<span class="token-annotation">$&</span>');

  // 4. Keywords
  const keywords = [
    'abstract', 'as', 'assert', 'async', 'await', 'break', 'case', 'catch', 'class',
    'const', 'continue', 'default', 'deferred', 'do', 'dynamic', 'else', 'enum',
    'export', 'extends', 'extension', 'external', 'factory', 'false', 'final', 'finally',
    'for', 'get', 'if', 'implements', 'import', 'in', 'is', 'late', 'library', 'mixin',
    'new', 'null', 'on', 'operator', 'part', 'required', 'rethrow', 'return', 'set',
    'show', 'static', 'super', 'switch', 'sync', 'this', 'throw', 'true', 'try',
    'typedef', 'var', 'void', 'while', 'with', 'yield'
  ];
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  html = html.replace(keywordRegex, '<span class="token-keyword">$1</span>');

  // 5. Common Flutter Types & Classes
  const types = [
    'Widget', 'StatelessWidget', 'StatefulWidget', 'State', 'BuildContext', 'Key',
    'Animation', 'AnimationController', 'CurvedAnimation', 'Curves', 'Tween',
    'Color', 'Colors', 'Container', 'SizedBox', 'Padding', 'EdgeInsets', 'Column',
    'Row', 'Center', 'Transform', 'Matrix4', 'GestureDetector', 'MouseRegion',
    'AnimatedContainer', 'AnimatedBuilder', 'CustomPainter', 'Canvas', 'Size',
    'Paint', 'PaintingStyle', 'Path', 'Offset', 'Radius', 'BorderRadius', 'BoxDecoration',
    'BoxShadow', 'Alignment', 'Duration', 'Curve', 'VoidCallback', 'ValueChanged',
    'TickerProvider', 'SingleTickerProviderStateMixin', 'String', 'int', 'double',
    'bool', 'List', 'Map', 'Set', 'TextStyle', 'FontWeight', 'MaterialApp', 'Scaffold',
    'InkWell', 'ClipRRect', 'Stack', 'Positioned', 'Opacity', 'FractionallySizedBox'
  ];
  const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
  html = html.replace(typeRegex, '<span class="token-type">$1</span>');

  // 6. Numbers
  html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="token-number">$1</span>');

  // Restore protected comments and strings
  placeholders.forEach((tokenHtml, idx) => {
    html = html.replace(`___TOKEN_${idx}___`, tokenHtml);
  });

  return html;
}
