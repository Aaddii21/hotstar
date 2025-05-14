# Rules Table Component

## Overview
The **Rules Table** is a feature-rich React component built on the `NewTable` base, designed for managing security rules in a SOC (Security Operations Center) environment. It offers filtering, sorting, bulk actions, and responsive UI with accessibility features.

---

## 🧱 Main Props (`tableConfig`)

| Prop             | Type     | Description                          |
|------------------|----------|--------------------------------------|
| `title`          | string   | Table title                          |
| `url`            | string   | API endpoint                         |
| `filters`        | object   | Filter configuration                 |
| `rows`           | array    | Formatted table rows                 |
| `actions`        | array    | Row-level action buttons             |
| `hasCheckbox`    | boolean  | Enable row selection                 |
| `refreshTable`   | boolean  | Triggers refresh                     |
| `totalPages`     | number   | Pagination control                   |
| `totalDocuments` | number   | Total item count                     |

---

## 🔍 Filter Configuration

### Two-Row Filter System

#### ✅ Row 1 Filters (Primary Filters)
| Filter         | Type         | Features                             | Options                      |
|----------------|--------------|--------------------------------------|------------------------------|
| Search         | Text Input   | Full-text search with debounce       | Rule name/description        |
| Category       | Multi-select | Dynamic options from API             | Security categories          |
| Last Response  | Multi-select | Status indicators                    | Succeeded, Warning, Failed   |
| Rule Type      | Tabs         | Segmented control + count indicators | All, NIDS, HIDS              |
| Status         | Tabs         | Segmented control + status toggles   | All, Enabled, Disabled       |

#### ⚙️ Row 2 Filters (Secondary Filters)
| Filter         | Type         | Features                              |
|----------------|--------------|---------------------------------------|
| Date Range     | Date Picker  | Start/End date selection              |
| Bulk Actions   | Dropdown     | Apply actions like Enable/Disable     |
| Export         | Button       | Export current filtered data          |

---

## 📊 Column Specifications

| Column         | Key           | Features                        | Custom Rendering              |
|----------------|---------------|---------------------------------|-------------------------------|
| ID             | `sid`         | Hidden                          | -                             |
| Rule           | `message`     | Clickable link, Tags            | Name + tag count tooltip      |
| Rule Type      | `type`        | Basic text                      | -                             |
| Category       | `file_name`   | Basic text                      | -                             |
| Severity       | `severity`    | Color-coded indicator           | Dot + text                    |
| Last Response  | `lastResponse`| Status indicator                | Dot + text                    |
| Last Update    | `lastUpdated` | Basic text                      | -                             |
| Enabled        | `status`      | Interactive toggle switch       | ToggleSwitch component        |

---

## 🎯 Supported Filter Types (All Possible)

| Filter Type     | Use Case                            | Special Properties |
|-----------------|-------------------------------------|--------------------|
| Text            | Free-text search                    | `debounce`, `placeholder` |
| Select          | Single/multi dropdown               | `options`, `multiple` |
| Multi-select    | Multiple choice selector            | `isSearchable`, `isClearable` |
| Date Range      | Time-based filtering                | `minDate`, `maxDate`, `showTime` |
| Tabs            | Categorization                      | `defaultValue`, `countLabels` |
| Toggle          | Boolean filters                     | `onLabel`, `offLabel` |
| Tag Input       | Free-form tagging                   | `maxTags`, `delimiters` |
| Slider          | Numeric range selectors             | `min`, `max`, `step`, `tooltip` |
| Tree Select     | Hierarchical categories             | `treeData`, `checkable` |
| Radio Group     | Exclusive choices                   | `vertical`, `buttonStyle` |
| Checkbox Group  | Non-exclusive selections            | `columns`, `selectAll` |
| Async Select    | Remote option loading               | `loadOptions`, `defaultOptions` |

---

## 🔢 Sorting Capabilities

| Sort Field     | Sort Direction | Default Sort | Description                  |
|----------------|----------------|--------------|------------------------------|
| Rule Name      | Asc / Desc     | Yes          | Alphabetical sort            |
| Severity       | Asc / Desc     | No           | Priority-based sorting       |
| Last Updated   | Asc / Desc     | No           | Chronological order          |
| Status         | Asc / Desc     | No           | Enabled/Disabled grouping    |
| Last Response  | Asc / Desc     | No           | Status severity ordering     |

Sorting can be enabled per column via:
```js
sortable: true,
sortKey: 'custom_sort_key', // optional
```

---

## 💡 Interactive Elements

### Rule Name with Tooltip
```jsx
<span className="rule-name" title={fullMessage}>
  {truncatedMessage}
</span>
```

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
  onChange={() => toggleRuleStatus(item.sid)}
/>
```

---

## 📦 Bulk Operations

### Supported Actions
- **Enable Selected**
- **Disable Selected**

### Implementation
```jsx
handleBulkAction({
  action: "Enable", // or "Disable"
  selectedRows: [1001, 1002, 1003],
  refreshTable: () => {
    console.log('Table refreshed');
  }
});
```

---

## 📁 Example Data Format

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

## 📱 Responsive Design

- Truncated rule names with tooltips  
- Mobile filter collapse into panels  
- Adaptive column sizing  

---

## ♿ Accessibility

- Fully keyboard navigable  
- ARIA labels applied to all interactive elements  
- Contrast-compliant indicators  
- Screen reader-friendly toggle switches  


## 🧩 Advanced Filter Patterns

1. **Progressive Disclosure**
   - Show 3–5 essential filters initially
   - Expandable section for advanced filters

2. **Smart Defaults**
   - Default to current month
   - Only active rules by default
   - Sorted by relevance or last update

3. **Persistent State**
   - Save filter state in URL query params
   - Remember user preferences using localStorage

4. **Visual Hierarchy**
   - Prominent placement for primary filters
   - Compact controls for secondary filters
   - Collapsible sections for advanced filters

---

## 🛠 Extensible Filtering & Sorting

### Adding Custom Filters
1. Define custom filter interface:
```ts
interface CustomFilter {
  id: string;
  render: (props: FilterProps) => ReactNode;
  apply: (value: any, record: any) => boolean;
  serialize?: (value: any) => any;
}
```

2. Example: Regex pattern filter
```js
const regexFilter = {
  id: 'regex',
  render: ({ value, onChange }) => (
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter regex pattern"
    />
  ),
  apply: (pattern, record) => new RegExp(pattern).test(record.message)
};
```

### Adding Custom Sorters
1. Define sorter interface:
```ts
interface CustomSorter {
  id: string;
  label: string;
  compare: (a: any, b: any) => number;
}
```

2. Example: Severity-based sorting
```js
const severitySorter = {
  id: 'severity',
  label: 'By Threat Level',
  compare: (a, b) => {
    const levels = { critical: 3, high: 2, medium: 1, low: 0 };
    return levels[b.severity] - levels[a.severity];
  }
};
```

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

This documentation provides a complete guide for developers to configure and extend the Rules Table with all possible filters, sorting options, and customization capabilities while ensuring usability and performance.
