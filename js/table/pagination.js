import {saveTableState} from "../utils/state.js";

export function createPaginationControls(tableInstance) {
    const pagination = document.createElement("div");

    tableInstance.switcher = document.createElement("div");
    tableInstance.switcher.className ="pagination-switcher";

    tableInstance.paginationButton = document.createElement("div");
    tableInstance.paginationButton.className ="pagination-button";



    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";

    const pageInfo = document.createElement("span");

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";


    //Page size Switcher
    const pageSizeSelector = document.createElement("select");
    [5,10,20,50,100].forEach(size => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = `${size} records per page`;

        if(tableInstance.queryParams.pageSize === size){
            option.selected = true;
        }
        pageSizeSelector.appendChild(option);
    })

    pageSizeSelector.addEventListener("change", (e) => {
        tableInstance.queryParams.pageSize = parseInt(pageSizeSelector.value);
        tableInstance.queryParams.page = 1;
        saveTableState(tableInstance.tableId, tableInstance.queryParams);
        tableInstance.reloadTable();
    })

    tableInstance.switcher.appendChild(pageSizeSelector);

    // Pagination controls
    prevBtn.addEventListener("click", () => {
        if (tableInstance.queryParams.page > 1) {
            tableInstance.queryParams.page--;
            tableInstance.reloadTable();
        }
    });

    nextBtn.addEventListener("click", () => {
        const maxPage = Math.ceil(tableInstance.totalCount / tableInstance.queryParams.pageSize);
        if (tableInstance.queryParams.page < maxPage) {
            tableInstance.queryParams.page++;
            tableInstance.reloadTable();
        }
    });

    tableInstance.paginationButton.append(prevBtn,pageInfo,nextBtn);

    pagination.append(tableInstance.switcher,tableInstance.paginationButton);

    // Attach to instance for later updates
    tableInstance.pageInfo = pageInfo;
    tableInstance.prevBtn = prevBtn;
    tableInstance.nextBtn = nextBtn;
    tableInstance.pageSizeSelector = pageSizeSelector;
    tableInstance.tableElement.parentNode.appendChild(pagination);

    return pagination;
}

export function updatePaginationControls(tableInstance) {
    const maxPage = Math.ceil(tableInstance.totalCount / tableInstance.queryParams.pageSize);

    if (tableInstance.pageInfo) {
        tableInstance.pageInfo.textContent = `Page ${tableInstance.queryParams.page} of ${maxPage}`;
    }

    if (tableInstance.prevBtn) {
        tableInstance.prevBtn.disabled = tableInstance.queryParams.page === 1;
        tableInstance.prevBtn.classList.toggle("disabled", tableInstance.queryParams.page === 1);
    }

    if (tableInstance.nextBtn) {
        tableInstance.nextBtn.disabled = tableInstance.queryParams.page >= maxPage;
        tableInstance.nextBtn.classList.toggle("disabled", tableInstance.queryParams.page >= maxPage);
    }
}
