const tokenKey = 'token';
const emailKey='email';
const adminKey='isAdmin';
const businessKey='isBusiness';

export function setToken(tokenValue?: string) {
    if (!tokenValue) return;
    localStorage.setItem(tokenKey, tokenValue);
}
export function getToken(): string {
    return localStorage.getItem(tokenKey) || '';
}
export function removeToken() {
    localStorage.removeItem(tokenKey);
}
export function setUserEmail(emailValue?: string) {
    if (!emailValue) return;
    localStorage.setItem(emailKey, emailValue);
}
export function getUserEmail(): string {
    return localStorage.getItem(emailKey) || '';
}
export function removeEmail() {
    localStorage.removeItem(emailKey);
}
export function verifyToken(): boolean {
    return getToken().length > 0;
}
export function getAdmin(): string {
    return localStorage.getItem(adminKey) || '';
}
export function setAdmin(adminValue?: string) {
    if (!adminValue) return;
        localStorage.setItem(adminKey, adminValue);
}
export function removeAdmin() {
    localStorage.removeItem(adminKey);
}
export function isAdmin(): boolean {
    return getAdmin()==="yes";
}
export function getBusiness(): string {
    return localStorage.getItem(businessKey) || '';
}
export function setBusiness(businessValue?: string) {
    if (!businessValue) return;
        localStorage.setItem(businessKey, businessValue);
}
export function removeBusiness() {
    localStorage.removeItem(businessKey);
}
export function isBusiness(): boolean {
    return getBusiness()==="yes";
}
