import { ActionIcon, Checkbox, Group, Text, TextInput, Tooltip } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconCheck, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { TodoItem } from "./types";
import { useTodoStore } from "./store";

type Props = {
  todo: TodoItem;
};

type EditFormProps = {
  initialLabel: string;
  onConfirm: (label: string) => void;
  onCancel: () => void;
};

function EditForm({ initialLabel, onConfirm, onCancel }: EditFormProps) {
  const [value, setValue] = useState(initialLabel);

  function handleConfirm() {
    const trimmed = value.trim();
    if (trimmed) onConfirm(trimmed);
  }

  return (
    <Group gap="xs" px="xl" py="sm">
      <TextInput
        flex={1}
        size="sm"
        radius="md"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleConfirm();
          if (e.key === "Escape") onCancel();
        }}
        autoFocus
      />
      <ActionIcon variant="light" color="green" onClick={handleConfirm} aria-label="Confirm edit">
        <IconCheck size={15} />
      </ActionIcon>
      <ActionIcon variant="light" color="gray" onClick={onCancel} aria-label="Cancel edit">
        <IconX size={15} />
      </ActionIcon>
    </Group>
  );
}

export default function TodoItem({ todo }: Props) {
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const editTodo = useTodoStore((s) => s.editTodo);
  const [editing, setEditing] = useState(false);
  const [focusedWithin, setFocusedWithin] = useState(false);
  const { hovered, ref } = useHover<HTMLDivElement>();
  const shouldReduceMotion = useReducedMotion();
  const quickTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.12 };
  const isActive = hovered || focusedWithin;

  if (editing) {
    return (
      <EditForm
        initialLabel={todo.label}
        onConfirm={(label) => {
          editTodo(todo.id, label);
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <motion.div
      ref={ref}
      animate={{
        borderLeftColor: isActive ? "var(--mantine-color-blue-5)" : "rgba(0, 0, 0, 0)",
      }}
      transition={quickTransition}
      onFocusCapture={() => setFocusedWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocusedWithin(false);
        }
      }}
      style={{
        borderLeftColor: "rgba(0, 0, 0, 0)",
        borderLeftStyle: "solid",
        borderLeftWidth: 2,
        boxSizing: "border-box",
      }}
    >
      <Group justify="space-between" px="xl" py="sm">
        <Checkbox
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          label={
            <Text
              size="sm"
              td={todo.completed ? "line-through" : undefined}
              c={todo.completed ? "dimmed" : undefined}
            >
              {todo.label}
            </Text>
          }
        />
        <motion.div
          animate={{
            opacity: isActive ? 1 : 0,
            x: isActive || shouldReduceMotion ? 0 : 4,
          }}
          transition={quickTransition}
        >
          <Group gap={4}>
            <Tooltip label="Edit" withArrow position="top" openDelay={400}>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="sm"
                onClick={() => setEditing(true)}
                aria-label="Edit todo"
              >
                <IconPencil size={14} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete" withArrow position="top" openDelay={400}>
              <ActionIcon
                variant="subtle"
                color="red"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete todo"
              >
                <IconTrash size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </motion.div>
      </Group>
    </motion.div>
  );
}
