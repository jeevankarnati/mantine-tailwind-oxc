import { Box, Stack, Text } from "@mantine/core";
import { IconCircleCheck, IconListCheck } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import { TRANSITION_NONE, TRANSITION_SUBTLE } from "@/utils/motion";
import type { Filter } from "./types";

type Props = {
  filter: Filter;
};

const EMPTY_CONFIG: Record<Filter, { icon: React.ReactNode; text: string }> = {
  active: {
    icon: <IconCircleCheck size={32} stroke={1} className="text-green-400" />,
    text: "No active tasks — great work!",
  },
  completed: {
    icon: <IconListCheck size={32} stroke={1} className="text-gray-300 dark:text-gray-600" />,
    text: "Nothing completed yet. Keep going!",
  },
  all: {
    icon: <IconListCheck size={32} stroke={1} className="text-gray-300 dark:text-gray-600" />,
    text: "Add your first task above to get started.",
  },
};

export default function TodoEmptyState({ filter }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const subtleTransition = shouldReduceMotion ? TRANSITION_NONE : TRANSITION_SUBTLE;
  const { icon, text } = EMPTY_CONFIG[filter];

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
          {icon}
          <Text c="dimmed" size="sm">
            {text}
          </Text>
        </Stack>
      </Box>
    </motion.div>
  );
}
