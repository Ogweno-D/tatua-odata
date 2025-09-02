import {showToast} from "./utils/toast.js";

const proxy = "https://api.allorigins.win/raw?url=";
const baseUrl = "https://services.odata.org/TripPinRESTierService/People";

/**
 * Fetches data from OData People API with filtering, sorting, pagination.
 * @param {Object} queryParams - { filter, sort, page, pageSize }
 * @param {Array} columns - Column metadata for type-aware formatting.
 */
export async function fetchPeopleFromApi(queryParams, columns) {
    const { filter, sort, page, pageSize } = queryParams;

    let url = baseUrl + `?$count=true`;
    url += `&$top=${pageSize}`;
    url += `&$skip=${(page - 1) * pageSize}`;

    // ---------- Build $filter ----------
    if (filter && Object.keys(filter).length > 0) {
        const filterParts = [];

        for (const [field, { operator, value }] of Object.entries(filter)) {
            if (value === undefined || value === null || value === "") continue;

            let formattedValue = value;
            const column = columns.find(c => c.id === field);

            if (column) {
                if (column.enumValues) {
                    formattedValue = column.enumValues.includes(value) ? value : value;
                } else if (column.type === "number") {
                    formattedValue = Number(value);
                } else if (column.type === "boolean") {
                    formattedValue = value === true || value === "true";
                } else if (column.type === "date") {
                    formattedValue = `${value}`;
                    formattedValue = `cast(${field}, Edm.DateTimeOffset) eq ${formattedValue}`;
                } else {
                    formattedValue = `'${value}'`;
                }
            } else {
                formattedValue = `'${value}'`;
            }

            if (["contains", "startswith", "endswith"].includes(operator)) {
                filterParts.push(`${operator}(${field},${formattedValue})`);
            } else {
                filterParts.push(`${field} ${operator} ${formattedValue}`);
            }
        }

        if (filterParts.length > 0) {
            url += `&$filter=${encodeURIComponent(filterParts.join(" and "))}`;
        }
    }

    // ---------- Build $orderby ----------
    if (sort) {
        url += `&$orderby=${encodeURIComponent(sort)}`;
    }

    // console.log("Fetching:", url);
    const response = await fetch(proxy + encodeURIComponent(url));
    if (!response.ok) {
        showToast("Failed to retrieve data, try again later.", "error");
        throw new Error(`HTTP error ${response.status}`);
    }

    const json = await response.json();
    return {
        data: json.value,
        totalCount: json["@odata.count"]
    };
}
