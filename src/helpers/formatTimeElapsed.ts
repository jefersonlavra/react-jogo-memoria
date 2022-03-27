export const formatTimeElapsed = (seconds: number): string => {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds - (minutes * 60);
    let minStr = `${minutes < 10 ? '0'+minutes: minutes}`;
    let secStr = `${seconds < 10 ? '0'+seconds: seconds}`;
    return `${minStr}:${secStr}`;
}