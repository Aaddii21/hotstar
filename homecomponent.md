
# **Home Component**

The `Home` component is a React functional component designed to manage and display rules in a tabular format. It leverages a reusable `NewTable` component to provide filtering, sorting, bulk actions, and rule toggling capabilities. This documentation explains how the component works, its key features, and how to use or extend it.

---

## **Overview**
The `Home` component serves as the main interface for managing rules in the system. It integrates with the `NewTable` component to display rule data in a structured table, allowing users to:
- Search, filter, and sort rules.
- Perform bulk actions (enable/disable) on multiple rules.
- Toggle individual rule statuses.
- Navigate to detailed views of individual rules.

---

## **Key Features**
1. **Rule Management**:
   - Enable or disable individual rules using a toggle switch.
   - Perform bulk actions (enable/disable) on selected rules.

2. **Table Configuration**:
   - Filters: Search bar, category dropdown, last response status, tabs for rule types/statuses, date picker, and export options.
   - Rows: Displays rule details such as name, type, category, severity, last response, and enabled/disabled status.
   - Actions: Provides an "Edit" action for navigating to a rule's details page.

3. **Bulk Update Status**:
   - Displays the result of bulk update operations using the `RuleUpdateStatus` component.

4. **Dynamic Data Handling**:
   - Fetches data from the backend (`/get-rule-list`) and dynamically formats it for display.
   - Supports server-side pagination and refreshes the table after updates.

---

## **Code Structure**

### **Imports**
The component imports several dependencies and utilities:
- **React Hooks**: `useCallback`, `useMemo`, and `useState` are used for state management and performance optimization.
- **Custom Components**:
  - `NewTable`: Renders the table with filters, rows, and actions.
  - `RuleUpdateStatus`: Displays bulk update responses.
  - `ToggleSwitch`: Toggles rule statuses (enabled/disabled).
  - `Tooltip`: Shows additional information (e.g., tags) on hover.
- **Context**: `useRules` provides methods for editing and updating rules.
- **Utilities**: Includes constants, icons, and helper functions.

---

## **Component Breakdown**

### **1. State Management**
The component uses `useState` to manage various states:
- **`showBulkUpdateResponse`**: Tracks the response of bulk update operations.
- **`showTag`**: Controls the visibility of tag tooltips.
- **`refreshTable`**: Triggers a refresh of the table data when rules are updated.

```javascript
const [showBulkUpdateResponse, setShowBulkUpdateResponse] = useState(null);
const [showTag, setShowTag] = useState(false);
const [refreshTable, setRefreshTable] = useState(false);
```

### **2. Bulk Actions**
The `handleBulkAction` function handles bulk actions (enable/disable):
- Validates selected rows and action type.
- Calls the `handleBulkRuleStatusUpdate` method from the `RulesContext` to update the status of selected rules.
- Refreshes the table upon success or failure.

```javascript
const handleBulkAction = ({ action, refreshTable, selectedRow }) => {
    if (!selectedRow.length || !action) return;
    const newStatus = action.toLowerCase() === "enable" ? "Enabled" : "Disabled";
    try {
        handleBulkRuleStatusUpdate(
            { status: newStatus, sids: selectedRow },
            (data) => {
                setShowBulkUpdateResponse(data);
                refreshTable();
            },
            () => {
                refreshTable();
            }
        );
    } catch (error) {
        refreshTable();
    }
};
```

### **3. Toggle Rule Status**
The `toggleRule` function enables or disables individual rules:
- Accepts the rule ID and desired action (`Enabled` or `Disabled`).
- Calls the `handleEditRules` method from the `RulesContext`.
- Refreshes the table after the operation.

```javascript
const toggleRule = async ({ action, refreshTable, id }) => {
    try {
        if (!id || !action) return;
        await handleEditRules(
            id,
            { status: action },
            () => refreshTable(),
            () => refreshTable()
        );
    } catch (error) {
        console.error("Error toggling rule status:", error);
    }
};
```

### **4. Table Configuration**
The `formatTableData` function prepares the configuration for the `NewTable` component:
- **Filters**: Includes search, category dropdown, last response status, tabs, date picker, bulk actions, and export options.
- **Rows**: Maps rule data into a structured format for display.
- **Actions**: Provides an "Edit" action for navigating to a rule's details page.

```javascript
const formatTableData = useCallback((data) => {
    return {
        title: "Rule Table",
        url: `${constants.RULES.BASE_ROUTE}/get-rule-list`,
        filters: {
            // Define filters here
        },
        rows: data?.data.map((item) => ({
            ID: { key: "sid", value: item.sid, type: "hidden" },
            Rule: {
                key: "rule",
                value: (
                    <div>
                        {/* Rule name and tags */}
                    </div>
                ),
            },
            // Other columns...
        })),
        actions: [
            {
                icon: ICON.EDIT,
                label: "Edit",
                onClick: (rule) => navigate(`/new-rules-management/${rule?.["Rule Type"]?.value}/${rule?.["ID"]?.value}`),
            },
        ],
        totalPages: data?.pagination?.total_pages,
        totalDocuments: data?.pagination?.total_documents,
    };
}, [refreshTable]);
```

---

## **Usage**

### **1. Integration**
To use the `Home` component:
- Import and include it in your application's routing structure.
- Ensure the `RulesContext` is properly set up and provides the `handleEditRules` and `handleBulkRuleStatusUpdate` methods.

```javascript
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/rules" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
```

### **2. Customization**
- Modify the `formatTableData` function to add or remove filters, columns, or actions.
- Extend the `handleBulkAction` and `toggleRule` functions to include additional logic (e.g., logging errors).

### **3. Navigation**
Ensure that the routes (e.g., `/new-rules-management/details/:id`) are correctly defined in your application.

---

## **Dependencies**
- **React**: Version 18 or higher.
- **React Router**: For navigation.
- **Custom Components**: `NewTable`, `RuleUpdateStatus`, `ToggleSwitch`, `Tooltip`.
- **Context**: `RulesContext` must provide the necessary methods.

---

## **Tips for Developers**
- Use `console.log` to debug the `formatTableData` function and understand how data is structured.
- Add error handling for API calls to improve user experience.
- Explore the commented-out features (e.g., accordion rows) to enhance the table's functionality.

