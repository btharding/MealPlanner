export default {
    generateUniqueId(existingArray) {
        while (true) {
            let candidateId = Math.random().toString(16).slice(2);
            if (!existingArray.filter(item => item.id == candidateId).length) {
                return candidateId;
            }
        }
    },
    cleanText(text) {
        return text.trim().replace(/\n/, '');
    },
    toUpperCamelCase(text) {
        return this.cleanText(text).split(' ').map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
    },
    normaliseText(text) {
        return this.cleanText(text).toLowerCase().replace(/\s/, '_');
    }
}