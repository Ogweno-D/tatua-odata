/**
 * Save table state to localStorage
 * @param {string} tableId
 * @param {object} state
 */
export function saveTableState(tableId, state) {
    try {
        localStorage.setItem(`tableState_${tableId}`, JSON.stringify(state));
    } catch (e) {
        console.warn("Failed to save table state:", e);
    }
}
/**
 * Load table state from localStorage
 * @param {string} tableId
 * @returns {object|null}
 */
export function loadTableState(tableId) {
    try {
        const state = localStorage.getItem(`tableState_${tableId}`);
        return state ? JSON.parse(state) : null;
    } catch (e) {
        console.warn("Failed to load table state:", e);
        return null;
    }
}
/**
 * Reset table state in localStorage
 * @param {string} tableId
 */
export function resetTableState(tableId) {
    localStorage.removeItem(`tableState_${tableId}`);
}
