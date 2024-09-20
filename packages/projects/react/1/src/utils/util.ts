export const watchIsAutoPlay = (el: HTMLAudioElement) => {
    if (!(el instanceof HTMLAudioElement)) {
        throw new Error('el must be a HTMLAudioElement');
    }
    const src = el.getAttribute('src');
    if (!src) {
        return Promise.resolve(false);
    }
    return new Promise<boolean>((resolve) => {
        const a = new Audio();
        a.autoplay = true;
        a.muted = true;
        a.addEventListener('play', () => resolve(true))
        a.src = src;
        resolve(false);
    });
}

export const randomRange = (under: number, over: number) => Math.ceil(Math.random() * (over - under) + under);