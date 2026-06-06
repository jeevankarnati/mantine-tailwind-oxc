import { Box, Stack, Text } from "@mantine/core";
import { IconCircleCheck, IconListCheck } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Filter } from "./types";

type Props = {
  filter: Filter;
};

export default function TodoEmptyState({ filter }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const subtleTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: [0.2, 0.7, 0.3, 1] as const };

  return (
    <motion.div
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 6, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, height: 0 }}
      transition={subtleTransition}
      style={{ overflow: "hidden" }}
    >
      <Box px="xl" py="xl">
        <Stack gap="xs" align="center">
          {filter === "active" ? (
            <>
              <IconCircleCheck size={32} stroke={1} className="text-green-400" />
              <Text c="dimmed" size="sm">
                No active tasks — great work!
              </Text>
            </>
          ) : filter === "completed" ? (
            <>
              <IconListCheck size={32} stroke={1} className="text-gray-300 dark:text-gray-600" />
              <Text c="dimmed" size="sm">
                Nothing completed yet. Keep going!
              </Text>
            </>
          ) : (
            <>
              <IconListCheck size={32} stroke={1} className="text-gray-300 dark:text-gray-600" />
              <Text c="dimmed" size="sm">
                Add your first task above to get started.
              </Text>
            </>
          )}
        </Stack>
      </Box>
    </motion.div>
  );
}
