export function createSortSection(tableInstance) {
    const sortContainer = document.createElement("div");
    sortContainer.classList.add("sort-container");

    const sortsList = document.createElement("div");
    sortsList.classList.add("sorts-list");

    function createSortRow() {
        const row = document.createElement("div");
        row.classList.add("sort-row");

        const columnSelect = document.createElement("select");
        columnSelect.innerHTML = `<option value="">Select Column</option>`;
        tableInstance.columns.filter(c => c.isSortable).forEach(column => {
            const option = document.createElement("option");
            option.value = column.id;
            option.textContent = column.caption;
            columnSelect.appendChild(option);
        });

        const directionSelect = document.createElement("select");
        directionSelect.innerHTML = `
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        `;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.addEventListener("click", () => row.remove());

        row.append(columnSelect, directionSelect, removeBtn);
        return row;
    }

    // Start with one sort row
    sortsList.appendChild(createSortRow());

    const addSortBtn = document.createElement("button");
    addSortBtn.textContent = "➕ Add Sort";
    addSortBtn.addEventListener("click", () => sortsList.appendChild(createSortRow()));

    const applySortBtn = document.createElement("button");
    applySortBtn.textContent = "Apply Sorts";
    applySortBtn.addEventListener("click", () => {
        const sortParts = [];
        sortsList.querySelectorAll(".sort-row").forEach(row => {
            const [colSelect, dirSelect] = row.querySelectorAll("select");
            if (colSelect.value) sortParts.push(`${colSelect.value} ${dirSelect.value}`);
        });

        tableInstance.queryParams.sort = sortParts.join(",");
        tableInstance.queryParams.page = 1;
        tableInstance.loadData();
    });
    const resetSortBtn = document.createElement("button");
    resetSortBtn.textContent = "🧹 Reset Sort";
    resetSortBtn.addEventListener("click", () => {
        tableInstance.queryParams.sort = null;
        sortColumnSelect.value = "";
        sortDirectionSelect.value = "asc";
        tableInstance.queryParams.page = 1;
        tableInstance.loadData();
    });

    sortContainer.append(sortsList, addSortBtn, applySortBtn);
    return sortContainer;
}
