import { Box, Button, Group, TextInput } from "@mantine/core";
import { motion, useReducedMotion } from "framer-motion";
import { TRANSITION_NONE, TRANSITION_QUICK } from "@/utils/motion";
import { useTodoStore } from "./store";

export default function TodoInput() {
  const inputValue = useTodoStore((s) => s.inputValue);
  const setInputValue = useTodoStore((s) => s.setInputValue);
  const addTodo = useTodoStore((s) => s.addTodo);
  const shouldReduceMotion = useReducedMotion();
  const quickTransition = shouldReduceMotion ? TRANSITION_NONE : TRANSITION_QUICK;

  return (
    <Box px="xl" py="md">
      <Group gap="xs">
        <TextInput
          flex={1}
          size="sm"
          placeholder="Add a new task..."
          aria-label="New task"
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          radius="md"
        />
        <motion.div
          whileHover={shouldReduceMotion ? undefined : { y: -1 }}
          whileTap={shouldReduceMotion ? undefined : { y: 0, scale: 0.99 }}
          transition={quickTransition}
        >
          <Button onClick={addTodo} radius="md" px="lg" size="sm">
            Add
          </Button>
        </motion.div>
      </Group>
    </Box>
  );
}
