export function keys() {
    const titlebox = document.getElementById('title')!;
    const textbox = document.getElementById('text')!;
    const navbar = document.getElementById('navbar')!;
    const button = document.getElementById('buttons')!;
    const tabs = document.getElementById('tabs')!;
    const help_btn = document.getElementById('help-btn')!;
    document.addEventListener('keydown', e => {
        if (e.altKey) {
            switch (e.keyCode) {
            case 49: {
                location.href = '?session-id=1&tab=1';
            } break;
            case 50: {
                location.href = '?session-id=1&tab=2';
            } break;
            case 51: {
                location.href = '?session-id=1&tab=3';
            } break;
            case 52: {
                location.href = '?session-id=1&tab=4';
            } break;
            case 53: {
                location.href = '?session-id=1&tab=5';
            } break;
            case 54: {
                location.href = '?session-id=1&tab=6';
            } break;
            case 55: {
                location.href = '?session-id=1&tab=7';
            } break;
            case 56: {
                location.href = '?session-id=1&tab=8';
            } break;
            case 57: {
                location.href = '?session-id=1&tab=9';
            } break;
            }
        }
        if (e.keyCode == 122) {
            e.preventDefault();
            if (tabs.style.display != 'none') {
                navbar.style.display = 'none';
                button.style.display = 'none';
                help_btn.style.display = 'none';
                tabs.style.display = 'none';
                titlebox.style.height = '165px';
                textbox.style.height = '700px';
            }
            else {
                navbar.style.display = 'block';
                button.style.display = 'block';
                help_btn.style.display = 'block';
                tabs.style.display = 'block';
                titlebox.style.height = '25px';
                textbox.style.height = '500px';
            }
        }
    });
    titlebox.addEventListener('keydown', e => {
        if (e.keyCode == 9 || e.keyCode == 13 || e.keyCode == 38 && (titlebox!.value as string).length == 0 || e.keyCode == 39 && (titlebox!.value as string).length == 0 || e.keyCode == 40 && (titlebox!.value as string).length == 0) {
            e.preventDefault();
            textbox.focus();
        }
    });
    textbox.addEventListener('keydown', e => {
        if (e.keyCode == 8 && (textbox!.value as string).length == 0 || e.keyCode == 9 || e.keyCode == 37 && (textbox!.value as string).length == 0 || e.keyCode == 38 && (textbox!.value as string).length == 0 || e.keyCode == 40 && (textbox!.value as string).length == 0) {
            e.preventDefault();
            titlebox.focus();
        }
    });
}