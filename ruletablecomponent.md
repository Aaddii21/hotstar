# Rules Table Component

## Overview
The Rules Table is a sophisticated React component built on top of a generic `NewTable` component, customized specifically for displaying and managing security rules in a SOC environment. It provides rich functionality including filtering, sorting, bulk actions, and detailed rule visualization.

## Component Structure

### Props
The table is configured via a comprehensive `tableConfig` object with the following structure:

| Prop | Type | Description | Example |
|------|------|-------------|---------|
| `title` | string | Table title | "Rule Table" |
| `url` | string | API endpoint for data | "/rules/get-rule-list" |
| `filters` | object | Filter configuration (see below) | - |
| `rows` | array | Formatted row data | - |
| `actions` | array | Row action buttons | Edit button |
| `hasCheckbox` | bool | Enable row selection | true |
| `refreshTable` | bool | Refresh trigger | - |
| `totalPages` | number | Pagination control | 10 |
| `totalDocuments` | number | Total items count | 100 |

## Filter Configuration
The table features a two-row filter system:

### Row 1 Filters
| Filter | Type | Features | Options |
|--------|------|----------|---------|
| Search | text | Full-text search | - |
| Category | multi-select | Dynamic options from API | Security categories |
| Last Response | multi-select | Status indicators | Succeeded, Warning, Failed |
| Rule Type | tabs | Count indicators | All, NIDS, HIDS |
| Status | tabs | Count indicators | All, Enabled, Disabled |

### Row 2 Filters
| Filter | Type | Features |
|--------|------|----------|
| Date Range | date picker | Start/End date selection |
| Bulk Actions | dropdown | Enable/Disable selected |
| Export | button | Data export |

## Column Specifications

| Column | Key | Features | Custom Rendering |
|--------|-----|----------|------------------|
| ID | sid | Hidden | - |
| Rule | message | Clickable link, Tags | Name + tag count with tooltip |
| Rule Type | type | Basic text | - |
| Category | file_name | Basic text | - |
| Severity | severity | Color-coded indicator | Dot + text |
| Last Response | lastResponse | Status indicator | Dot + text |
| Last Update | lastUpdated | Basic text | - |
| Enabled | status | Interactive toggle | ToggleSwitch component |

## Interactive Elements

### Rule Name
- Clickable link navigates to rule details
- Displays truncated message with hover title
- Shows tag count with interactive tooltip

### Tags Display
```jsx
<span onClick={toggleTagTooltip}>
  {RuleTableIcons.TAGS} {item.tags?.length}
</span>
{showTooltip && (
  <Tooltip content={
    item.tags.map(tag => <span key={tag}>{tag}</span>)
  }/>
)}
```

### Status Toggle
```jsx
<ToggleSwitch
  enabled={item.status === "Enabled"}
  onChange={toggleRuleStatus}
/>
```

## Bulk Operations

### Supported Actions
1. **Enable Selected**: Activate multiple rules
2. **Disable Selected**: Deactivate multiple rules

### Implementation
```jsx
handleBulkAction({
  action: "Enable", // or "Disable"
  selectedRow: [1, 2, 3], // Array of rule IDs
  refreshTable: refreshCallback
});
```

## Data Formatting

### Example Row Data
```js
{
  ID: { key: "sid", value: 123 },
  Rule: {
    value: <InteractiveRuleNameComponent />,
    key: "rule" 
  },
  "Rule Type": { value: "NIDS", key: "type" },
  // ...other columns
}
```

## Custom Rendering Examples

### Severity Indicator
```jsx
<div className="flex items-center">
  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
    severity === "Major" ? "bg-orange-400" : 
    severity === "Minor" ? "bg-yellow-400" : "bg-green-400"
  }`}/>
  <span>{severity}</span>
</div>
```

### Last Response Status
```jsx
<div className="flex items-center">
  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
    response === "Warning" ? "bg-yellow-400" : "bg-gray-400"
  }`/>
  <span>{response}</span>
</div>
```

## Usage Example

```jsx
const tableConfig = {
  title: "Security Rules",
  url: "/api/rules",
  filters: {
    row1: [...],
    row2: [...]
  },
  rows: formattedData,
  actions: [{
    icon: EditIcon,
    label: "Edit",
    onClick: (rule) => navigateToEdit(rule.id)
  }]
};

<NewTable tableConfig={tableConfig} />
```

## Responsive Design
The table includes responsive behaviors:
- Truncated rule names with ellipsis
- Mobile-optimized filter layouts
- Adaptive column sizing

## Accessibility Features
- Keyboard navigable
- ARIA labels for interactive elements
- Color contrast compliant status indicators
- Screen reader friendly toggle switches
