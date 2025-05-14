# Rules Table Component

## Overview
The **Rules Table** is a sophisticated React component built on top of a generic `NewTable` base, specifically designed for managing security rules in a SOC (Security Operations Center) environment. It provides a rich set of features including advanced filtering, sorting, bulk actions, interactive rule visualization, and responsive design.

---

## 🧱 Component Structure

### Main Props (`tableConfig` Object)

| Prop             | Type     | Description                            | Example              |
|------------------|----------|----------------------------------------|----------------------|
| `title`          | string   | Title displayed at the top of the table | `"Security Rules"`   |
| `url`            | string   | API endpoint to fetch data from         | `"/api/rules"`       |
| `filters`        | object   | Configuration for filters (see below)  | -                    |
| `rows`           | array    | Array of formatted row data            | -                    |
| `actions`        | array    | Row-level action buttons               | Edit/Delete buttons  |
| `hasCheckbox`    | boolean  | Enable/disable row selection checkbox    | `true`               |
| `refreshTable`   | boolean  | Triggers table refresh                 | -                    |
| `totalPages`     | number   | Total pagination pages available       | `10`                 |
| `totalDocuments` | number   | Total number of items across all pages | `100`                |

---

## 🔍 Filter Configuration

The Rules Table supports a two-row filter system for enhanced usability and flexibility.

### ✅ Row 1 Filters

| Filter         | Type         | Features                                      | Options                          |
|----------------|--------------|-----------------------------------------------|----------------------------------|
| Search         | Text Input   | Full-text search with debounce                | Rule name, description, etc.     |
| Category       | Multi-select | Dynamic options loaded from API               | Security categories              |
| Last Response  | Multi-select | Status indicators                             | Succeeded, Warning, Failed       |
| Rule Type      | Tabs         | Segmented control with count indicators       | All, NIDS, HIDS                  |
| Status         | Tabs         | Segmented control with status toggles         | All, Enabled, Disabled           |

### ⚙️ Row 2 Filters

| Filter         | Type         | Features                                      |
|----------------|--------------|-----------------------------------------------|
| Date Range     | Date Picker  | Start/End date selection                      |
| Bulk Actions   | Dropdown     | Apply actions like Enable/Disable to selected |
| Export         | Button       | Export current filtered data                  |

---

## 📊 Column Specifications

| Column         | Key           | Features                              | Custom Rendering                     |
|----------------|---------------|---------------------------------------|--------------------------------------|
| ID             | `sid`         | Hidden                                | -                                    |
| Rule           | `message`     | Clickable link + tags tooltip         | Name + tag count with hover tooltip  |
| Rule Type      | `type`        | Basic text                            | -                                    |
| Category       | `file_name`   | Basic text                            | -                                    |
| Severity       | `severity`    | Color-coded indicator                 | Dot + text (Major, Minor, Info)      |
| Last Response  | `lastResponse`| Status indicator                      | Dot + text (Succeeded, Warning, etc.)|
| Last Update    | `lastUpdated` | Basic text                            | -                                    |
| Enabled        | `status`      | Interactive toggle switch             | ToggleSwitch component               |

---

## 💡 Interactive Elements

### Rule Name
- Clickable link navigates to detailed rule view
- Displays truncated message with ellipsis
- Hover displays full name
- Shows tag count with clickable icon

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

---

## 📦 Bulk Operations

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

---

## 🗃 Data Formatting

### Example Row Data Format
```js
{
  ID: { key: "sid", value: 123 },
  Rule: {
    value: <InteractiveRuleNameComponent />,
    key: "rule" 
  },
  "Rule Type": { value: "NIDS", key: "type" },
  Category: { value: "Network Intrusion", key: "file_name" },
  Severity: { value: <SeverityIndicator severity="Major" />, key: "severity" },
  "Last Response": { value: <ResponseStatus status="Warning" />, key: "lastResponse" },
  "Last Update": { value: "2025-04-01", key: "lastUpdated" },
  Enabled: { value: <ToggleSwitch enabled={true} />, key: "status" }
}
```

---

## 🎨 Custom Rendering Examples

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
  }`}/>
  <span>{response}</span>
</div>
```

---

## 📁 Usage Example

```jsx
const tableConfig = {
  title: "Security Rules",
  url: "/api/rules",
  filters: {
    row1: [
      {
        type: "text",
        name: "search",
        label: "Search",
        width: 300,
        placeholder: "Search by rule name..."
      },
      {
        type: "treeSelect",
        name: "category",
        label: "Category",
        treeData: categoryTreeData,
        checkable: true
      },
      {
        type: "tabs",
        name: "ruleType",
        label: "Rule Type",
        options: ["All", "NIDS", "HIDS"],
        defaultValue: "All"
      }
    ],
    row2: [
      {
        type: "dateRange",
        name: "date",
        label: "Date Range",
        ranges: {
          Today: new Date(),
          Yesterday: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      {
        type: "dropdown",
        name: "bulkActions",
        label: "Bulk Actions",
        options: ["Enable", "Disable"]
      },
      {
        type: "button",
        name: "export",
        label: "Export",
        onClick: exportData
      }
    ]
  },
  rows: formattedData,
  actions: [{
    icon: EditIcon,
    label: "Edit",
    onClick: (rule) => navigateToEdit(rule.id)
  }],
  hasCheckbox: true,
  totalPages: 10,
  totalDocuments: 100
};

<NewTable tableConfig={tableConfig} />
```

---

## 📱 Responsive Design

The Rules Table adapts gracefully to different screen sizes:

- **Truncated Rule Names**: Long names are shown as ellipses with tooltips
- **Mobile Filter Layouts**: Filters collapse into collapsible panels
- **Adaptive Columns**: Less important columns can be hidden on smaller screens
- **Stacked Buttons**: Action buttons stack vertically when space is limited

---

## ♿ Accessibility Features

- Fully keyboard navigable
- ARIA labels applied to interactive elements
- Status indicators meet color contrast standards
- Toggle switches optimized for screen readers
- Tooltip content accessible via assistive technologies

---

## 🛠 Filter Reference Guide

### Standard Filter Types

| Filter Type | Description                        | Configuration Options                       | Best For                         |
|-------------|------------------------------------|---------------------------------------------|----------------------------------|
| Text Search | Full-text input                    | `placeholder`, `debounce`, `searchFields`   | Searching by name/description    |
| Select      | Dropdown selector                  | `options`, `multiple`, `isClearable`        | Category/status filtering        |
| Date Range  | Date range picker                  | `dateFormat`, `minDate`, `maxDate`          | Time-based filtering             |
| Tabs        | Segmented control                  | `options`, `defaultValue`                   | Categorization                   |
| Toggle      | Binary switch                      | `onLabel`, `offLabel`                       | Boolean filters                  |

### Advanced Filter Types

| Filter Type    | Description                        | Special Features                            | Use Case                         |
|----------------|------------------------------------|---------------------------------------------|----------------------------------|
| Tag Input      | Free-form tag entry                | `validation`, `maxTags`, `delimiters`       | Tag-based filtering              |
| Slider         | Numeric range selector             | `min`, `max`, `step`, `marks`               | Risk score thresholds            |
| Tree Select    | Hierarchical selector              | `treeData`, `checkable`                     | Nested category trees            |
| Radio Group    | Exclusive choice group             | `vertical`, `buttonStyle`                   | Mutually exclusive options       |
| Checkbox Group | Multiple non-exclusive selections  | `columns`, `selectAll`                      | Multi-select filters             |

---

## 🧩 Filter Configuration Matrix

### Row 1 Recommended Filters

| Position | Filter Type    | Suggested Configuration                                  | Example Values                     |
|----------|----------------|----------------------------------------------------------|------------------------------------|
| 1        | Text Search    | `width: 300px`, searches across 5 fields                 | "detection rule"                   |
| 2        | Tree Select    | Security categories hierarchy                            | "Network > IDS"                    |
| 3        | Date Range     | Last modified time                                         | "Jan 1 - Mar 31"                   |
| 4        | Tabs           | Rule types with counts                                   | "All(156) | NIDS(120) | HIDS(36)" |
| 5        | Select         | Severity levels                                          | "Critical, High"                   |

### Row 2 Recommended Filters

| Position | Filter Type       | Special Parameters                                 | Example Usage                    |
|----------|-------------------|-----------------------------------------------------|----------------------------------|
| 1        | Slider            | Risk score 0-100                                    | "Risk > 75"                      |
| 2        | Checkbox Group    | MITRE ATT&CK tactics                                | "TA0001, TA0002"                 |
| 3        | Bulk Actions      | Custom action hooks                                 | "Disable Selected"               |
| 4        | Export            | File format options                                 | "Export as CSV"                  |
| 5        | Toggle            | Show only active                                    | "Active Rules"                   |

---

## ⚙️ Filter Property Reference

### Common Properties

| Property      | Type             | Required | Description                             |
|---------------|------------------|----------|-----------------------------------------|
| `type`        | string           | Yes      | Filter component type                   |
| `name`        | string           | Yes      | Query parameter name                    |
| `label`       | string           | No       | Display label                           |
| `width`       | number / string  | No       | Control width                           |
| `defaultValue`| any              | No       | Initial value                           |

### Type-Specific Properties

#### Select Properties
| Property | Description                               |
|----------|-------------------------------------------|
| `options` | Array of `{value, label}` objects        |
| `isMulti` | Enable multi-select mode                 |
| `async`   | Load options remotely                    |

#### Date Range Properties
| Property | Description                               |
|----------|-------------------------------------------|
| `ranges` | Preset date ranges                        |
| `showTime` | Include time selection                  |

#### Slider Properties
| Property | Description                               |
|----------|-------------------------------------------|
| `range`  | Dual-thumb mode                           |
| `tooltip`| Value display                             |

---

## 📐 Optimal Filter Layouts

### Desktop Layout

| Position | Filter Type     | Width  | Suggested Filters                   |
|----------|------------------|--------|-------------------------------------|
| 1        | Search           | 30%    | Rule text search                    |
| 2        | Tree Select      | 20%    | Security category hierarchy         |
| 3        | Select (Multi)   | 15%    | Severity levels                     |
| 4        | Tabs             | 15%    | Rule type (NIDS/HIDS)               |
| 5        | Toggle           | 10%    | Active only                         |
| 6        | Date Range       | 10%    | Last modified time                  |

### Mobile Layout

| Position | Filter Type        | Notes                                  |
|----------|--------------------|----------------------------------------|
| 1        | Search             | Full width                             |
| 2        | Tabs               | Primary categorization                 |
| 3        | Select             | Most important filter                  |
| 4        | Collapsible Panel  | Contains secondary filters             |

---

## 🧠 Filter Combination Strategies

### Effective Filter Groups

1. **Basic Filtering**
   - Search + Type Tabs + Status Toggle

2. **Advanced Analysis**
   - MITRE Tactics + Severity + Date Range

3. **Administration View**
   - Owner Select + Modified Date + Bulk Actions

### Performance Considerations

| Filter Type | Impact | Recommendation                         |
|-------------|--------|----------------------------------------|
| Search      | High   | Add debounce (300ms)                   |
| Multi-Select| Medium | Limit to <10 options                   |
| Tree Select | High   | Lazy load nodes                        |
| Date Range  | Low    | -                                      |
| Toggles     | None   | -                                      |

---

## 🎯 Filter Design Patterns

1. **Progressive Disclosure**
   - Start with 3–5 essential filters
   - Expandable "More Filters" section

2. **Smart Defaults**
   - Default to current month
   - Default to active rules only
   - Sorted by relevance

3. **Persistent State**
   - Save filter state in URL
   - Remember user preferences

4. **Visual Hierarchy**
   - Primary filters: Prominent position
   - Secondary filters: Compact controls
   - Advanced filters: Collapsible section

---

This comprehensive documentation ensures that developers have a clear understanding of how to configure, customize, and extend the Rules Table component while maintaining usability, accessibility, and performance across devices.
