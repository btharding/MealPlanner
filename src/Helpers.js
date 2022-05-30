export default {
    generateUniqueId(existingArray) {
        while (true) {
            let candidateId = Math.random().toString(16).slice(2);
            if (!existingArray.filter(item => item.id == candidateId).length) {
                return candidateId;
            }
        }
    }
}