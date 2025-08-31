import{fetchPeopleFromApi} from "./api.js";
import{TableColumn,ReusableTableFromApi} from "./table/table.js";

// TableConfig
const peopleTableConfig = {
    columns: [
        TableColumn({
            id: "UserName",
            caption: "Username",
            isFilterable: true,
            isSortable: true
        }),
        TableColumn({
            id: "FirstName",
            caption: "First Name",
            isFilterable: true,
            isSortable: true
        }),
        TableColumn({
            id: "LastName",
            caption: "Last Name",
            isFilterable: true,
            isSortable: true
        }),
        TableColumn({
            id: "MiddleName",
            caption: "Middle Name",
            isFilterable: true,
        }),
        TableColumn({
            id: "Gender",
            caption: "Gender",
            isFilterable: true,
            enumValues: ["Male", "Female", ]
        }),
        TableColumn({
            id: "Age",
            caption: "Age",
            isFilterable: true,
            isSortable: true
        })
    ]
};
const peopleTable = new ReusableTableFromApi(
    "peopleTable", fetchPeopleFromApi, peopleTableConfig);

