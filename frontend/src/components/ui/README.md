# BestByte Performant UI Components

This directory contains highly optimized UI components designed to work with large datasets without freezing the UI.

## Lightweight Select Components

We've created several lightweight select components to replace the heavier Radix UI components that were causing performance issues:

### 1. LightweightSelect

A simple, fast select component for general use.

```tsx
import { LightweightSelect } from "@/components/ui/lightweight-select";

export function MyForm() {
  const [value, setValue] = React.useState("");
  
  return (
    <LightweightSelect
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" }
      ]}
      value={value}
      onChange={setValue}
      placeholder="Select an option"
    />
  );
}
```

### 2. LightweightCountrySelect

Specialized for country selection with phone codes.

```tsx
import { LightweightCountrySelect } from "@/components/ui/lightweight-country-select";

export function PhoneForm() {
  const [country, setCountry] = React.useState("US");
  
  return (
    <LightweightCountrySelect
      value={country}
      onChange={setCountry}
    />
  );
}
```

### 3. API-Compatible Selects

If you're migrating from Radix UI, you can use our API-compatible replacements:

#### DarkSelect (Drop-in Replacement)

```tsx
import {
  DarkSelect,
  DarkSelectTrigger,
  DarkSelectContent,
  DarkSelectValue,
  DarkSelectItem
} from "@/components/ui/dark-select";

export function DarkThemeForm() {
  const [value, setValue] = React.useState("");
  
  return (
    <DarkSelect value={value} onValueChange={setValue}>
      <DarkSelectTrigger>
        <DarkSelectValue placeholder="Select an option" />
      </DarkSelectTrigger>
      <DarkSelectContent>
        <DarkSelectItem value="option1">Option 1</DarkSelectItem>
        <DarkSelectItem value="option2">Option 2</DarkSelectItem>
      </DarkSelectContent>
    </DarkSelect>
  );
}
```

#### LightweightSelect Compatibility Layer

```tsx
import {
  LightweightSelect as Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem
} from "@/components/ui/lightweight-select-compat";

export function CompatForm() {
  const [value, setValue] = React.useState("");
  
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

## Performance Benefits

- No UI freezing, even with large datasets (200+ options)
- Lazy loading of options
- Efficient rendering with React.memo and useMemo
- Small bundle size
