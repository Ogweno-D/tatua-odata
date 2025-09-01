import{createSortSection} from "./sort.js";
import {createPaginationControls, updatePaginationControls} from "./pagination.js";
import{createFilterSection} from "./filter.js";

export function renderTableControls(tableInstance) {
    if (!tableInstance.tableElement) return;

    const controlsContainer = document.createElement("div");
    controlsContainer.classList.add("table-toolbar");


    // Create sections with smaller helper functions
    const filterBtn = document.createElement("button");
    filterBtn.classList.add("toolbar-btn","filter-btn");
    filterBtn.innerHTML = `<i class="fa-solid fa-filter"></i> Filters`

    const filterModal = createFilterSection(tableInstance);

    filterBtn.addEventListener("click", () => {
        filterModal.style.display = "flex";
    });

    const sortBtn = document.createElement("button");
    sortBtn.classList.add("toolbar-btn","sort-btn");
    sortBtn.innerHTML = `<i class="fa-solid fa-arrow-down-a-z"></i> Sort By`

    const sortModal = createSortSection(tableInstance);
    sortBtn.addEventListener("click", () => {
        sortModal.style.display = "flex";
    })

    // const filterContainer = createFilterSection(tableInstance);
    // const sortContainer = createSortSection(tableInstance);
    const paginationContainer = createPaginationControls(tableInstance);
    controlsContainer.append(filterBtn , sortBtn, paginationContainer);

    // Attach to DOM
    tableInstance.tableElement.parentNode.insertBefore(controlsContainer, tableInstance.tableElement);

    updatePaginationControls(tableInstance);

}
