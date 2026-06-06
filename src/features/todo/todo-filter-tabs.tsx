import { Badge, Tabs } from "@mantine/core";
import type { Filter } from "./types";

type Props = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  total: number;
  activeCount: number;
  completedCount: number;
};

export default function TodoFilterTabs({
  filter,
  onFilterChange,
  total,
  activeCount,
  completedCount,
}: Props) {
  return (
    <Tabs value={filter} onChange={(v) => onFilterChange((v ?? "all") as Filter)} px="xl" pt="xs">
      <Tabs.List>
        <Tabs.Tab
          value="all"
          rightSection={
            <Badge size="xs" variant="light" circle>
              {total}
            </Badge>
          }
        >
          All
        </Tabs.Tab>
        <Tabs.Tab
          value="active"
          rightSection={
            <Badge size="xs" variant="light" color="blue" circle>
              {activeCount}
            </Badge>
          }
        >
          Active
        </Tabs.Tab>
        <Tabs.Tab
          value="completed"
          rightSection={
            <Badge size="xs" variant="light" color="green" circle>
              {completedCount}
            </Badge>
          }
        >
          Completed
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
