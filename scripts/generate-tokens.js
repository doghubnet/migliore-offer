const fs = require('node:fs');
const path = require('node:path');

const tokens = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'design-tokens.json'), 'utf8'));

const css = `:root {
  --font-sans: ${tokens.typography['font-family']};
  --base-size: ${tokens.typography.base};
  --h1: 64px;
  --h2: 48px;
  --h3: 36px;
  --h4: 28px;
  --body-size: 16px;
  --lead-size: 20px;
  --brand-900: ${tokens.colors['brand-900']};
  --brand-700: ${tokens.colors['brand-700']};
  --brand-500: ${tokens.colors['brand-500']};
  --accent-500: ${tokens.colors['accent-500']};
  --text-primary: ${tokens.colors['text-primary']};
  --text-muted: ${tokens.colors['text-muted']};
  --bg: ${tokens.colors.bg};
  --card-bg: rgba(11,16,32,0.03);
  --focus-ring: ${tokens.a11y['focus-ring']};
  --radius-lg: 14px;
  --radius-md: 10px;
  --ease-soft: cubic-bezier(.22,.8,.12,1);
  --ease-sharp: cubic-bezier(.2,.9,.2,1);
}`;

fs.writeFileSync(path.join(process.cwd(), 'app/tokens.css'), css + '\n');
console.log('Generated app/tokens.css');
