import { storage } from "@vendetta/plugin";

const endTextOptions: string[] = ["owo", "uwu", "nyaa", ">w<", "^_^"];

function uwuify(text: string): string {
    function replacePattern(match: string, char: string, nextChar?: string): string {
        if (char.match(/[aeiouAEIOU]/) && nextChar) {
            return `${char}w${nextChar}`;
        } else if (match.toLowerCase() === 'th') {
            return match === 'th' ? 'd' : 'D';
        }
        return match;
    }

    function appendRandomString(match: string): string {
        const randomString = endTextOptions[Math.floor(Math.random() * endTextOptions.length)];
        return match + ' ' + randomString;
    }

    text = text.replace(/([aeiou])t/gi, (match, p1) => replacePattern(match, p1));
    text = text.replace(/(th)/gi, (match) => replacePattern(match));
    text = text.replace(/ove/g, 'uv');
    text = text.replace(/OVE/g, 'UV');
    text = text.replace(/[rl]/g, 'w');
    text = text.replace(/[RL]/g, 'W');
    text = text.replace(/[U]/g, 'U-U');
    text = text.replace(/[u]/g, 'u-u');
    text = text.replace(/((?<!\.)\.(?!\.)|[!?](?=\s|$|[^\s!?]))/g, appendRandomString);
    text = text.replace(/n([aeiou])/g, 'ny$1');
    text = text.replace(/N([aeiou])/g, 'Ny$1');
    text = text.replace(/N([AEIOU])/g, 'NY$1');

    if (text.length > 0 && /^[a-zA-Z]/.test(text[0])) {
        text = text[0] + '-' + text.slice(1);
    }

    if (text.length > 0 && /[a-zA-Z]$/.test(text)) {
        const randomString = endTextOptions[Math.floor(Math.random() * endTextOptions.length)];
        text += '~~ ' + randomString;
    }

    return text;
}

export default {
    onLoad: () => {
        vendetta.commands.registerCommand({
            name: "uwuify",
            displayName: "uwuify",
            description: "Uwuify a given text",
            options: [{
                name: "text",
                description: "Text to uwuify",
                required: true,
                type: 3 // Assuming type 3 corresponds to a string
            }],
            execute: (args: { name: string; value: string }[], ctx: { channel: { id: string } }) => {
                const inputText = args.find(arg => arg.name === "text")?.value || '';
                const uwuifiedText = uwuify(inputText);
                
                vendetta.messages.sendMessage(ctx.channel.id, {
                    content: uwuifiedText
                });

                return {
                    content: `UwUified: ${uwuifiedText}`,
                    type: 1
                };
            }
        });
    },

    onUnload: () => {
        vendetta.commands.unregisterCommand("uwuify");
    }
};
