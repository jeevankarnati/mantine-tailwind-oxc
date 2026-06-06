import { Box, Button, Group, TextInput } from "@mantine/core";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
};

export default function TodoInput({ value, onChange, onAdd }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const quickTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.12 };

  return (
    <Box px="xl" py="md">
      <Group gap="xs">
        <TextInput
          flex={1}
          size="sm"
          placeholder="Add a new task..."
          aria-label="New task"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
          radius="md"
        />
        <motion.div
          whileHover={shouldReduceMotion ? undefined : { y: -1 }}
          whileTap={shouldReduceMotion ? undefined : { y: 0, scale: 0.99 }}
          transition={quickTransition}
        >
          <Button onClick={onAdd} radius="md" px="lg" size="sm">
            Add
          </Button>
        </motion.div>
      </Group>
    </Box>
  );
}
