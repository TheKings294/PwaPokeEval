export async function requestPermission() {
    const permission = await Notification.requestPermission();
    return permission === "granted";
}