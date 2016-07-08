"use strict";

const spawnSync = require('child_process').spawnSync;

const cfg = {
    executable: "/usr/bin/hyphenate",
    encoding:   'utf8',
    timeout:    5 * 1000, // ms => 5 seconds
    maxBuffer:  200 * 1024
};

// Convert a language code to xx_XX format needed by hyphenate
function langLang(lang) {
    if (lang.length === 2) {
        return `${lang.toLowerCase()}_${lang.toUpperCase()}`;
    } else if (lang.length === 5) {
        return `${lang.substr(0, 2).toLowerCase()}_${lang.substr(3, 2).toUpperCase()}`;
    } else {
        return `${lang.substr(0, 2).toLowerCase()}_${lang.substr(0, 2).toUpperCase()}`;
    }
}

module.exports = function hyphenate_plugin(md) {
    const old_text_rule = md.renderer.rules.text;

    md.renderer.rules.text = function(tokens, idx, options, env, self) {

        // Do nothing if no language is passed in the render function
        if (!(env.language)) return old_text_rule(tokens, idx, options, env);

        var text = tokens[idx].content;

        var instance;

        try {
            instance = spawnSync(   cfg.executable,
                                    [ langLang(env.language) ],
                                    {
                                        input: text,
                                        timeout: cfg.timeout,
                                        maxBuffer: cfg.maxBuffer,
                                        encoding: cfg.encoding
                                    });
        } catch (err) {
            console.error("[markdown-it-hyphenate] Error running hyphenate:", err);
            return old_text_rule(tokens, idx, options, env);
        }

        // Stdout adds newlines regardless of input. We compare here and remove as needed.
        if (text.charAt(text.length - 1) != '\n' &&
            instance.stdout.charAt(instance.stdout.length - 1) === '\n') {
            tokens[idx].content = instance.stdout.slice(0, -1);
        } else {
            tokens[idx].content = instance.stdout;
        }

        return old_text_rule(tokens, idx, options, env);
    };
};
