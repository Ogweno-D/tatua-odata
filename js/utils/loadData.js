/**
 * Generic loader for ReusableTable
 * @param {object} queryParams - filters, sorting, paging
 * @param {Array|Function} dataSource - array (client-side) or async fetch function (server-side)
 * @param {Array} columns - table columns
 * @param {object} tableInstance - table instance (needed for spinner positioning)
 * @returns {Promise<{ data: Array, totalCount: number }>}
 */
export async function loadData(queryParams, dataSource, columns, tableInstance) {
    // Create and attach spinner overlay
    let overlay;
    let parent;

    if (tableInstance && tableInstance.tableElement) {
        overlay = document.createElement("div");
        overlay.classList.add("table-loader-overlay");

        const spinner = document.createElement("div");
        spinner.classList.add("table-loader-spinner");
        overlay.appendChild(spinner);

        parent = tableInstance.tableElement.parentNode;
        if (parent) {
            parent.style.position = "relative"; // Make sure spinner positions correctly
            parent.appendChild(overlay);
        }
    }

    try {
        let data = [];
        let totalCount = 0;

        if (typeof dataSource === "function") {
            // Server-side data fetch
            ({ data, totalCount } = await dataSource(queryParams, columns));
        } else if (Array.isArray(dataSource)) {
            //  Client-side mode
            let result = [...dataSource];

            // Filtering
            if (queryParams.filter && Object.keys(queryParams.filter).length > 0) {
                result = result.filter(row => {
                    return Object.entries(queryParams.filter).every(([field, { operator, value }]) => {
                        const cellValue = String(row[field] ?? "").toLowerCase();
                        const compareValue = String(value ?? "").toLowerCase();

                        switch (operator) {
                            case "eq": return cellValue === compareValue;
                            case "ne": return cellValue !== compareValue;
                            case "contains": return cellValue.includes(compareValue);
                            case "startswith": return cellValue.startsWith(compareValue);
                            case "endswith": return cellValue.endsWith(compareValue);
                            default: return true;
                        }
                    });
                });
            }

            //  Sorting
            if (queryParams.sort) {
                const sortParts = queryParams.sort.split(",").map(s => s.trim());
                result.sort((a, b) => {
                    for (const part of sortParts) {
                        const [field, direction] = part.split(" ");
                        const aVal = a[field] ?? "";
                        const bVal = b[field] ?? "";

                        if (aVal < bVal) return direction === "asc" ? -1 : 1;
                        if (aVal > bVal) return direction === "asc" ? 1 : -1;
                    }
                    return 0;
                });
            }

            totalCount = result.length;

            //  Pagination
            const start = (queryParams.page - 1) * queryParams.pageSize;
            data = result.slice(start, start + queryParams.pageSize);
        } else {
            throw new Error("Invalid dataSource: must be a function or array");
        }

        return { data, totalCount };
    } finally {
        //  Always remove spinner overlay
        if (parent && overlay && parent.contains(overlay)) {
            parent.removeChild(overlay);
        }
    }
}
