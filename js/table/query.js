import{createSortSection} from "./sort.js";
import{createPaginationControls} from "./pagination.js";
import{createFilterSection} from "./filter.js";

export function renderTableControls(tableInstance) {
    if (!tableInstance.tableElement) return;

    const controlsContainer = document.createElement("div");
    controlsContainer.classList.add("table-controls");

    // Create sections with smaller helper functions
    const filterContainer = createFilterSection(tableInstance);
    const sortContainer = createSortSection(tableInstance);
    const paginationContainer = createPaginationControls(tableInstance);

    controlsContainer.append(filterContainer, sortContainer, paginationContainer);

    // Attach to DOM
    tableInstance.tableElement.parentNode.insertBefore(controlsContainer, tableInstance.tableElement);
}
