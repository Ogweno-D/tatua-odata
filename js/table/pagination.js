export function createPaginationControls(tableInstance) {
    const pagination = document.createElement("div");

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";

    const pageInfo = document.createElement("span");

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";

    prevBtn.addEventListener("click", () => {
        if (tableInstance.queryParams.page > 1) {
            tableInstance.queryParams.page--;
            tableInstance.loadData();
        }
    });

    nextBtn.addEventListener("click", () => {
        const maxPage = Math.ceil(tableInstance.totalCount / tableInstance.queryParams.pageSize);
        if (tableInstance.queryParams.page < maxPage) {
            tableInstance.queryParams.page++;
            tableInstance.loadData();
        }
    });

    pagination.append(prevBtn, pageInfo, nextBtn);

    // Attach to instance for later updates
    tableInstance.pageInfo = pageInfo;
    tableInstance.prevBtn = prevBtn;
    tableInstance.nextBtn = nextBtn;

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
