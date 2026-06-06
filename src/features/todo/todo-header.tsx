import { Box, Group, Progress, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconListCheck } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import ThemeSwitcher from "../../components/theme-switcher";

type Props = {
  total: number;
  remaining: number;
  completionPct: number;
};

export default function TodoHeader({ total, remaining, completionPct }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const quickTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.12 };

  return (
    <Box px="xl" pt="xl" pb="md">
      <Group justify="space-between" align="center" mb={total > 0 ? "sm" : 0}>
        <Group gap="sm">
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { rotate: -4, scale: 1.03 }}
            transition={quickTransition}
          >
            <ThemeIcon variant="light" size="lg" radius="md">
              <IconListCheck size={18} stroke={1.5} />
            </ThemeIcon>
          </motion.div>
          <Stack gap={2}>
            <Title order={4} fw={600} lh={1}>
              My Tasks
            </Title>
            <Text size="xs" c="dimmed">
              {total === 0
                ? "No tasks yet"
                : remaining === 0
                  ? "All done!"
                  : `${remaining} of ${total} remaining`}
            </Text>
          </Stack>
        </Group>
        <ThemeSwitcher />
      </Group>
      {total > 0 ? (
        <Progress
          value={completionPct}
          size="xs"
          radius="xl"
          color={completionPct === 100 ? "green" : "blue"}
        />
      ) : null}
    </Box>
  );
}
