/* ===========================
   TERMINAL EASTER EGG
   =========================== */
const TerminalEasterEgg = (function () {
    let overlay = null;
    let outputEl = null;
    let inputEl = null;
    let isOpen = false;
    let commandHistory = [];
    let historyIndex = -1;

    const COMMANDS = {
        help: {
            desc: 'Show all available commands',
            run: () => [
                '╔══════════════════════════════════════╗',
                '║       TWENTYEGG TERMINAL v1.0        ║',
                '╠══════════════════════════════════════╣',
                '║  help          Show this help menu   ║',
                '║  whoami        About TwentyEgg       ║',
                '║  ls projects   List all projects     ║',
                '║  theme dark    Switch to dark mode    ║',
                '║  theme light   Switch to light mode   ║',
                '║  clear         Clear terminal         ║',
                '║  exit          Close terminal         ║',
                '╚══════════════════════════════════════╝'
            ]
        },
        whoami: {
            desc: 'Display user info',
            run: () => [
                '',
                '  ╔═══════════════════════════════════╗',
                '  ║  USER: Damar Rifaldi Mutakin      ║',
                '  ║  ALIAS: TwentyEgg                 ║',
                '  ║  STATUS: Informatics Student      ║',
                '  ║  @ Institut Teknologi Sumatera     ║',
                '  ║  TAGLINE: Building websites and   ║',
                '  ║  games, leveling up every day.     ║',
                '  ╚═══════════════════════════════════╝',
                ''
            ]
        },
        clear: {
            desc: 'Clear terminal output',
            run: () => null // handled specially
        },
        exit: {
            desc: 'Close the terminal',
            run: () => null // handled specially
        }
    };

    function buildOverlay() {
        overlay = document.createElement('div');
        overlay.id = 'terminal-overlay';
        overlay.className = 'terminal-overlay';
        overlay.innerHTML = `
            <div class="terminal-panel pixel-panel">
                <div class="terminal-header">
                    <span class="terminal-title"><i class="fa-solid fa-terminal"></i> TWENTYEGG_TERMINAL.exe</span>
                    <button class="pixel-btn terminal-close-btn" id="terminal-close-btn" aria-label="Close terminal">[X]</button>
                </div>
                <div class="terminal-output" id="terminal-output">
                    <p class="term-welcome">TWENTYEGG OS v1.0 — Type <span class="highlight">"help"</span> for commands.</p>
                    <p class="term-welcome">Press <span class="highlight">ESC</span> or type <span class="highlight">"exit"</span> to close.</p>
                    <p class="term-welcome">────────────────────────────────────</p>
                </div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">C:\\TWENTYEGG&gt;&nbsp;</span>
                    <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" autofocus>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        outputEl = document.getElementById('terminal-output');
        inputEl = document.getElementById('terminal-input');

        // Close button
        document.getElementById('terminal-close-btn').addEventListener('click', close);

        // Backdrop click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });

        // Input handler
        inputEl.addEventListener('keydown', handleInput);
    }

    function handleInput(e) {
        if (e.key === 'Enter') {
            const raw = inputEl.value.trim();
            inputEl.value = '';

            if (raw) {
                commandHistory.push(raw);
                historyIndex = commandHistory.length;
            }

            // Echo command
            appendLine(`C:\\TWENTYEGG> ${raw}`, 'term-echo');

            processCommand(raw.toLowerCase());
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                inputEl.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                inputEl.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                inputEl.value = '';
            }
        } else if (e.key === 'Escape') {
            close();
        }
    }

    function processCommand(cmd) {
        // ls projects
        if (cmd === 'ls projects') {
            const lines = ['', '  DIRECTORY: C:\\PROJECTS\\', '  ─────────────────────────────', ''];
            if (typeof PROJECTS_DATA !== 'undefined') {
                PROJECTS_DATA.forEach(p => {
                    const status = p.wip ? '[WIP]' : '[OK] ';
                    lines.push(`  ${status}  ${p.name}`);
                    lines.push(`          ${p.desc}`);
                    lines.push(`          Tags: ${p.tags.join(', ')}`);
                    lines.push('');
                });
            }
            lines.push(`  Total: ${typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA.length : 0} file(s)`);
            typewriterOutput(lines);
            return;
        }

        // theme dark / theme light
        if (cmd.startsWith('theme ')) {
            const mode = cmd.split(' ')[1];
            if (mode === 'dark' || mode === 'light') {
                if (typeof ThemeManager !== 'undefined') {
                    ThemeManager.setTheme(mode);
                }
                typewriterOutput([`> Theme switched to ${mode.toUpperCase()} mode.`]);
            } else {
                typewriterOutput(['> ERROR: Invalid theme. Use "theme dark" or "theme light".']);
            }
            return;
        }

        // clear
        if (cmd === 'clear') {
            outputEl.innerHTML = '';
            return;
        }

        // exit
        if (cmd === 'exit') {
            close();
            return;
        }

        // Known command
        if (COMMANDS[cmd]) {
            const result = COMMANDS[cmd].run();
            if (result) typewriterOutput(result);
            return;
        }

        // Unknown
        if (cmd) {
            typewriterOutput([`> '${cmd}' is not recognized as a command.`, '> Type "help" for available commands.']);
        }
    }

    function typewriterOutput(lines) {
        let i = 0;
        function nextLine() {
            if (i >= lines.length) return;
            appendLine(lines[i], 'term-output-line');
            i++;
            setTimeout(nextLine, 35);
        }
        nextLine();
    }

    function appendLine(text, className) {
        const line = document.createElement('p');
        line.className = className || '';
        line.textContent = text;
        outputEl.appendChild(line);
        outputEl.scrollTop = outputEl.scrollHeight;
    }

    function open() {
        if (!overlay) buildOverlay();
        overlay.hidden = false;
        isOpen = true;
        document.body.style.overflow = 'hidden';
        setTimeout(() => inputEl.focus(), 50);
    }

    function close() {
        if (overlay) overlay.hidden = true;
        isOpen = false;
        document.body.style.overflow = '';
    }

    function init() {
        document.addEventListener('keydown', (e) => {
            // Backtick key opens terminal
            if (e.key === '`' && !isOpen) {
                // Don't trigger if typing in an input
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                e.preventDefault();
                open();
            }
        });
    }

    return { init };
})();
