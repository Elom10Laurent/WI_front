export function getInitials(fullName: string | undefined) {
    if (!fullName) return '';
    const nameParts = fullName.split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
}