# markdown-it-hyphenate
Paragraph hyphenation character insertion plugin for markdown-it.

This will hyphenate any flat text using (Linux) system hyphenation library and dictionaries.

## Install

Required are `libhyphen`, hyphenation libraries and the `hyphenate` command-line utility.

For Debian based distributions start by installing libhyphen and any required dictionaries:
```bash
apt install libhyphen hyphen-en-us hyphen-{my languages}

# download and install hyphenate
cd /tmp
git clone https://github.com/StefanHamminga/hyphenate

cd hyphenate/build
cmake -DCMAKE_INSTALL_PREFIX=/usr ..
make
sudo make install
# hyphenate will be installed as /usr/bin/hyphenate
```

Finally, install the plugin in your project directory:
```bash
npm install --save markdown-it-hyphenate
```

## Usage

Use as any other plugin, but be sure to set `language` when rendering. The language should be in `xx_XX` format and correspond to an installed library. If no language is given hyphenation is skipped.

```js
const md = require('markdown-it')()
                .use(require('markdown-it-hyphenate'));

md.render(my_text, { language: 'en_US' });
```

## Notes and license

This project is available on [GitHub](https://github.com/StefanHamminga/markdown-it-hyphenate.js) and [npm](https://www.npmjs.com/package/markdown-it-hyphenate).

The project is licensed as [MIT](https://opensource.org/licenses/MIT) and may be freely used, modified and distributed as such. The license file is included in the project directory.

Copyright 2016 [Stefan Hamminga](mailto:stefan@prjct.net) - [prjct.net](https://prjct.net)
