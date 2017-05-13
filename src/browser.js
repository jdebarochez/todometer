export const loadBrowser = () => {
    const documentTouchSupport = window.DocumentTouch && document instanceof 'DocumentTouch';
    const ontouchstartSupport = 'ontouchstart' in window;

    return {
        touch: ontouchstartSupport || !!documentTouchSupport
    }
}