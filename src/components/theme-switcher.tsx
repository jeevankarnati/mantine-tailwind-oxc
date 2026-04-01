import { Switch, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";

export default function ThemeSwitcher() {
  const { toggleColorScheme } = useMantineColorScheme({ keepTransitions: true });
  const computedColorScheme = useComputedColorScheme("dark");

  return (
    <Switch
      label="Toggle theme"
      checked={computedColorScheme === "dark"}
      onChange={toggleColorScheme}
    />
  );
}
