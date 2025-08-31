export function createFilterSection(tableInstance) {
    const filterContainer = document.createElement("div");
    filterContainer.classList.add("filter-container");

    const filtersList = document.createElement("div");
    filtersList.classList.add("filters-list");

    const addFilterBtn = document.createElement("button");
    addFilterBtn.textContent = "➕ Add Filter";

    function createFilterRow() {
        const row = document.createElement("div");
        row.classList.add("filter-row");

        // Column Select
        const columnSelect = document.createElement("select");
        columnSelect.innerHTML = `<option value="" disabled selected>Select Column</option>`;
        tableInstance.columns.filter(c => c.isFilterable).forEach(column => {
            const option = document.createElement("option");
            option.value = column.id;
            option.textContent = column.caption;
            columnSelect.appendChild(option);
        });

        // Operator Select
        const operatorSelect = document.createElement("select");
        operatorSelect.innerHTML = `
            <option value="" disabled selected>Relation</option>
            <option value="eq">Equals</option>
            <option value="ne">Not Equal</option>
            <option value="contains">Contains</option>
            <option value="startswith">Starts With</option>
            <option value="endswith">Ends With</option>
        `;

        let valueInput = document.createElement("input");
        valueInput.type = "text";
        valueInput.placeholder = "Enter value";

        columnSelect.addEventListener("change", () => {
            const selectedColumn = tableInstance.columns.find(c => c.id === columnSelect.value);
            if (!selectedColumn) return;

            if (selectedColumn.enumValues) {
                const valueSelect = document.createElement("select");
                valueSelect.innerHTML = `<option value="">Select Value</option>`;
                selectedColumn.enumValues.forEach(val => {
                    const option = document.createElement("option");
                    option.value = val;
                    option.textContent = val;
                    valueSelect.appendChild(option);
                });
                valueInput.replaceWith(valueSelect);
                valueInput = valueSelect;
            } else {
                const newInput = document.createElement("input");
                newInput.type = "text";
                newInput.placeholder = "Enter value";
                valueInput.replaceWith(newInput);
                valueInput = newInput;
            }
        });

        // Remove filter button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.addEventListener("click", () => row.remove());

        row.append(columnSelect, operatorSelect, valueInput, removeBtn);
        return row;
    }

    // Start with one filter row
    filtersList.appendChild(createFilterRow());
    addFilterBtn.addEventListener("click", () => filtersList.appendChild(createFilterRow()));

    // Apply filters
    const applyFilterBtn = document.createElement("button");
    applyFilterBtn.textContent = "Apply Filters";
    applyFilterBtn.addEventListener("click", () => {
        tableInstance.queryParams.filter = {}; // reset
        filtersList.querySelectorAll(".filter-row").forEach(row => {
            const [columnSelect, operatorSelect, valueInput] = row.querySelectorAll("select, input");
            if (columnSelect.value && operatorSelect.value && valueInput.value) {
                tableInstance.queryParams.filter[columnSelect.value] = {
                    operator: operatorSelect.value,
                    value: valueInput.value
                };
            }
        });
        tableInstance.queryParams.page = 1;
        tableInstance.loadData();
    });
    const resetFilterBtn = document.createElement("button");
    resetFilterBtn.textContent = "🧹 Reset Filters";
    resetFilterBtn.addEventListener("click", () => {
        tableInstance.queryParams.filter = {};
        filtersList.innerHTML = "";
        filtersList.appendChild(createFilterRow());
        tableInstance.queryParams.page = 1;
        tableInstance.loadData();
    });

    filterContainer.append(filtersList, addFilterBtn, applyFilterBtn);
    return filterContainer;
}
