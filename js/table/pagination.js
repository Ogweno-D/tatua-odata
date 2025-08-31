export function createPaginationControls(tableInstance) {
    const pagination = document.createElement("div");
    pagination.classList.add("pagination-controls");

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
